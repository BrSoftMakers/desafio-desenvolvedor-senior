'use strict'

const Model = use('Model')

class Usuario extends Model {
  static get computed () {
    return ['nomeAbreviado']
  }

  getNomeAbreviado ({ nome }) {
    const nomes = nome.split(' ')
    const primeiroNome = nomes.shift()
    const ultimoNome = nomes.pop()

    let nomeAbreviado = primeiroNome
    nomes.forEach(nome => {
      nomeAbreviado += ` ${nome.charAt(0).toUpperCase()}.`
    })

    nomeAbreviado += ` ${ultimoNome}`
    return nomeAbreviado
  }

  getReceberEmail (receberEmail) {
    if (receberEmail) { return 'Sim' } else { return 'Não' }
  }
}

module.exports = Usuario
