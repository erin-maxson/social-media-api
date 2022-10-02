const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema({

})

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true},
  thoughts: [thoughtsSchema]
});

const Users = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

Users.find({}).exec((err, collection) => {
  if (err) {
    return handleError(err);
  }
  if (collection.length === 0) {
    return Users.insertMany(
      [
        { username: 'airmax14', email: 'airmax1494@gmail.com' },
        { username: 'erin.maxson', email: 'erin.maxson14@gmail.com' },
        { username: 'rorygal', email: 'rory@gmail.com' }
      ],
      (insertError) =>
        insertError ? handleError(insertError) : console.log('Inserted')
    );
  }
  return console.log('Already populated');
});

module.exports = Users;
