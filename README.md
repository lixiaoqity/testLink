<h2>TestLinks</h2>

testLinks is a command-line tool for finding and reporting dead links in a file.

<h2>Programming language</h2>

JavaScript

<h2>Install</h2>

Please download or clone the repository to your computer. Then change current directory to be the repository. 

npm init     --- Initial your node.js enviroment.
npm link     --- Create a symbolic link.
npm install  --- Install the modules.

<h2>Usage</h2>

testLinks    --- Help. 
testLinks v/version  --- Check the version of tool.
testLinks fileName   --- Test the dead links in a file.

<h2>Features</h2>
  
The tool is used to find and test the status of Urls which start with http:// or https:// in a file.

The green output and "good" mean the url which you test is safe and the status code is 200.
The red output and "bad" mean the url which you test is not safe and the status code is 400 or 404.
The gray output and "unknow" mean other status.
The yellow output and "direct" mean the url which you test is not safe and the status code is 301 307 or 308.


