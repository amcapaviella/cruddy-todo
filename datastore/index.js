const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const counterFile = require('./counter.txt');


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
    const path = `/${id}.txt`;
    fs.readFile(exports.dataDir + path, (err, fileData) => {
      if (err) {
        callback(err, '');
      } else {
        // console.log(fileData.toString());
        callback(err, { id, text: fileData.toString() });
      }
    });


  });
};



exports.update = (id, text, callback) => {
  console.log(id);
  const path = `/${id}.txt`;
  fs.access(exports.dataDir + path, (err) => {
    fs.writeFile(exports.dataDir + path, text, (err) => {
      if (err) {
        throw ('error editing file');
      } else {
        callback(err, text);
      }
    });
  });

  // fs.readdir(exports.dataDir, (err, files) => {
  //   // fs.readFile(exports.dataDir + path, (err, fileData) => {



  //   // });
  // });

  // // var item = items[id];
  // // if (!item) {
  // //   callback(new Error(`No item with id: ${id}`));
  // // } else {
  // //   items[id] = text;
  // //   callback(null, { id, text });
  // // }
};

exports.delete = (id, callback) => {
  var path = exports.dataDir + `/${id}.txt`;
  fs.unlink(path, (err) => {
    if (!id) {
      // report an error if item not found
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
