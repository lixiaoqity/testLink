#!/usr/bin/env node

const fs = require('fs');
const pjson = require('./package.json');
const testLink = require("./src/test-link");
const testLinkColor = require('./src/test-link-color');
const findIgnoreUrls = require('./src/find-ignore-urls');
require('dotenv').config({ path: "./config/keys.env" });

const regex = /(https?)(:\/\/)([-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+)/gi;

let fileName = process.argv.slice(2);
let flag = false;
let flagj = false;

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
        let ingoreUrlRegex = null;

        if (fileName[0] == "-s" && fileName.length > 1) {
            flag = true;
            fileName = fileName.slice(1);
        }
        if ((fileName[0] == "-j" || fileName[0] == "-json" || fileName[0] == "\j") && fileName.length > 1) {
            flagj = true;
            fileName = fileName.slice(1);
        }
        if ((fileName[0] == "-i" || fileName[0] == "--ignore" || fileName[0] == "\i") && fileName.length > 2) {
            ingoreUrlRegex = findIgnoreUrls(fileName[1])
            fileName = fileName.slice(2);
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
                            if (!u.match(ingoreUrlRegex)) {
                                try {
                                    if (process.env.CLICOLOR == 1) {
                                        if (flag && !u.startsWith("https")) {
                                            testLinkColor(u.replace(/^http/, "https"), flagj);
                                        }
                                        else {
                                            testLinkColor(u, flagj);
                                        }
                                    }
                                    if (process.env.CLICOLOR == 0) {
                                        if (flag && !u.startsWith("https")) {
                                            testLink(u.replace(/^http/, "https"), flagj);
                                        }
                                        else {
                                            testLink(u, flagj);
                                        }
                                    }
                                }
                                catch (error) {
                                    console.log(error);
                                }
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

