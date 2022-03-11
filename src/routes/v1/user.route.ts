const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
var validate = require('../../middlewares/validate.middlewares');
var express = require('express');
var router = express.Router();

router.route('/')
    .post(validate(userValidation.createNewUser), userController.createNewUser)
    .get(userController.getAllUsers)

router.route('/mongodb-question1').get(userController.getUserAddressInDaNang);
router.route('/mongodb-question2').get(userController.getUserHasPasswordLengthGreaterThan6);
router.route('/mongodb-question3').put(userController.updateUserStatus);

router.route('/mysql-question1').get(userController.getUserHasPasswordLengthGreaterThan6SQL);
router.route('/mysql-question2').get(userController.getUserAddressInDaNangSQL);
router.route('/mysql-question3').put(userController.updateStatusSQL);



module.exports = router;