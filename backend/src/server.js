const express = require('express');
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
//initializations
const app = express()
require('./database')
require('./passport/facebook-auth')
require('./passport/verify-token')
//settings
app.set('port' , process.env.PORT || 3000)
//middlewares
app.use(passport.initialize());
app.use(morgan('dev'))// para ver los estados http de las peticiones
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

//importando rutas
app.use('/', require('./routes/routes'));
const rutasProtegidas = require('./routes/rutasProtegidas')
app.use('/api', passport.authenticate('jwt', { session : false }), rutasProtegidas );

//server is listenning
app.listen(app.set('port'), () => console.log(`server on port`, app.get('port')))