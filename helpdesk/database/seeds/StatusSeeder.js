'use strict'

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class StatusSeeder {
  async run () {
    await Database
      .table('statuses')
      .insert({
        id: 1,
        created_at: '2018-05-01 00:00:00',
        updated_at: '2018-05-01 00:00:00',
        nome: 'Waiting',
        habilitado: '1',
        habilitadoOperador: '1'
      })

    await Database
      .table('statuses')
      .insert({
        id: 2,
        created_at: '2018-05-01 00:00:01',
        updated_at: '2018-05-01 00:00:01',
        nome: 'In attendance',
        habilitado: '1',
        habilitadoOperador: '1'
      })

    await Database
      .table('statuses')
      .insert({
        id: 3,
        created_at: '2018-05-01 00:00:02',
        updated_at: '2018-05-01 00:00:02',
        nome: 'Canceled',
        habilitado: '1',
        habilitadoOperador: '0'
      })

    await Database
      .table('statuses')
      .insert({
        id: 4,
        created_at: '2018-05-01 00:00:03',
        updated_at: '2018-05-01 00:00:03',
        nome: 'Closed',
        habilitado: '1',
        habilitadoOperador: '1'
      })
  }
}

module.exports = StatusSeeder
