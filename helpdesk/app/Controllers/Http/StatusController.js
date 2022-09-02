'use strict'

const Status = use('App/Models/Status')
const Logger = use('Logger')

class StatusController {
  async index ({ request, view }) {
    if (request.ajax()) {
      return await Status.all()
    } else {
      return view.render('status.index')
    }
  }

  async create ({ request, view }) {
    return view.render('status.create')
  }

  async store ({ request, response, session }) {
    const statusData = request.except('_csrf')
    await Status.create(statusData)
    session.flash({ notification: 'Status created with success', type: 'success' })
    response.redirect('/status')
  }

  async edit ({ response, view, params }) {
    const status = await Status.find(params.id)
    return view.render('status.create', { status })
  }

  async update ({ request, response, session, params }) {
    const status = await Status.find(params.id)

    if (status) {
      status.nome = request.input('nome')
      status.habilitado = request.input('habilitado')
      status.habilitadoOperador = request.input('habilitadoOperador')

      await status.save()
      session.flash({ notification: 'Status updated with success', type: 'success' })
      return response.redirect('/status')
    }

    session.flash({ notification: 'Status not found', type: 'error' })
    return response.redirect('/status')
  }

  async destroy ({ request, response, params }) {
    // impedir a exclusao dos status padroes, pois sao vitais para o funcionamento base
    // do sistema
    if ([1, 2, 3, 4].includes(parseInt(params.id))) {
      return response.status(409).send('Não é possível excluir os status padrões do sistema!')
    }

    const status = await Status.find(params.id)
    if (status) {
      try {
        await status.delete()
        return response.send('Status excluído com sucesso!')
      } catch (error) {
        Logger.info('DELETE STATUS: %j', error)
        // TODO: na verdade tenho que melhorar esses errors, saber quais os tipos basicos
        return response.status(409).send('Não é possível excluir esse Status por já estar em uso')
      }
    }
    return response.status(404).send('Não foi possível encontrar o Status a ser excluído!')
  }
}

module.exports = StatusController
