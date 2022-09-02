'use strict'

const Schema = use('Schema')

class AreasSchema extends Schema {
  up () {
    this.create('areas', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome').unique().notNullable()
      table.string('descricao')
    })
  }

  down () {
    this.drop('areas')
  }
}

module.exports = AreasSchema
