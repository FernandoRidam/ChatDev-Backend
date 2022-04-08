const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const routes = require('./routes');

const app = express();
const server = require('http').Server( app );
const io = require('socket.io')( server );

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb+srv://ridam:${ process.env.BD_PASSWORD }@cluster0.gtsrp.mongodb.net/${ process.env.BD_NAME }?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
});

const onlineUsers = [];

io.on('connection', socket => {
  const { user } = socket.handshake.query;

  onlineUsers[ user ] = ( socket.id );
});

app.use(( req, res, next ) => {
  req.io = io;
  req.onlineUsers = onlineUsers;

  return next();
});

app.use( cors());
app.use( express.json());
app.use( routes );

const port = process.env.PORT;

server.listen( port );
console.log(`Server Running In Port ${ port }`);
