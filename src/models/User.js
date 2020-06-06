const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  code: { // Gerar após trazer informações do GitHub
    type: String,
    select: false,
  },

  password: {
    type: String,
    select: false,
  },

  // Atributos que vem do GitHub
  username: { // login
    type: String,
    required: true,
  },

  name: { // name
    type: String,
    required: true,
  },

  bio: { // bio
    type: String,
    required: true,
  },

  image: { // avatar_url
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model('User', UserSchema);
