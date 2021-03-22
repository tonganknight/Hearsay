/* we need this "types */
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
     reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          required: "need a body",
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: "You need a username!",


      }

    },
    {
      toJSON:{
        getters: true
      }
    })

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "You need a username!",
            validator: { maximum: 280, minimum: 1, description: "Must be 1-280 Characters long"}
    },
    
    username: {
        type: String,
        required: "You need a username!"
    },
       reactions: [ReactionSchema],
       createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
  },
  {
    toJSON: {
      //virtuals: true,
      getters: true
    },
    //id: false
  }

);



ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought =model('Thought', ThoughtSchema)

module.exports = Thought