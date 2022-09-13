'use strict'

// auxiliaries
const Helpers = use('Helpers')
const Mail = use('Mail')
const Drive = use('Drive')
const Config = use('Config')
const Database = use('Database')

// models
const Chamado = use('App/Models/Chamado')
const Problema = use('App/Models/Problema')
const Area = use('App/Models/Area')
const Predio = use('App/Models/Predio')
const Setor = use('App/Models/Setor')
const Status = use('App/Models/Status')
const Ocorrencia = use('App/Models/Ocorrencia')
const Usuario = use('App/Models/Usuario')

class ChamadoController {
  async index({ request, view, session }) {
    if (request.ajax()) {
      let chamados = await Chamado.chamadosEmAbertoPorUsuario(request.user)
      chamados = chamados.toJSON()
      chamados.forEach(chamado => {
        if (chamado.ocorrencias.length > 0) {
          chamado.operador = chamado.ocorrencias.pop().usuario.nomeAbreviado
        } else {
          chamado.operador = ''
        }
      })
      return chamados
    } else {
      return view.render('chamado.index')
    }
  }

  async create({ request, view }) {
    let problemas = await Problema.all()
    let areas = await Area.all()
    const predios = await Predio.all()
    const setores = await Setor.all()

    let usuarios = {}
    if (request.user.funcao !== 'M') {
      usuarios = await Usuario.all()
      usuarios = usuarios.toJSON()
    }

    problemas = problemas.toJSON()
    areas = areas.toJSON()

    const areaComProblemas = areas.map(area => ({
      nome: area.nome,
      problemas: problemas.filter(problema => problema.area_id === area.id)
    }))

    return view.render('chamado.create', {
      areas: areaComProblemas,
      predios: predios.toJSON(),
      setores: setores.toJSON(),
      usuarios
    })
  }

  async store({ request, response, session }) {
    let chamadoData = request.except('_csrf')
    chamadoData.status_id = 1

    // se nao tiver o campo usuario_id significa que foi aberto por um usuario comum
    // logo é pego seu id diretamente pela sessao
    if (!chamadoData.usuario_id) { chamadoData.usuario_id = request.user.id }

    if (request.file('anexo')) {
      const anexo = request.file('anexo', {
        size: '2mb'
      })

      const path = `${new Date().getTime()}.${anexo.subtype}`
      await anexo.move(Helpers.publicPath('uploads'), {
        name: path
      })

      if (!anexo.moved()) {
        return anexo.error()
      }
      chamadoData.anexo = path
    }

    await Chamado.create(chamadoData)
    session.flash({ notification: 'Ticket created with success', type: 'success' })
    response.redirect('/chamados')
  }

  async edit({ request, response, view, params }) {
    const chamado = await Chamado.find(params.id)

    // evitando que usuario membro acesse chamado que nao é seu
    if (request.user.funcao === 'M') {
      if (!(request.user.id === chamado.usuario_id)) {
        return response.redirect('/home')
      }
    }

    // obtendo os usuarios para o select
    let usuarios = {}
    if (request.user.funcao !== 'M') {
      usuarios = await Usuario.all()
      usuarios = usuarios.toJSON()
    }

    // se usuario for operador so renderiza os status que o operador esta habilitado
    // se for admin renderiza todo os status
    // se for usuario comum só renderiza o status atual, ou seja, ele não consegue alterar o status do chamado
    let status
    if (request.user.funcao === 'O') {
      status = await Status.query().where('habilitadoOperador', true).fetch()
    } else if (request.user.funcao === 'A') {
      status = await Status.all()
    } else {
      status = await Status.query().where('id', chamado.status_id).fetch()
    }

    // const status = await Status.all()
    // obtendo os demais dados do banco
    const predios = await Predio.all()
    const setores = await Setor.all()

    let problemas = await Problema.all()
    let areas = await Area.all()
    problemas = problemas.toJSON()
    areas = areas.toJSON()

    const areaComProblemas = areas.map(area => ({
      nome: area.nome,
      problemas: problemas.filter(problema => problema.area_id === area.id)
    }))

    const ocorrencias = await Ocorrencia.findByChamado(params.id)

    // renderizando a view
    return view.render('chamado.create', {
      chamado: chamado.toJSON(),
      areas: areaComProblemas,
      predios: predios.toJSON(),
      setores: setores.toJSON(),
      status: status.toJSON(),
      ocorrencias: ocorrencias.toJSON(),
      usuarios
    })
  }

