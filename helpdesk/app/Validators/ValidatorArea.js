'use strict'

class ValidatorArea {
  get rules () {
    return {
      nome: 'required'
    }
  }

  get messages () {
    return {
      'nome.required': 'The name field is required'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorArea
