const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//connectando ao db
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },(error) => {
      if(error) throw error;
      console.log('Connected to DB!');
  },
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
