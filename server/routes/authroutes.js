const express= require('express')
const router = express.Router()
const {register,login}= require('../controllers/authcontroller')
const { getAnalytics } = require('../controllers/habitcontroller')

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/analytics').get(getAnalytics)

module.exports= router