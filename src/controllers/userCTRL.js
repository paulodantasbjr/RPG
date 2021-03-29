const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//validacoes
const { registerSchema } = require('../helpers/registerValidation')
const { loginSchema } = require('../helpers/loginValidation')

//funcao para criar o token de 1d
const createToken = (User) => {
  return jwt.sign(User, process.env.TOKEN_SECRET, { expiresIn: '1d' })
}

//funcao para criar o token de 7d
const createRefreshToken = (User) => {
  return jwt.sign(User, process.env.REFRESHTOKEN, { expiresIn: '7d' })
}

module.exports = {
  postRegister: async (req, res) => {
    try {
      const { error } = registerSchema.validate(req.body)
      if (error) return res.status(400).json(error.details[0].message)

      const { name, email, password } = req.body

      //encriptando a senha
      const hashPassword = await bcrypt.hash(password, 10)

      const user = new User({
        name,
        email,
        password: hashPassword,
      })

      //verificando se usuario já existe
      if (await User.findOne({ email }))
        return res.status(400).json({ error: 'User already exist' })
      //cadastrando usuario
      await user.save()

      //gerando um token para esse usuario
      const userAccessToken = createToken({ id: user._id })
      const userRefreshToken = createRefreshToken({ id: user._id })

      //crian um cookie para armazenar os dados
      res.cookie('auth-token', userRefreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7dias
      })

      return res.status(200).json({ Success: 'Account Created of success!' })
    } catch (err) {
      return res.status(400).json(`###${err.message}`)
    }
  },

  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body

      const { error } = loginSchema.validate(req.body)
      if (error) return res.status(400).send(error.details[0].message)
      //verificando email existente
      const user = await User.findOne({ email }).select('+password')
      if (!user) return res.status(400).json({ msg: 'Email is not found' })
      //verificando se é a mesma senha
      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) return res.status(400).json({ msg: 'Invalid password' })

      //criando e verificando token
      const userAccessToken = createToken({ id: user._id })
      const userRefreshToken = createRefreshToken({ id: user._id })

      res.cookie('auth-token', userRefreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7dias
      })

      return res.status(200).json({ msg: 'logged in!' })
    } catch (err) {
      return res.status(400).json({ msg: err.message })
    }
  },
<<<<<<< HEAD
}
=======
  getLogout: async (req, res) => {
    try {
      //limpar o cookie do navegador
      res.clearCookie("auth-token", { path: '/user/refresh_token' });

      return res.json({ msg: 'logout done' });
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};
>>>>>>> e61d2ab114b1e2301b4c0c6498d77417c3f35cf9
