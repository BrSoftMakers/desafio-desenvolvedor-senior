'use strict'

const Area = use('App/Models/Area')

class AreaController {
  async index ({ request, view }) {
    if (request.ajax()) { return await Area.all() } else { return view.render('area.index') }
  }

  async create ({ request, view }) {
    return view.render('area.create')
  }

  async store ({ request, response, session }) {
    const areaData = request.only(['nome', 'descricao'])
    const area = await Area.create(areaData)
    session.flash({ notification: 'Area created with success', type: 'success' })
    response.redirect('/areas')
  }

  async edit ({ response, view, params }) {
    const area = await Area.find(params.id)
    return view.render('area.create', { area })
  }

  async update ({ request, response, session, params }) {
    const area = await Area.find(params.id)

    if (area) {
      area.nome = request.input('nome')
      area.descricao = request.input('descricao')
      await area.save()

      session.flash({ notification: 'Area updated with success', type: 'success' })
      return response.redirect('/areas')
    }

    // not found
    session.flash({ notification: 'Cannot find the area', type: 'error' })
    return response.redirect('/areas')
  }

  async destroy ({ request, response, params }) {
    const area = await Area.find(params.id)
    if (area) {
      try {
        await area.delete()
        return response.send('Area successfully deleted!')
      } catch (error) {
        return response.status(409).send('Cannot delete this area because it is already in use')
      }
    }
    return response.status(404).send('Cannot find the area to be deleted!')
  }
}

module.exports = AreaController
