'use strict'

const Predio = use('App/Models/Predio')

class PredioController {
  async index ({ request, view }) {
    if (request.ajax()) {
      return await Predio.all()
    } else {
      return view.render('predio.index')
    }
  }

  async create ({ request, view }) {
    return view.render('predio.create')
  }

  async store ({ request, response, session }) {
    const predioData = request.except('_csrf')
    await Predio.create(predioData)
    session.flash({ notification: 'Building created with success', type: 'success' })
    response.redirect('/predios')
  }

  async edit ({ response, view, params }) {
    const predio = await Predio.find(params.id)
    return view.render('predio.create', { predio })
  }

  async update ({ request, response, session, params }) {
    const predio = await Predio.find(params.id)

    if (predio) {
      const predioData = request.except('_csrf')
      predio.nome = request.input('nome')
      predio.descricao = request.input('descricao')

      await predio.save()
      session.flash({ notification: 'Building updated with success', type: 'success' })
      return response.redirect('/predios')
    }

    session.flash({ notification: 'Building not found', type: 'error' })
    return response.redirect('/predios')
  }

  async destroy ({ request, response, params }) {
    const predio = await Predio.find(params.id)
    if (predio) {
      try {
        await predio.delete()
        return response.send('Predio excluído com sucesso!')
      } catch (error) {
        return response.status(409).send('Não é possível excluir esse Predio por já estar em uso')
      }
    }
    return response.status(404).send('Não foi possível encontrar o Predio a ser excluído!')
  }
}

module.exports = PredioController
