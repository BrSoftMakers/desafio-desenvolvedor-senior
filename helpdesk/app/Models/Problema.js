'use strict'

const Model = use('Model')

class Problema extends Model {
  area () {
    return this.belongsTo('App/Models/Area')
  }
}

module.exports = Problema
