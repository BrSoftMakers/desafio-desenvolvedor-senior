'use strict'

const Model = use('Model')

class Status extends Model {
  getHabilitado (habilitado) {
    if (habilitado) { return 'Yes' } else { return 'No' }
  }

  getHabilitadoOperador (habilitadoOperador) {
    if (habilitadoOperador) { return 'Yes' } else { return 'No' }
  }
}

module.exports = Status
