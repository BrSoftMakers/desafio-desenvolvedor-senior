'use strict'

const Usuario = use('App/Models/Usuario');
const { validate } = use('Validator');
const Logger = use('Logger');
const bcrypt = require('bcryptjs');

class LoginController {
  index ({ session, response, view })  {
    if (session.get('user')) {
      return response.redirect('/');
    }
    return view.render('login.signin');
  }

  async login ({ request, response, session }) {
    const { login, password } = request.post()

    try {
      const usuario = await Usuario.findBy('login', login);

      const validPassword = await bcrypt.compare(password, usuario.senha);
      if (validPassword) {
        if (usuario) {
          session.put('user', usuario.toJSON())
        } else {
          throw new Error("User doesn't exists")
        }
        const redirect = session.pull('redirect')
        return response.redirect(redirect || '/home')
      } else {
        throw new Error("User doesn't exists")
      }

    } catch (exception) {
      if (exception.hasOwnProperty('error')) {
        session.flashOnly(['login'])
        session.flash({ notification: 'Login or password incorrect', type: 'error' })
      } else {
        session.flash({ notification: 'Error on login, contact administrator', type: 'error' })
        Logger.error('LOGIN - %', exception)
      }
      response.redirect('back')
    }
  }

  async logout ({ session, response }) {
    // clear session store
    session.clear()
    // redirect to login page
    response.redirect('/')
  }
}

module.exports = LoginController
