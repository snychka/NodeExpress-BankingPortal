const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views' ));
app.set('view engine', 'ejs');
//app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync('src/json/users.json', 'utf8');
const users = JSON.parse(userData);

app.get('/', function(req, res) {
  res.render('index', { title: 'Account Summary', accounts: accounts } );
});
//app.get('/', (req, res) =>  res.render('index', { title: 'Index' } ));
app.get('/savings', function(req, res) {
  res.render('account', { account: accounts.savings } );
});
app.get('/checking', function(req, res) {
  res.render('account', { account: accounts.checking} );
});
app.get('/credit', function(req, res) {
  res.render('account', { account: accounts.credit} );
});
app.get('/profile', function(req, res) {
  res.render('profile', { user: users[0]} );
});
app.get('/transfer', function(req, res) {
  res.render('transfer');
});
app.get('/payment', function(req, res) {
  res.render('payment', {account: accounts.credit});
});

// https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
app.post('/transfer', function(req, res) {

  let from_account_type = req.body.from;
  let amount = req.body.amount;
  accounts[from_account_type].balance -= amount;

  let to_account_type = req.body.to;
  accounts[to_account_type].balance += parseInt(amount, 10);

  let accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
      path.join(__dirname, 'json/accounts.json'),
      accountsJSON,
      'utf8');

  res.render('transfer', {message: 'Transfer Completed'});
});

app.post('/payment', function(req, res) {

  let amount = req.body.amount;
  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount, 10);

  let accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(
      path.join(__dirname, 'json/accounts.json'),
      accountsJSON,
      'utf8');

  res.render('payment', { message: "Payment Successful", account: accounts.credit });

});

app.listen(3000);
