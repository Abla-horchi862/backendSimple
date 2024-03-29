const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const db = require("./models");

// Helmet
app.use(helmet());
// Rate Limiting
const limit = rateLimit({
  max: 100,// max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
  message: 'Too many requests' // message to send
});

var corsOptions = {
    origin: "http://10.5.202.168:5000"
  };
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10kb' }))// Body limit is 10
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

require('./routes/Panier')(app, limit)

// Data Sanitization against XSS attacks
app.use(xss())
  db.sequelize.sync();
//  db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//  });

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
});



