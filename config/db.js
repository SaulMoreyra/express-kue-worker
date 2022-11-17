const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const databaseConection = async () => {
   try {
      await mongoose.connect(process.env.DB_MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false
      });
      return true;
   } catch (error) {
      process.exit(1);
   }
}

module.exports = databaseConection;