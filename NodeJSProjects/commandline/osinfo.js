#!/usr/bin/env node

/**
 * @name osinfo
 * @description Sample Node commandline application to display Operating System information. Uses the built-in global process object to query for os information.
 */

'use strict';

/**
 * @name displayHelp
 * @description Display help information
 */
function displayHelp() {
  console.log('osinfo - display OS Info as seen by Node.JS');
  console.log('Use these flags to display specific info:');
  console.log('\t-a all information');
  console.log('\t-e environment variables');
  console.log('\t-h this help output');
  console.log('\t-o OS platform (list them here)');
  console.log('\t-p processor architecture (list them here)');
  console.log('\t-v process versions');
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
    if (item.length > 1) {
      temp = item.split('');
      temp.forEach(function(flag) {
        cleanedArgs.push(flag);
      });
    } else {
      cleanedArgs.push(item);
    }
  });
  return cleanedArgs;
}

/**
 * @name info
 * @description helper function to display formatted info
 * @param label {string} - label message
 * @param info {string | array}
 */
function displayInfo(label, info) {
  console.log('[' + label + ']');
  console.log(info);
}

/**
 * @name main
 * @description program entry point
 * @note this main function could have been written as an IEFE (immediately executing function expression) but this
 * version is simpler to follow for newer JavaScript developers.
 */
function main() {
  var programArguments = parseProgramArguments(process.argv),
    showAll = false;

  if (programArguments.indexOf('h') > -1) {
    displayHelp();
  } else if (programArguments.indexOf('a') > -1) {
    showAll = true;
  }

  if (showAll || programArguments.indexOf('e') > -1) {
    displayInfo('Environment', process.env);
  }
  if (showAll || programArguments.indexOf('o') > -1) {
    displayInfo('Operating system', process.platform);
  }
  if (showAll || programArguments.indexOf('p') > -1) {
    displayInfo('Processor Architecture', process.arch);
  }
  if (showAll || programArguments.indexOf('v') > -1) {
    displayInfo('Version info', process.versions);
  }
}

main();

