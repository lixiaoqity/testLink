#!/usr/bin/env node

const pjson = require('./package.json');
const readFile = require('./src/read-file');
const findIgnoreUrls = require('./src/find-ignore-urls');
const readUrl = require('./src/read-url');
require('dotenv').config({ path: "./config/keys.env" });

let fileName = process.argv.slice(2);
let flag = false;
let flagj = false;
let flagError = false;
//let flagt = false;

if (fileName.length < 1) {
    console.log('Help:');
    console.log('Input "testLinks -v/--version" in command line --- Check the command line tool version and name!');
    console.log('Input "testLinks [file name]" in command line --- finding and reporting dead links!');
    console.log('Input "testLinks -j/--json [file name]" in command line --- output Json data!');
    console.log('Input "testLinks -i/--ignore [ignore file name] [file name]" in command line --- finding and reporting dead links excluding ignore urls!');
    process.exit(1);
}
else {
    if (fileName.length == 1 && (fileName[0] == "-v" || fileName[0] == "--version")) {
        console.log("name: testLinks");
        console.log("version: " + pjson.version);
    }
    else if(fileName.length == 1 && (fileName[0] == "-t" || fileName[0] == "--telescope" || fileName[0] == "\t")){
        readUrl("http://localhost:3000/posts",flagj);
    }
    else {
        let ingoreUrlRegex = null;

        if (fileName[0] == "-s" && fileName.length > 1) {
            flag = true;
            fileName = fileName.slice(1);
        }
        if ((fileName[0] == "-j" || fileName[0] == "--json" || fileName[0] == "\j") && fileName.length > 1) {
            flagj = true;
            fileName = fileName.slice(1);
        }
        // if ((fileName[0] == "-t" || fileName[0] == "--telescope" || fileName[0] == "\t") && fileName.length > 1) {
        //     flagt = true;
        //     fileName = fileName.slice(1);
        // }
        if ((fileName[0] == "-i" || fileName[0] == "--ignore" || fileName[0] == "\i") && fileName.length > 2) {
            try {
                ingoreUrlRegex = findIgnoreUrls(fileName[1])
            } catch(badLines) {
                console.log("This is invalid.  It doesn't use http:// or https://");
                badLines.map(s => console.log(s));
                console.log();
                flagError = true;
            }           
            fileName = fileName.slice(2);
        }
        for (let i = 1; i <= fileName.length && flagError == false; i++) {            
            // if(flagt){
            //     readUrl(fileName[i-1],flagj);
            // }
            // else{
            //     readFile(fileName[i-1],ingoreUrlRegex,flag,flagj);
            // }
            readFile(fileName[i-1],ingoreUrlRegex,flag,flagj);
        }
    }
}

