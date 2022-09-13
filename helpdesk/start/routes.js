'use strict'

const ChamadoController = require("../app/Controllers/Http/ChamadoController");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

// login and logout routes
Route.get('/', 'LoginController.index');
Route.post('/login', 'LoginController.login').as('login');
Route.get('/logout', 'LoginController.logout').as('logout');

// home route (same as /chamados)
Route.get('/home', 'ChamadoController.index').middleware('sessionVerify');

// options routes
Route.get('/opcoes', 'OpcoesController.index').middleware('sessionVerify').as('opcoes');
Route.post('/opcoes', 'OpcoesController.update').middleware('sessionVerify').as('opcoes');

//Rotas API

Route.get('/api/chamados', 'ChamadoController.api_todos');

//Rotas API Chamado

Route
  .resource('areas', 'AreaController')
  .except(['show'])
  .middleware('sessionVerify:A')
  .validator(new Map([
    [['areas.store', 'areas.update'], ['ValidatorArea']]
  ]))

Route
  .resource('problemas', 'ProblemaController')
  .except(['show'])
  .middleware('sessionVerify:A')
  .validator(new Map([
    [['problemas.store', 'problemas.update'], ['ValidatorProblema']]
  ]))

Route
  .resource('setores', 'SetorController')
  .except(['show'])
  .middleware('sessionVerify:A')
  .validator(new Map([
    [['setores.store', 'setores.update'], ['ValidatorSetor']]
  ]))

Route
  .resource('predios', 'PredioController')
  .except(['show'])
  .middleware('sessionVerify:A')
  .validator(new Map([
    [['predios.store', 'predios.update'], ['ValidatorPredio']]
  ]))

Route
  .resource('status', 'StatusController')
  .except(['show'])
  .middleware('sessionVerify:A')
  .validator(new Map([
    [['status.store', 'status.update'], ['ValidatorStatus']]
  ]))

Route
  .resource('usuarios', 'UsuarioController')
  .except(['show'])
  .middleware('sessionVerify:A')
  .validator(new Map([
    [['usuarios.store', 'usuarios.update'], ['ValidatorUsuario']]
  ]))

Route
  .resource('chamados', 'ChamadoController')
  .except(['show'])
  .middleware('sessionVerify')
// TODO: validator

Route
  .get('chamados/todos', 'ChamadoController.todos')
  .as('obterChamados')
  .middleware('sessionVerify')

Route
  .get('chamados/:id/atender', 'ChamadoController.atender')
  .as('atenderChamado')
  .middleware('sessionVerify:A,O')

Route
  .post('chamados/:id/cancelar', 'ChamadoController.cancelar')
  .as('cancelarChamado')
  .middleware('sessionVerify')

Route
  .post('chamados/:id/encerrar', 'ChamadoController.encerrar')
  .as('encerrarChamado')
  .middleware('sessionVerify:A,O')

Route
  .post('chamados/:id/ocorrencia', 'ChamadoController.ocorrencia').as('novaOcorrencia')
  .middleware('sessionVerify:A,O')

Route
  .get('/atividades', 'ChamadoController.atividades')
  .as('atividades')
  .middleware('sessionVerify:A')
