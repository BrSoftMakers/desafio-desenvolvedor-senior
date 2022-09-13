'use strict'

const Schema = use('Schema')

class OcorrenciasSchema extends Schema {
  up () {
    this.create('ocorrencias', (table) => {
      table.increments()
      table.timestamps()
      table.text('descricao').notNullable()
      table.integer('chamado_id').unsigned().references('chamados.id')
      table.integer('usuario_id').unsigned().references('usuarios.id')
    })
  }

  down () {
    this.drop('ocorrencias')
  }
}

module.exports = OcorrenciasSchema
