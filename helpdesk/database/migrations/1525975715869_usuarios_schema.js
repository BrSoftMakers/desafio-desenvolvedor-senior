'use strict'

const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {
      table.increments()
      table.timestamps()
      table.string('nome').notNullable()
      table.string('login').notNullable().unique()
      table.string('senha').notNullable()
      table.string('email').notNullable().unique()
      table.enu('funcao', ['A', 'O', 'M']).notNullable()
      table.string('ramal', 4)
      table.boolean('receberEmail').notNullable()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
