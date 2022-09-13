'use strict'

const Problema = use('App/Models/Problema')
const Area = use('App/Models/Area')

class ProblemaController {
  async index ({ request, view }) {
    if (request.ajax()) {
      return await Problema
        .query()
        .with('area')
        .fetch()
    } else {
      return view.render('problema.index')
    }
  }

  async create ({ request, view }) {
    const areas = await Area.all()
    return view.render('problema.create', { areas: areas.toJSON() })
  }

  async store ({ request, response, session }) {
    const problemaData = request.except(['_csrf', 'files'])
    const problema = await Problema.create(problemaData)
    session.flash({ notification: 'Problem created with success', type: 'success' })
    response.redirect('/problemas')
  }

  async edit ({ response, view, params }) {
    const areas = await Area.all()
    const problema = await Problema.find(params.id)
    return view.render('problema.create', { problema, areas: areas.toJSON() })
  }

  async update ({ request, response, session, params }) {
    const problema = await Problema.find(params.id)

    if (problema) {
      const problemaData = request.except('_csrf')

      problema.nome = request.input('nome')
      problema.dica = request.input('dica')
      problema.area_id = request.input('area_id')
      problema.sla = request.input('sla')
      problema.prioridade = request.input('prioridade')

      await problema.save()

      session.flash({ notification: 'Problem updated with success', type: 'success' })
      return response.redirect('/problemas')
    }

    // not found
    session.flash({ notification: 'Problem not found', type: 'error' })
    return response.redirect('/problemas')
  }

  async destroy ({ request, response, params }) {
    const problema = await Problema.find(params.id)
    if (problema) {
      try {
        await problema.delete()
        return response.send('Problema excluído com sucesso!')
      } catch (error) {
        return response.status(409).send('Não é possível excluir esse problema por já estar em uso')
      }
    }
    return response.status(404).send('Não foi possível encontrar o problema a ser excluído!')
  }
}

module.exports = ProblemaController
