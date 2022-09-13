'use strict'

const Model = use('Model')

class Ocorrencia extends Model {
  static castDates (field, value) {
    if (field === 'created_at') {
      return value.format('DD/MM/YY HH:mm')
    }
  }

  usuario () { return this.belongsTo('App/Models/Usuario') }
  chamado () { return this.belongsTo('App/Models/Chamado') }

  static async findByChamado (id) {
    return this.query()
      .with('usuario')
      .where('chamado_id', id)
      .orderBy('created_at', 'desc')
      .fetch()
  }
}

module.exports = Ocorrencia
