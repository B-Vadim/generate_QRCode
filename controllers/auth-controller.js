const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');
const AuthUser = require('../models/AuthUser');


const setRegistration = async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data for registration'
         })
      };
      
      const {name, email, password} = req.body;
      const checkEmail = await AuthUser.findOne({email});

      if (checkEmail) {
         return res.status(400).json({message: 'Such a user exists'})
      };
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new AuthUser({name, email, password: hashedPassword});
      await user.save();
      res.status(201).json({message: 'User created'})
   } catch (e) {
      res.status(500).json({message: 'Not register'});
   }
};

const setAutorization = async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
         return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect entered data' 
         })
      };

      const {email, password} = req?.body;
      const user = await AuthUser.findOne({email});
      if (!user) {
         return res.status(400).json({message: 'User not find'})
      };

      const isMatchPassword = await bcrypt.compare(password, user?.password)
      if (!isMatchPassword) {
         return res.status(400).json({message: 'Password incorrect'})
      };

      const token = jwt.sign(
         {userId: user.id},
         config.get('jwtSecretKey'),
         // {expiresIn: '1h'}
      );
      
      res.json({token, userID: user.id});

   } catch (e) {
      res.status(500).json({message: 'Not autorization'});
   }
}

module.exports = {
   setRegistration,
   setAutorization
};