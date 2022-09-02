'use strict'

const Schema = use('Schema')

class StatusSchema extends Schema {
  up () {
    this.create('statuses', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome').notNullable()
      table.boolean('habilitado').notNullable()
      table.boolean('habilitadoOperador').notNullable()
    })
  }

  down () {
    this.drop('statuses')
  }
}

module.exports = StatusSchema