  async update({ request, response, session, params }) {
    // obtendo objeto já existente no banco
    const chamado = await Chamado.find(params.id)

    // TODO: código repetido
    // evitando que usuario membro atualize chamado que nao é seu
    if (request.user.funcao === 'M') {
      if (!(request.user.id === chamado.usuario_id)) {
        return response.redirect('/home')
      }
    }

    // se foi encontrado algum objeto
    if (chamado) {
      // novos dados vindo do post
      const chamadoData = request.except(['_csrf', '_method'])
      // apenas os dados do objeto ja existente no banco (isto é, sem o lucid model)
      const diferenca = chamado.toJSON()
      // gerar a mensagem de ocorrencia com o que foi alterado
      let ocorrencias = ''

      // treta do null
      if (chamadoData.solucao === '') { chamadoData.solucao = null }

      // verificando as diferencas e atualizando os valores do objeto
      Object.keys(chamadoData).forEach(key => {
        if (chamadoData[key] != diferenca[key]) {
          // ocorrencias += `O campo ${key} foi alterado de "${diferenca[key]}" para "${chamadoData[key]}".\n`
          ocorrencias += `The field ${key} was changed.`
          chamado[key] = chamadoData[key]
        }
      })

      // verificando se foi enviado arquivo em anexo
      if (request.file('anexo')) {
        const anexo = request.file('anexo', {
          size: '2mb'
        })

        const path = `${new Date().getTime()}.${anexo.subtype}`
        await anexo.move(Helpers.publicPath('uploads'), {
          name: path
        })

        if (!anexo.moved()) {
          return anexo.error()
        }

        // se ja exisita um anexo previamente, deleto
        if (chamado.anexo) {
          const path = Helpers.publicPath('uploads') + '/' + chamado.anexo
          await Drive.delete(path)
          ocorrencias += 'Anexo alterado. \n'
        } else {
          ocorrencias += 'Anexo inserido. \n'
        }

        // atualizo o caminho do anexo
        chamado.anexo = path
      }

      // so vai salvar algo novo se realmente tiver alguma alteração
      if (ocorrencias !== '') {
        const ocorrencia = new Ocorrencia()
        ocorrencia.descricao = ocorrencias
        ocorrencia.chamado_id = params.id
        ocorrencia.usuario_id = request.user.id
        await ocorrencia.save()
        await chamado.save()
      }

      session.flash({ notification: 'Tickted updated with success', type: 'success' })
      return response.redirect('back')
    }

    session.flash({ notification: 'Ticket not found', type: 'error' })
    return response.redirect('/chamados')
  }

  // actions
  async atender({ request, response, session, params }) {
    const chamado = await Chamado.find(params.id)
    chamado.status_id = 2
    await chamado.save()

    const ocorrencia = new Ocorrencia()
    ocorrencia.descricao = 'In attendance'
    ocorrencia.chamado_id = params.id
    ocorrencia.usuario_id = request.user.id
    await ocorrencia.save()

    session.flash({ notification: 'Ticket in attendance', type: 'normal' })
    return response.redirect('back')
  }

  async encerrar({ request, response, session, params }) {
    const body = request.post()
    // const chamado = await Chamado.query().with('problema').where('id', params.id).fetch()
    let chamado = await Chamado.find(params.id)
    // TODO: verificar se realmente encontrou o chamado
    chamado.status_id = 3
    chamado.solucao = body.solucao
    await chamado.save()

    const ocorrencia = new Ocorrencia()
    ocorrencia.descricao = 'Ticket closed'
    ocorrencia.chamado_id = params.id
    ocorrencia.usuario_id = request.user.id
    await ocorrencia.save()

    // usuario que abriu o chamado
    const usuario = await Usuario.find(chamado.usuario_id)

    if (Config.get('mail.send')) {
      //  obtendo o chamado com o nome do problema para enviar por email
      chamado = await Chamado.query().with('problema').where('id', params.id).fetch()
      chamado = chamado.toJSON()[0]
      chamado.operador = request.user.nome
      if (usuario.receberEmail) {
        Mail.send('emails.chamadoEncerrado', chamado, (message) => {
          message
            .to(usuario.email, usuario.nome)
            .from('fill with email ', 'fill with a name')
            .subject(`Don't reply - Ticket #${params.id} closed`)
        })
      }
    }

    session.flash({ notification: 'Ticket closed', type: 'success' })
    return response.redirect('back')
  }

