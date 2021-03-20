const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
     reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
          type: String,
          require: true,
      },
      //validate: [({length }) => length <=280, "280 Characters is the max"],
      String:{
          type: String,
          require: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
    })

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            validator: { maximum: 280, minimum: 1, description: "Must be 1-280 Characters long"}
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        require: true
    },
       reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);



ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought =model('Thought', ThoughtSchema)
const Reaction = model('Reaction', ReactionSchema)

module.exports = Thought, Reaction