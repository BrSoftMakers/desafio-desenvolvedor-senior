'use strict'

class ValidatorSetor {
  get rules () {
    return {
      nome: 'required',
      descricao: 'string|min:4',
      centro: 'required'
    }
  }

  get messages () {
    return {
      'nome.required': 'The name field is required',
      'descricao.min': 'The description field is required and need more than 4 characters',
      'centro.required': 'The headquarter field is required'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorSetor
