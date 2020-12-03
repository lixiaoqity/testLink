<h2>Programming language</h2>

JavaScript

<h2>Install</h2>

**Install globally**

npm install link-checker-lixiaoqi -g

**Install locally**

Please download or clone the repository to your computer. Then change current directory to be the repository.

npm init --- Initial your node.js enviroment.<br>
npm link --- Create a symbolic link.<br>
npm install --- Install the modules.<br>
npm test --- Pretest your code before your pull a request.<br>

<h2>Formatting using prettier</h2>
Use npm run prettier will formate all the file in the project.
Use npm run prettier-check will check that files are already formatted, rather than overwriting them.

<h2>Identifying problematic patterns using eslint</h2>
Use npm run eslint will check all the .js file in the project.
Use npm run eslint-fix will automatically fix problems.

<h2>Editor/IDE Integration</h2>
Install Eslint and Prettier in the extentions of vscode. Set the settings.json and extensions.json file.

<h2>Edit test file</h2>
If you add a new .js file, please add a new test file named fileName.test.js. If you add a pice of code, you can add a unit test in the relevant test file.
