const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const user = require('./routes/user.routes')
const comment = require('./routes/comment.routes');
const shop = require('./routes/shop.routes');
const product = require('./routes/product.routes');
const customer = require('./routes/customer.routes');
//const upload = require('./routes/upload.routes');
const cart = require('./routes/cart.routes');
const watch = require('./routes/watch.routes');
const wishlist = require('./routes/wishlist.routes');
const orders = require('./routes/order.routes');

////////////////////////////////

const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://duong:duong2007@cluster0.86cge.mongodb.net/du_an?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
        console.log('Database connected');
  })
  .catch((error)=> {
        console.log('Error connecting to database');
  });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///
const path = require('path');
const crypto = require('crypto');
const config = require('./config/db')
const storage = new GridFsStorage({
      url: config.mongoURI,
      file: (req, file) => {
            return new Promise((resolve, reject) => {
                  crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                              return reject(err);
                        }
                        const filename = buf.toString('hex') + path.extname(file.originalname);
                        const fileInfo = {
                              filename: filename,
                              bucketName: 'uploads'
                        };
                        resolve(fileInfo);
                  });
            });
      }
});

const upload = multer({ storage });


///

app.use("/user",user);
app.use("/comment",comment);
app.use("/shop",shop);
app.use("/",product(upload));
//app.use("/upload",upload);
app.use("/customer",customer);
app.use("/cart",cart);
app.use("/watch",watch);
app.use("/wishlist",wishlist);
app.use("/orders",orders);

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Listening on port ${port}...`)
});