#!/usr/bin/env node

const process = require("process");
const fs = require('fs');
const pjson = require('./package.json');
const testLink = require("./src/test-link");

const regex = /(https?)(:\/\/)([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+)/gi;

let fileName = process.argv.slice(2);
let flag = false;

if (fileName.length < 1) {
    console.log('Help:');
    console.log('Input "testLinks v/version" in command line --- Check the command line tool version and name!');
    console.log('Input "testLinks [file name]" in command line --- finding and reporting dead links!');
    process.exit(1);
}
else {
    if (fileName.length == 1 && (fileName[0] == "v" || fileName[0] == "version")) {
        console.log("name: testLinks");
        console.log("version: " + pjson.version);
    }
    else {
        if (fileName[0] == "-s" && fileName.length > 1) {
            flag = true;
            fileName = fileName.slice(1);
            console.log(fileName);
        }

        for (let i = 1; i <= fileName.length; i++) {
            let data;
            fs.readFile(fileName[i - 1], (err, response) => {
                if (err) {
                    console.log(`File {${fileName[i - 1]}} can not be found. Please try again!`);
                }
                else {
                    data = response.toString();
                    let urls = data.match(regex);
                    if (urls) {
                        for (let u of urls) {
                            try {

                                if (flag && !u.startsWith("https")) {
                                    testLink(u.replace(/^http/, "https"));
                                }
                                else {
                                    testLink(u);
                                }

                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    else {
                        console.log(`No suitable http(s) url in file {${fileName[i - 1]}}.`);
                    }
                }
            })
        }
    }
}

