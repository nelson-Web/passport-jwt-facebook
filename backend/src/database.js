const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/passport-example",{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(db => console.log('database is connected'))
.catch(err => console.log(err));  
