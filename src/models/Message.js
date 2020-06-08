const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },

  text: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = model('Message', MessageSchema);
