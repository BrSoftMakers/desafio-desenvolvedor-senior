'use strict'

const Schema = use('Schema')

class PrediosSchema extends Schema {
  up () {
    this.create('predios', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome').notNullable()
      table.string('descricao')
    })
  }

  down () {
    this.drop('predios')
  }
}

module.exports = PrediosSchema
