const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

module.exports = model('Group', GroupSchema);
