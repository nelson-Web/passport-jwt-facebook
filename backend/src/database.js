const mongoose = require('mongoose')
const {mongodb} = require('./keys')

mongoose.connect("mongodb://localhost:27017/covid-19",{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(db => console.log('database is connected'))
.catch(err => console.log(err));  
