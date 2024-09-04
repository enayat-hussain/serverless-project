require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = express.Router();
const index = require('./src/routes');
const morgan = require('morgan');

/**
 *enables cross origin request
 */
app.use(cors());
/**
 * compress responses
 */
app.use(compression());

/**
 * Use body parser to parse request body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Used morgan for logging
 */
app.use(morgan('dev'));

router.use(index);

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on ${process.env.PORT || 3000}`);
});
