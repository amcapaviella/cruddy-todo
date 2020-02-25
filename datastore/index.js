const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const counterFile = require('./data/counter.txt');


var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    // console.log(exports.counterFile);
    var filePath = path.join(exports.dataDir, `/${id}.txt`);
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        throw ('error creating file');
      } else {
        callback(null, { id, text });
      }
    });
  });
};

// items[id] = text;
// callback(null, { id, text });

exports.readAll = (callback) => {
  var todoArray = [];
  fs.readdir(exports.dataDir, (err, files) => {
    // console.log(files);
    files.forEach(file => {
      file = file.replace('.txt', '');
      // console.log(file);
      todoArray.push({ id: file, text: file });
      // console.log(todoArray);
    });
    callback(err, todoArray);
  });
};

exports.readOne = (id, callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    // console.log(exports.dataDir);
    files.forEach(file => {
      // console.log(file);
      if (file.replace('.txt', '') === id) {
        fs.readFile(file, (err, fileData) => {
          console.log(fileData);
          if (err) {
            callback(null, '');
          } else {
            callback(null, fileData);
          }
        });
      }
    });
  });
};
// var text = items[id];
// if (!text) {
//   callback(new Error(`No item with id: ${id}`));
// } else {
//   callback(null, { id, text });
// }


exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
