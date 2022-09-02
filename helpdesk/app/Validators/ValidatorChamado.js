'use strict'

class ValidatorChamado {
  get rules () {
    return {
      descricao: 'required',
      patrimonio: 'min:6|max:6',
      ramal: 'required|min:4|max:4',
      status_id: 'required',
      problema_id: 'required',
      predio_id: 'required',
      local: 'required'
    }
  }

  get messages () {
    return {
      'descricao.required': 'The description field is required',
      'ramal.required': 'The phone field is required',
      'status_id.required': 'The status field is required',
      'problema_id.required': 'The problem field is required',
      'predio_id.required': 'The building field is required',
      'local.required': 'The local field is required'
    }
  }

  async fails (errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = ValidatorChamado
