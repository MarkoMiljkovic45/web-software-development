const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')


router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu
    res.render('login', {
        title: 'login',
        user: req.session.user,
        err: undefined,
        linkActive: 'login'
    });
    //#######################################################

});

router.post('/', async function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika
    console.log(req.body.user);
    let user = await User.fetchByUsername(req.body.user);
    console.log(user);
    if (!user || !user.checkPassword(req.body.password)) {
        res.render('login', {
            title: 'login',
            user: req.session.user,
            err: 'User does not exist or incorrect password.',
            linkActive: 'login'
        });
        return;
    }
    req.session.user = user;
    res.redirect('/');
    //#######################################################

});


module.exports = router;