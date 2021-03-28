const userCTRL = require('../../controllers/userCTRL')
const { postRegister, postLogin } = userCTRL;

module.exports = (Router) => {
    Router
        .route('/register')
        .post(postRegister);

    Router
        .route('/login')
        .post(postLogin)
}