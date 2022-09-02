'use strict'

const path = require('path')
/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/drive/providers/DriveProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

module.exports = { providers, aceProviders, aliases, commands }
