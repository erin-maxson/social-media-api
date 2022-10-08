const { Schema, model } = require('mongoose');
const { Users } = require('.');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator(validatedEmail) {
          return /^([a-zA-Z0-9_.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
            validatedEmail
          );
        }
      },
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }]
    },
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function(){
  return this.friends.length
});

const User = model('User', userSchema);
module.exports = User;
