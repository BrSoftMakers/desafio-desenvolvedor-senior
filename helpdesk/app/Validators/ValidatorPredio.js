'use strict'

class ValidatorPredio {
  get rules () {
    return {
      nome: 'required',
      descricao: 'string|min:4'
    }
  }

  get messages () {
    return {
      'nome.required': 'The name field is required',
      'descricao.min': 'The description field is required and nere more than 4 characters'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorPredio
