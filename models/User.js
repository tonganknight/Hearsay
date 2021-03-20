const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
{
        username: {
        type: String,
        required: true,
        trim: true
    },
        email: {
            type: String,
            unique: true,
            pattern : "@mongodb\.com$",
            trim: true
    },
      friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }],

      thought: [
        {
         type: Schema.Types.ObjectId,
         ref: 'Thought'
         }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
  return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
})

const User = model('User', UserSchema);

module.exports = User