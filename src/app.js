const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000
const route = require('./routes/index');
const db = require('./config/db/data_base');
app.use(
  express.urlencoded({
  extended:true
  }),
)

/*
  1. Chưa có sử lý token, mã hóa mật khẩu, checkmiddeware
  2. Sử dụng ngrok để publish API
  3. Code vẫn còn chưa ok 
*/
app.use(express.json());
db.connect();
route(app);
app.use('/uploads', express.static('uploads'));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })