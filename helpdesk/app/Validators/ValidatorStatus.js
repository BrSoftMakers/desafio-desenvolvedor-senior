'use strict'

class ValidatorSetor {
  get rules () {
    return {
      nome: 'required|accepted',
      habilitado: 'required|boolean',
      habilitadoOperador: 'required|boolean'
    }
  }

  get messages () {
    return {
      'nome.required': 'The name field is required',
      'habilitado.required': 'The enabled field is required',
      'habilitadoOperador.required': 'The enabled operator field is required'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorSetor
