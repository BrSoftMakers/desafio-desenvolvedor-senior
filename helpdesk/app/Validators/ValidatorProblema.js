'use strict'

class ValidatorProblema {
  get rules () {
    return {
      nome: 'required',
      dica: 'string|min:4',
      area_id: 'required',
      sla: 'required',
      prioridade: 'required|in:Normal,High,Urgent'
    }
  }

  get messages () {
    return {
      'nome.required': 'The name field is required',
      'dica.min': 'The hint field is required and need to have more than 4 characters',
      'area_id.required': 'The area field is required',
      'sla.required': 'The sla field is required',
      'prioridade.required': 'The priority field is required'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorProblema
