const express = require('express')
const app = express()
const port = 44319
const index = require('./router/index');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: "*",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('you in the app')
})
app.use(cors(corsOptions))
app.use('/index', index)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

