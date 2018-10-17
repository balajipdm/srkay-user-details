import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const USERS_DIR = './users';

const app = express();
const router = express.Router();
const fs = require('fs');

const filePath = (userName) => {
  return `${USERS_DIR}/${userName}.json`;
};

const fileExistsIntercept = (req, res, next) => {
  const userName = req.params.userName;
  if (userName) {
    fs.exists(filePath(userName), (exists) => {
      if (!exists) {
        res.status(400).json({
          message: `Failed to Get User, Username: ${userName} not exists.`
        });
      } else {
        next();
      }
    });
  }
};

app.use(cors());
app.use(bodyParser.json());

router.route('/users').get((req, res) => {
  fs.readdir(USERS_DIR, (err, files) => {
    if (err) throw err;
    res.status(200).json(files.map((f) => f.replace(/\.[^/.]+$/, "")));
  });
});

router.route('/users').post((req, res) => {
  const userName = req.body.userName;
  const fileName = filePath(userName);
  fs.exists(fileName, (exists) => {
    if (exists) {
      res.status(400).json({
        message: `Failed to Add User, Username: ${userName} already exists.`
      });
    } else {
      fs.writeFile(fileName, JSON.stringify(req.body), (err) => {
        if (err) throw err;
        res.status(200).json({
          message: 'User Added Successfully'
        });
      });
    }
  });
});

router.route('/users/:userName').get(fileExistsIntercept, (req, res) => {
  fs.readFile(filePath(req.params.userName), (err, data) => {
    if (err) throw err;
    res.status(200).json(JSON.parse(data));
  });
});

router.route('/users/:userName').put(fileExistsIntercept, (req, res) => {
  fs.writeFile(filePath(req.params.userName), JSON.stringify(req.body), (err) => {
    if (err) throw err;
    res.status(200).json({
      message: 'User Updated Successfully'
    });
  });
});

router.route('/users/:userName').delete(fileExistsIntercept, (req, res) => {
  fs.unlink(filePath(req.params.userName), (err) => {
    if (err) throw err;
    res.status(200).json({
      message: 'User Deleted Successfully'
    });
  });
});

app.use('/api', router);

app.listen(4000, () => console.log('Express server is running on port 4000'));