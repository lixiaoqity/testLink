<h2>TestLinks</h2>

testLinks is a command-line tool for finding and reporting dead links in a file.

<h2>Usage</h2>

testLinks                           --- Help. <br>
testLinks -v/--version              --- Check the version of tool.
testLinks fileName                  --- Test the dead links in a file.<br>
testLinks -s fileName               --- check whether http:// urls actually work using https:// with the argument -s.<br>
testLinks -j/--json/\j fileName     --- Test the dead links in a file and output json data.<br>
testLinks -i/--ignore/\i fileName   --- Exclude URLs from our check based on a URL pattern file and test the dead links in a file.<br>
testLinks -t/--telescope/\t         --- Check the links in the last 10 posts indexed by my local Telescope and Url is a local Telescope url(http://localhost:3000/posts).<br>


<h2>Features</h2>
  
The tool is used to find and test the status of Urls which start with http:// or https:// in a file or url.

The green output and "good" mean the url which you test is safe and the status code is 200.<br>
The red output and "bad" mean the url which you test is not safe and the status code is 400 or 404.<br>
The gray output and "unknow" mean other status.<br>
The yellow output and "direct" mean the url which you test is not safe and the status code is 301 307 or 308.<br>


