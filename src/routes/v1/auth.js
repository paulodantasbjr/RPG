const userCTRL = require('../../controllers/userCTRL')
const { postRegister } = userCTRL;

module.exports = (Router) => {
    Router
        .route('/register')
        .post(postRegister);
}