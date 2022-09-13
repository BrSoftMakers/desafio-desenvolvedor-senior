'use strict'

const Setor = use('App/Models/Setor')

class SetorController {
  async index ({ request, view }) {
    if (request.ajax()) {
      return await Setor.all()
    } else {
      return view.render('setor.index')
    }
  }

  async create ({ request, view }) {
    return view.render('setor.create')
  }

  async store ({ request, response, session }) {
    const SetorData = request.except('_csrf')
    await Setor.create(SetorData)
    session.flash({ notification: 'Department created with success', type: 'success' })
    response.redirect('/setores')
  }

  async edit ({ response, view, params }) {
    const setor = await Setor.find(params.id)
    return view.render('setor.create', { setor })
  }

  async update ({ request, response, session, params }) {
    const setor = await Setor.find(params.id)

    if (setor) {
      const setorData = request.except('_csrf')
      setor.nome = request.input('nome')
      setor.descricao = request.input('descricao')
      setor.centro = request.input('centro')

      await setor.save()
      session.flash({ notification: 'Department updated with success', type: 'success' })
      return response.redirect('/setores')
    }

    // not found
    session.flash({ notification: 'Department not found', type: 'error' })
    return response.redirect('/setores')
  }

  async destroy ({ request, response, params }) {
    const setor = await Setor.find(params.id)
    if (setor) {
      try {
        await setor.delete()
        return response.send('Department deleted with success!')
      } catch (error) {
        return response.status(409).send('Cannot delete this department because it is already in use')
      }
    }
    return response.status(404).send('Cannot find the department to be excluded!')
  }
}

module.exports = SetorController
