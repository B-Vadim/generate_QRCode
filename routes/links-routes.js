const {Router} = require('express');
const { setSaveLink, getLinks, removeLink } = require('../controllers/links-controller');
const checkAuthToken = require('../middleware/auth-middleware');
const router = Router();

router.get('/list', checkAuthToken, getLinks);
router.post('/save', checkAuthToken, setSaveLink);
router.delete('/delete', checkAuthToken, removeLink);

module.exports = router;