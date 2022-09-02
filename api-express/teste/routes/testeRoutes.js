const router = require('express').Router()

// Rota API Teste
router.get('/', (req, res) => {
    res.json({ message: 'A API está rodando normalmente!' })
  })
  
  module.exports = router