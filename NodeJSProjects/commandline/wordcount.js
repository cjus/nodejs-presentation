#!/usr/bin/env node

/**
 * @name wordcount
 * @description Count the number of words in a text file. In this context a word is defined as a series of characters
 * separated by one or more spaces.
 */

'use strict';

var liner = require('./liner')
  , fs = require('fs')
  , words = [];

/**
 * @name displayHelp
 * @description Display help information
 */
function displayHelp() {
  console.log('wordcount - count the number of words in a text file');
  console.log('Syntax: wordcount filename');
  console.log('\t-h displays this help info');
}

/**
 * @name parseProgramArguments
 * @description parse the command line argument flags by removing dashes (-) and splitting up concatenated options
 * flags such as -eo
 * @param args {array} - program arguments
 * @return array containing program arguments
 */
function parseProgramArguments(args) {
  var cleanedArgs = [], temp = [];

  // first two array indexes will node and the program path, so remove those
  args = args.slice(2);

  // now enumerate args to work with each parameter
  args.forEach(function(item) {
    item = item.replace(/[\-]+/g, '');
    cleanedArgs.push(item);
  });
  return cleanedArgs;
}

/**
 * @name processLine
 * @description process a single line of text
 * @param line {string} - input line of text
 */
function processLine(line) {
  var wordsFound = line.split(' ');
  wordsFound.forEach(function(word) {
    words.push(word);
  });
}

/**
 * displayError
 * Display error messages in red
 * @param message
 */
function displayError(message) {
  console.log(message);
}

/**
 * @name main
 * @description program entry point
 * @note this main function could have been written as an IEFE (immediately executing function expression) but this
 * version is simpler to follow for newer JavaScript developers.
 */
function main() {
  var programArguments
    , source
    , fileName
    , CANT_OPEN_FILE_ERRROR_NUMBER = 34;

  // parse command line arguments
  programArguments = parseProgramArguments(process.argv);

  if (programArguments.indexOf('h') > -1) {
    displayHelp();
    process.exit(0);
  }

  if (programArguments.length !== 1) {
    console.log('missing required file path argument');
    process.exit(-1);
  }

  // grab filename
  fileName = programArguments[0];

  // pass filename to the filesystem createReadStream member function
  source = fs.createReadStream(fileName);

  source.pipe(liner);

  source.on('error', function(err) {
    if (err.errno === CANT_OPEN_FILE_ERRROR_NUMBER) {
      displayError('Can\'t open ' + err.path);
    } else {
      displayError(err);
    }
    process.exit(-1);
  });

  liner.on('readable', function() {
    var lineIn;
    while (lineIn = liner.read()) {
      processLine(lineIn);
    }
  });

  process.on('exit', function() {
    console.log('Total words found: ', words.length);
  });
}

main();

