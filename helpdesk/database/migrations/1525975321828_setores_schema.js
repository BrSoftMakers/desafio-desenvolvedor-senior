'use strict'

const Schema = use('Schema')

class SetoresSchema extends Schema {
  up () {
    this.create('setors', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome').notNullable().unique()
      table.string('descricao')
      table.enu('centro', ['TOR', 'NY', 'BER']).notNullable()
    })
  }

  down () {
    this.drop('setors')
  }
}

module.exports = SetoresSchema
