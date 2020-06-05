const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  code: { // Gerar após trazer informações do GitHub
    type: String,
    required: true,
    select: false,
  },

  password: {
    type: String,
    required: true,
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

UserSchema.pre('save', async function( next ) {
  const hash = await  bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

module.exports = model('User', UserSchema);
