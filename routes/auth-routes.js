const {Router} = require('express');
const {check} = require('express-validator');
const {setRegistration, setAutorization} = require('../controllers/auth-controller');

const router = Router();

router.post(
   '/registration', 
   [
      check('email', 'Incorrect email').isEmail(),
      check('password', 'Minimum 6 characters').isLength({min: 6})
   ],
   setRegistration
);

router.post(
   '/login',
   [
      check('email', 'Enter a correct email').isEmail(),
      check('password', 'Enter password').exists()
   ],
   setAutorization
);

module.exports = router;