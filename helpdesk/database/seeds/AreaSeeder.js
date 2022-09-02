'use strict'

/*
|--------------------------------------------------------------------------
| AreaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class AreaSeeder {
  async run () {
    await Database
      .table('areas')
      .insert({
        id: 1,
        created_at: '2018-05-01 00:00:00',
        updated_at: '2018-05-01 00:00:00',
        nome: 'Network',
        descricao: 'network area'
      })

    await Database
      .table('areas')
      .insert({
        id: 2,
        created_at: '2018-05-01 00:00:01',
        updated_at: '2018-05-01 00:00:01',
        nome: 'Systemas',
        descricao: 'systems area'
      })
  }
}

module.exports = AreaSeeder
