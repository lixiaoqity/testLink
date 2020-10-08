const chalk = require('chalk');
const request = require('request');

const testLink = (u)=> {
    request({url: u, method: 'HEAD'},(error,response)=>{
        if(!error){
            if (response.statusCode == 200) {
                console.log(chalk.green(u + ' is good.'));
            }
            else if (response.statusCode == 400 || response.statusCode == 404) {
                console.log(chalk.red(u + ' is bad.'));  
            }
            else if (response.statusCode == 301 || response.statusCode == 307 || response.statusCode == 308){
                console.log(chalk.yellow(u + ' is redirect.')); 
            }
            else {
                console.log(chalk.gray(u + ' is unknow.'));
            }
        }
        else{
            console.log(chalk.gray(u + ' is unknow.'));
        }
    })
}

module.exports = testLink;