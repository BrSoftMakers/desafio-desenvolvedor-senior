'use strict'

const Schema = use('Schema')

class ChamadosSchema extends Schema {
  up () {
    this.create('chamados', (table) => {
      table.increments()
      table.timestamps()
      table.text('descricao').notNullable()
      table.text('solucao')
      table.string('patrimonio', 6)
      table.string('ramal', 4).notNullable()
      table.integer('status_id').unsigned().notNullable().references('statuses.id')
      table.integer('usuario_id').unsigned().notNullable().references('usuarios.id')
      table.integer('problema_id').unsigned().notNullable().references('problemas.id')
      table.integer('predio_id').unsigned().notNullable().references('predios.id')
      table.integer('setor_id').unsigned().notNullable().references('setors.id')
      table.string('local').notNullable()
      table.string('anexo')
    })
  }

  down () {
    this.drop('chamados')
  }
}

module.exports = ChamadosSchema
