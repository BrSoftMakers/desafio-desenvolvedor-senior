'use strict'

const Model = use('Model')

class Chamado extends Model {
  static castDates (field, value) {
    if (field === 'created_at') {
      return value.format('DD/MM/YY HH:mm')
    }
  }

  // relationships
  problema () { return this.belongsTo('App/Models/Problema') }
  status () { return this.belongsTo('App/Models/Status') }
  usuario () { return this.belongsTo('App/Models/Usuario') }
  setor () { return this.belongsTo('App/Models/Setor') }
  ocorrencias () { return this.hasMany('App/Models/Ocorrencia') }
  predio () { return this.belongsTo('App/Models/Predio') }

  // retorna os chamados em aberto (que nao estao cancelado ou encerrado)
  // se o usuario for membro retorna só seus respectivos chamados
  static async chamadosEmAbertoPorUsuario (user) {
    let consulta = this.query()
      .with('problema')
      .with('usuario')
      .with('status')
      .with('setor')
      .with('predio')
      .with('ocorrencias.usuario')
      .whereNotIn('status_id', [3, 4])

    if (user.funcao === 'M') {
      consulta
        .where('usuario_id', user.id)
    }

    return consulta.fetch()
  }
}

module.exports = Chamado
