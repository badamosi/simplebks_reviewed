const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080
      orderRouter = require('./routes/order')
      authRouter = require('./routes/auth')
      dotenv = require('dotenv')


dotenv.config();



app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());


app.use('/auth', authRouter)
app.use('/order_items', orderRouter)

app.listen(port, () => {
        console.log(`Server listening on the port::${port}`);
    });