const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        username: {
            type: stringify,
            required: true,
            trim: true
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const thoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
    );

const thought = model('Thought', thoughtSchema);
module.exports = thought