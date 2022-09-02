const router = require('express').Router()
const User = require('../models/User')

// Rotas User

//Read Users
router.get('/', async (req, res) => {
  try {

    const users = await User.find()

    res.status(200).json(users)

  } catch {

  }
})

//Create User
router.post('/', async (req, res) =>{
    const {name, email, password} = req.body
  
    if(!name) {
      res.status(422).json({error: 'O nome é obrigatório!'})
    }
  
    const user = {
      name,
      email,
      password
    }
  
    try {
      
      await User.create(user)
  
      res.status(201).json({message: 'User criado com sucesso!'})
  
    } catch {
      res.status(500).json({ erro: error })
    }
  
  })

  

  //Read User ID
  router.get('/:id', async(req, res) =>{
    const id = req.params.id
    try {

      const user = await User.findOne({_id: id})

      if(!user) {
        res.status(422).json({message: 'Usuário não foi encontrado'})
        return
      }

      res.status(200).json({user})
      
    } catch (error) {

      res.status(500).json({error: error})
      
    }
  } )


  //Update User
  router.patch('/id', async(req, res) => {

    const id = req.params.id
    const {name, email, password} = req.body
    const user = {name, email, password}

    try {

      const UpdatedUser = await User.updateOne({_id: id}, user)
      
      if(UpdatedUser.matchedCount === 0){
        res.status(422).json({message: 'Usuário não foi encontrado'})
      }

      res.status(200).json(user)

    } catch (error) {
      res.status(500).json({error: error})      
    }

  })



  module.exports = router