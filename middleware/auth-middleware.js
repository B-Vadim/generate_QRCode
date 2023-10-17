const jwt = require('jsonwebtoken');
const config = require('config');

const checkAuthToken = (req, res, next) => {
   if (req.method === 'OPTIONS') {
      return next();
   }
   
   try {
      const token = req?.headers?.authorization?.split(' ')[1];
      if (!token) {
         return res.status(401).json({ message: 'User is not logged in' });
      };
      
      const decodedData = jwt.verify(token, config.get('jwtSecretKey'));
      req.user = decodedData;
      next();

   } catch (e) {
      return res.status(401).json({ message: 'User is not logged in' });
   }
};

module.exports = checkAuthToken;
