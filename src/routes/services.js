const express = require('express');
const router = express.Router();
const {accounts,writeJSON} = require('../data');

router.get('/transfer', function(req, res) {
  res.render('transfer');
});

// https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
router.post('/transfer', function(req, res) {

  let from_account_type = req.body.from;
  let amount = req.body.amount;
  accounts[from_account_type].balance -= amount;

  let to_account_type = req.body.to;
  accounts[to_account_type].balance += parseInt(amount, 10);

  writeJSON();

  res.render('transfer', {message: 'Transfer Completed'});
});

router.get('/payment', function(req, res) {
  res.render('payment', {account: accounts.credit});
});


router.post('/payment', function(req, res) {

  let amount = req.body.amount;
  accounts.credit.balance -= amount;
  accounts.credit.available += parseInt(amount, 10);

  writeJSON();

  res.render('payment', { message: "Payment Successful", account: accounts.credit });

});

module.exports = router;
