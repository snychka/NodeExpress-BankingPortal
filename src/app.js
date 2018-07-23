const fs = require('fs');
const path = require('path');
const express = require('express');
const {accounts, users, writeJSON} = require('./data');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

const app = express();

app.set('views', path.join(__dirname, 'views' ));
app.set('view engine', 'ejs');
//app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render('index', { title: 'Account Summary', accounts: accounts } );
});
//app.get('/', (req, res) =>  res.render('index', { title: 'Index' } ));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);
app.get('/profile', function(req, res) {
  res.render('profile', { user: users[0]} );
});


app.listen(3000);
