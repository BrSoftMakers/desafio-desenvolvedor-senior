'use strict'

const Schema = use('Schema')

class ProblemasSchema extends Schema {
  up () {
    this.create('problemas', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome').notNullable()
      table.text('dica')
      table.integer('area_id').unsigned().notNullable().references('id').inTable('areas')
      table.integer('sla').notNullable()
      table.enu('prioridade', ['Normal', 'High', 'Urgent']).notNullable()
    })
  }

  down () {
    this.drop('problemas')
  }
}

module.exports = ProblemasSchema
