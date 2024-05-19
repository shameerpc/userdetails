const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes=require('./routes/user')
var bodyParser = require('body-parser')
const port = 3000


mongoose.connect('mongodb://localhost:27017/auth_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.send('Hello yahya!')
// })

app.use('/api/auth', require('./routes/user'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})