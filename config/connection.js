const {connect, connection} = require('mongoose');
require("dotenv").config();

// Wrap Mongoose around local connection to MongoDB
connect(process.env.MONGODB_URI || 'mongodb://localhost/socialmediaapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = connection;
