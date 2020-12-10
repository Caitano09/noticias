const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

//Definindo a estratégia para login local
passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
    if (user) {
        const isValid = await user.checkPassword(password)
        if (isValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}))

//facebook
passport.use(new FacebookStrategy({
    clientID: '1225967927795792',
    clientSecret: '1b25df5b3f2de4a0c6ee7266d683810b',
    callbackURL: 'http://localhost:3000/facebook/callback',
    profileFields: ['id', 'displayName', 'email', 'photos']
}, async (acesssToken, refreshToken, profile, done) => {
    const userDB = await User.findOne({ facebookId: profile.id })
    if (!userDB) {
        const user = new User({
            name: profile.displayName,
            facebookId: profile.id,
            roles: ['publico','restrito']
        })
        await user.save()
        done(null, user)
    } else {
        done(null, userDB)
    }
}))

//google
passport.use(new GoogleStrategy({
    clientID: '253073146686-ct623f2t1j1mu8anl4h223dc8lafi0kj.apps.googleusercontent.com',
    clientSecret: 'GIR_8LNPngvXpjRklnB4D7FK',
    callbackURL: 'http://localhost:3000/google/callback'
}, async (acesssToken, refreshToken, err, profile, done) => {
    const userDB = await User.findOne({ googleId: profile.id })
    if (!userDB) {
        const user = new User({
            name: profile.displayName,
            googleId: profile.id,
            roles: ['publico','restrito']
        })
        await user.save()
        done(null, user)
    } else {
        done(null, userDB)
    }
}))

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
        if (!req.session.roles) {
            req.session.roles = req.user.roles[0]
        }
        res.locals.role = req.session.roles
    }
    next()
})

router.get('/change-role/:role', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.roles.indexOf(req.params.role) >= 0) {
            req.session.roles = req.params.role
        }
    }
    
    if (req.params.role == 'admin'){
        res.redirect('/admin/noticias')

    }else if (req.params.role == 'restrito'){
        res.redirect('/restrito/noticias')

    }else if (req.params.role == 'publico'){
        res.redirect('/noticias')
    }
    
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}))

router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (req, res) => res.redirect('/'))

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }))
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' }))


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

const createInitialUser = async () => {
    const total = await User.count()
    if (total === 0) {
        const user = new User({
            username: 'user1',
            password: '12345',
            roles: ['publico','restrito', 'admin']
        })
        await user.save()

        const user2 = new User({
            username: 'user2',
            password: '1234',
            roles: ['publico', 'restrito']
        })
        await user2.save()
        console.log('Users created')
    } else {
        console.log('User created skipped')
    }
}

createInitialUser()

module.exports = router