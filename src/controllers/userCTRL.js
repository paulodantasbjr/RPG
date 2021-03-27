const User = require('../models/user')
const { registerSchema } = require('../helpers/registerValidation');

module.exports = {
    postRegister: async (req, res) => {
        const {error} = registerSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message);

        const { name, email, password } = req.body;

        const user = new User({
            name,
            email,
            password,
        });
        try {
            if (await User.findOne({ email }))
                return res.status(400).send({error: 'User already exist'});
            const savedUser =  await user.save()
            return res.status(200).send({Success: "Account Created of success!"})
        } catch(err) {
            return res.status(400).send(`###${err}`)
        }
    }
}