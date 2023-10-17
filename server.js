const express = require('express');
const path = require('path');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 5000;

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth-routes'));
app.use('/api/link', require('./routes/links-routes'));

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'app', 'build')));

   app.get('*', (res, req) => {
      res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'));
   })
}



mongoose.connect(config.get('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log('Conected to MongoDB'))
   .catch(err => console.log(`DB error: ${err}`))
   .finally(() => 
      app.listen(PORT, (e) => {
         e ? console.log(e) : console.log(`Server started for port: ${PORT}`);
      })
   );
   
