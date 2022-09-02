'use strict'

/*
|--------------------------------------------------------------------------
| UsuarioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class UsuarioSeeder {
  async run () {
    await Database
      .table('usuarios')
      .insert({
        id: 1,
        created_at: '2018-05-01 00:00:00',
        updated_at: '2018-05-01 00:00:00',
        nome: 'Master Administrator',
        login: 'admin',
        email: 'administrator@mirana.fake',
        funcao: 'A',
        ramal: '1111',
        receberEmail: true
      })

    await Database
      .table('usuarios')
      .insert({
        id: 2,
        created_at: '2018-05-01 00:00:01',
        updated_at: '2018-05-01 00:00:01',
        nome: 'Efficient Operator',
        login: 'operator',
        email: 'operator@mirana.fake',
        funcao: 'O',
        ramal: '2222',
        receberEmail: true
      })

    await Database
      .table('usuarios')
      .insert({
        id: 3,
        created_at: '2018-05-01 00:00:02',
        updated_at: '2018-05-01 00:00:02',
        nome: 'Common User',
        login: 'user',
        email: 'user@mirana.fake',
        funcao: 'M',
        ramal: '3333',
        receberEmail: true
      })
  }
}

module.exports = UsuarioSeeder
