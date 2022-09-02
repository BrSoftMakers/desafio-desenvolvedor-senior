'use strict'

const Usuario = use('App/Models/Usuario')

class OpcoesController {
  async index ({ request, response, view }) {
    const usuario = await Usuario.findByOrFail('login', request.user.login)

    return view.render('opcoes.index', { usuario })
  }

  async update ({ request, response, view, session }) {
    const data = request.except('_csrf')
    const usuario = await Usuario.findByOrFail('login', request.user.login)

    usuario.ramal = data.ramal
    if (data.receberEmail) {
      usuario.receberEmail = 1
    } else {
      usuario.receberEmail = 0
    }

    // salvo e atualizo a sessao
    await usuario.save()
    session.put('user', usuario.toJSON())

    session.flash({ notification: 'Options updated', type: 'success' })

    return response.redirect('back')
  }
}

module.exports = OpcoesController
