const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
//const counterFile = require('./data/counter.txt');

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (readCallback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      readCallback(null, 0);
    } else {
      readCallback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, writeCallback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      writeCallback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (lastCallback) => {
  readCounter((err, id) => {
    id++;
    writeCounter(id, lastCallback);
  });
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