  async cancelar({ request, response, session, params }) {
    const usuario = await Usuario.findBy('login', request.user.login)
    const chamado = await Chamado.find(params.id)

    // se for membro e esta tentando cagar o de outro por maneiras ilicitas
    if (request.user.funcao === 'M') {
      if (usuario.id !== chamado.usuario_id) {
        session.flash({ notification: 'Not allowed', type: 'error' })
        return response.redirect('back')
      }
    }

    chamado.status_id = 4
    await chamado.save()

    const data = request.except('_csrf')
    const ocorrencia = new Ocorrencia()
    ocorrencia.descricao = `Ticket canceled by the reason "${data.motivo}"`
    ocorrencia.chamado_id = params.id
    ocorrencia.usuario_id = request.user.id
    await ocorrencia.save()

    session.flash({ notification: 'Ticket canceled', type: 'warning' })
    return response.redirect('back')
  }

  async ocorrencia({ request, response, session, params }) {
    const chamado = await Chamado.find(params.id)
    const data = request.except('_csrf')

    chamado.status_id = data.status_id
    await chamado.save()

    const ocorrencia = new Ocorrencia()
    ocorrencia.descricao = data.ocorrencia
    ocorrencia.chamado_id = params.id
    ocorrencia.usuario_id = request.user.id
    await ocorrencia.save()

    // nao eh request user eh o usuario do chamado
    const usuario = await Usuario.find(chamado.usuario_id)

    if (Config.get('mail.send')) {
      if (usuario.receberEmail) {
        Mail.send('emails.novaOcorrencia', { ...ocorrencia.toJSON(), operador: request.user.nome }, (message) => {
          message
            .to(usuario.email, usuario.nome)
            .from('email from', 'email long description')
            .subject("Don't reply - New occurrence for the ticket #" + params.id)
        })
      }
    }

    session.flash({ notification: 'New occurrence', type: 'success' })
    response.redirect('back')
  }

  //API Chamaos
  async api_todos(req, res) {
    let chamados = Chamado.query()
      .with('problema')
      .with('usuario')
      .with('status')
      .with('setor')
      .with('predio')
      .with('ocorrencias.usuario');

    chamados = await chamados.fetch()
    chamados = chamados.toJSON()
    if (chamados) {
      // res.status(200).json(chamados);
      return ({chamados})
    } else {
      //res.status(400).send("Nenhum chamado");
      return res.json({Erro: N/A})
    }
  }

  // adicionais
  async todos({ request, response, view, session }) {
    if (request.ajax()) {
      let chamados = Chamado.query()
        .with('problema')
        .with('usuario')
        .with('status')
        .with('setor')
        .with('predio')
        .with('ocorrencias.usuario')

      if (request.user.funcao === 'M') {
        chamados
          .where('usuario_id', request.user.id)
      }

      chamados = await chamados.fetch()
      chamados = chamados.toJSON()
      chamados.forEach(chamado => {
        if (chamado.ocorrencias.length > 0) {
          chamado.operador = chamado.ocorrencias.pop().usuario.nomeAbreviado
        } else {
          chamado.operador = ''
        }
      })
      return chamados
    } else {
      return view.render('chamado.todos')
    }
  }

  async atividades({ request, response, view, session }) {
    const moment = require('moment')
    const today = [moment().format('YYYY-MM-DD')]
    if (request.ajax()) {
      let date = new Date()
      const ocorrenciasHoje = await Ocorrencia.query()
        .whereRaw('DATE(created_at) = ?', today)
        .with('chamado.usuario')
        .with('chamado.status')
        .with('chamado.problema')
        .with('usuario')
        .orderBy('id', 'desc')
        .fetch()

      return ocorrenciasHoje.toJSON()
    } else {
      return view.render('chamado.atividades')
    }
  }
}

module.exports = ChamadoController
