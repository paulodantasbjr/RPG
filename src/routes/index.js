const Router = require('express').Router()

const authRouteV1 = require('./v1/auth');

Router
    .route('/')
    .get((req, res) => {res.send('ok')})

authRouteV1(Router);

module.exports = Router;