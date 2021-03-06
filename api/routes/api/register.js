const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../../schema/User');
let RouteNames = require("../../constants/constants");

//SECTION Registration route
router.route(RouteNames.register).post(function(req, res) {
    let user = new User();
    const registrationInfo = req.body;
    try {
        user.first_name = registrationInfo.first_name;
        user.last_name = registrationInfo.last_name;
        user.user_name = registrationInfo.user_name;
        user.password = registrationInfo.password;
    } catch (e) {
        res.status(400).send("Failed to store to database");
    }
    user.save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send("Failed to store to database");
        });
});

//SECTION Username validation Router
router.route(RouteNames.validate)
    .post(function(req, res) {
        User.findOne({ user_name: req.body.user_name })
            .then(user => user ? res.sendStatus(204) : res.sendStatus(200));
    });

//SECTION Get allData
router.route(RouteNames.data).get(function(req, res) {
    User.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

module.exports = router;