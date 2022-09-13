'use strict'

class ValidatorUsuario {
  get rules () {
    return {
      nome: 'required|accepted',
      login: 'required|accepted|includes:.',
      email: 'required|email',
      funcao: 'required|in:A,O,M'
    }
  }

  get messages () {
    return {
      'nome.required': 'The name field is required',
      'login.required': 'The name field is required and need to follow the pattern name.surname',
      'login.includes': 'The name field is required and need to follow the pattern name.surname',
      'email.required': 'The email field is required',
      'funcao.required': 'The role field is required'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorUsuario
