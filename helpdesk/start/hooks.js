'use strict'

const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  // listening to databse errors or querys (commented)
  const Database = use('Database')
  Database.on('error', console.error)
  // Database.on('query', console.log)

  // view global method to get base_url
  const View = use('View')
  const Env = use('Env')
  View.global('baseUrl', () => Env.get('BASE_URL', 'http://localhost:3333'))
})
