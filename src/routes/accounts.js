const express = require('express');
const router = express.Router();
const {accounts} = require('../data');

router.get('/savings', function(req, res) {
  res.render('account', { account: accounts.savings } );
});
router.get('/checking', function(req, res) {
  res.render('account', { account: accounts.checking} );
});
router.get('/credit', function(req, res) {
  res.render('account', { account: accounts.credit} );
});

/*
/Users/anonymy/GitRepos/NodeExpress-BankingPortal/node_modules/express/lib/router/index.js:458
      throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
      ^

TypeError: Router.use() requires a middleware function but got a Object
*/
// modules.export = {router};
module.exports = router;
