var express = require('express');
const app = express();
var router = express.Router();


router.use('/babies',require('./babies.js'));
router.use('/families',require('./families'));
router.use('/clinics',require('./clinics'));
router.use('/mothers',require('./mothers'));
//  const user = router.use('/users',require('./users'));
//  app.use('/user',user);



module.exports = router;

