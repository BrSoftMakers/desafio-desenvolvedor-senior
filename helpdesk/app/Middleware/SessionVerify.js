'use strict'

class SessionVerify {
  async handle ({ request, response, session, view }, next, props) {
    const user = session.get('user')
    if (user) {
      // TODO: pode ser feito só no login? share user session with views
      view.share({ user })

      request.user = user
      const propsArray = Array.from(props)
      if (propsArray.length > 0) {
        for (const role of propsArray) {
          if (user.funcao === role) { return await next() }
        }
        return response.json('not allowed')
      } else {
        return await next()
      }
    } else {
      // armazenar o link que tentou acessar para depois ser verificado na tentativa de login
      // e redirecionado para a pagina que tentou acessar inicialmente
      session.put('redirect', request.url())
      return response.redirect('/')
    }
  }
}

module.exports = SessionVerify
