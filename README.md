# The kata
Tennis has a rather quirky scoring system, and to newcomers it can be a little difficult to keep track of. The tennis society has contracted you to build a scoreboard to display the current score during tennis games.

You can read more about Tennis scores on wikipedia which is summarized below:

- A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
- The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “Love”, “Fifteen”, “Thirty”, and “Forty” respectively.
- If at least three points have been scored by each player, and the scores are equal, the score is “Deuce”.
- If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “Advantage” for the player in the lead.
- You need only report the score for the current game. Sets and Matches are out of scope.

# Acknowledgements
This kata is described on cyber-dojo.org

# Some assumtions for this implementation
- We are going to apply an style mockist to solve it
- Our unit tests are isolated of the rest of the classes by using stubs and mocks

# Enviroment configuration Typescript and Visual Studio
## Javascript project
First of all you need to instal nodejs in your machine and create your virtual environment in the folder where you are going to write the code.
```
node -v // to see the version of node js
npm install -g npm // to install the last version: global level
```
After this we need to create a file package.json where we are going to have dependencies.
```
npm init
```
## jest configuration and the first test
The recommendation is to define the configuration in a dedicated Js, Ts or JSON file. The file will be discovered automatically: jest.config.js|ts|json

You  have more information here: https://jestjs.io/docs/configuration and https://jestjs.io/docs/getting-started


``` 
npm install --save-dev jest 
npm install -g jest // para ejecutar directamente jest, instalalo a nivel global

```
We need to add the following section to our package.json

``` json
{
  "scripts": {
    "test": "jest"
  }
}

```

You could create an example of test called "dummy.test.js"
``` js
test('dummy test',()=> {
    expect(true).toBe(true);
});
```

And you could execute the tests with the following command
```
npm test
```

And now you could create a configuration file in javascript using the command: npx jest --init

But we will it, in the part of typescript
##  Intalling Typescript

You need to install typescript in nodejs.

```
npm install --save-dev typescript // este es el compilador de linea de comandos
npm i -g typescript // si lo que quieres es instalar a nivel global de maquina
```

You could install the extension in visual code for typescript.

To check if this configurations is working we can create a file main.ts and transpilate it.

```
npx tsc main.ts
```

You could execute the main.js which is result of the transpilation with "node main.js"

For example, you could create this file
``` ts
class DummyClass {
    dummyMethod() {
        return 2;
    }
}
```
And you will see a new file created: main.js with the transpilation to javascript.
##  Typescript project configuration
In the next step we're going to configurate a project:
```
npx tsc --init
```
The result will be a file tsconfig.json
``` json
{
"compilerOptions": {
    "target": "es5", <-- you are configurating the type of js. we are going tu use es5 (es5->es6->es2016)
    "module": "commonjs",
    "lib": ["es2015","dom"],
    "allowJs": true,
    "sourceMap": true,
    "rootDir": "./src", <- the folder where are your files .ts
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
    }
}
``` 
create a "src" folder for the production code. NOTE: You'll need to exclude some files in your tsconfig.json. If you don't do this change, your tsconfig.json will showed with errors.
```
..
 },
  "exclude": ["./dist/**/*", "webpack.config.js"]
}
```

## Install the web pack
* The webpack is a bundler. It will convert your module and dependencies in a single file
* webpack-cli is a tool with commands to manage webpack
* webpack-dev-server. It is only for developers. It is a server which group your project if you change code
* ts-loader. This tool tranform your typescript code into javascript code.

```
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev ts-loader
```
You must create a file "webpack.config.js" to configurate webpack.

``` js
const path = require('path');
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src")
                ],
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```
We are using as entry point the file "index.ts". You can create it with for example this example code.
``` ts
function hi( nombre: string){
    console.log("Hello " + nombre);
}

hi("Mike");
```
Now you could write in the console:
```
npx webpack --config=webpack.config.js

```
NOTE: You will need to move the main.ts to the "src" directory and delete the main.js file. the dummy.test.js file too. (You could remove them, they were temporary tests)


Then it will apeair a new folder with the javascript transpilation.

If you execute this bundle, you can see same result: if you execute it, it works in the the same way.
```
node dist/bundle.js   

```
We can configurate in the file package.json a script to build and make a build easier ( the test script, we will configurate it in other step)

``` json
  "scripts": {
        "build": "npx webpack --config=webpack.config.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
```
You can run the script with the following command: npm run build. Remember: npx => to execute tools in your environment npm run=> to execute scripts defined in the package.json node => to execute javascript code
## Install jest for typescript
https://riptutorial.com/typescript/example/29207/jest--ts-jest-

Jest support Typescript, via Babel, you can see the annex. But, it is easier to use ts-test

```
npm install ts-node //maybe you will need it
npm install --save-dev jest @types/jest ts-jest typescript
```
Remove the jet.config.js which you created for the test with javascript and now execute again: npx jest --init (choose coverage, typescript, etc)

```
jest // if you have it as global
npm run test 
```
You will need to change the package.json
``` json
  "scripts": {
        "build": "npx webpack --config=webpack.config.js",
        "test": "jest"
    },
```

for the customization: https://jestjs.io/docs/configuratio

NOTE: In the tsconfig.json you will need to ignore more files and folders:
``` json
 }
  ,
  "exclude": [
    "./dist/**/*",
    "tests",
    "webpack.config.js",
    "jest.config.ts",
    "coverage"
  ]
```

Now upi could use these commands
```
npm run build // tranpile the "src" folder
npm run test // execute the tests
```
In addition, you must include a new config file for babel (jest use babel). babel.config.json
``` json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```
## Configure Visual Studio Code
We can add a configuration with Run->Add configuration->
``` json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [

        {
            "type": "node-terminal",
            "request": "launch",
            "name": "Run Jasmine Tests",
           "command": "npm test",
        }
    ]
}
```

Now you could debug your application with Run->Start Debuging

# Plugin for refactors
https://github.com/cancerberoSgx/typescript-plugins-of-mine/blob/master/vscode-typescript-refactors/README.md
You can install in Visual Studio Code.

#Annex
## Several nodejs verions in your computer
With Node Version Manager (nvm) you could have the version you want to install available in the computer. You could see the available versions
of nodejs with the following command:
```
nvm list available
```
You have more information here: 
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-windows

## Virtual environment
We have an example of using Virtual environments for several languages here: https://github.com/jenesuispasdave/using-virtual-environments
and https://github.com/ekalinin/nodeenv

You have some examples and scripts here:
https://github.com/JeNeSuisPasDave/using-virtual-environments/tree/example-node012

You will need to configure some things in windows. Please make a look to: https://www.develves.net/blogs/asd/2016-04-28-using-virtual-environments-nodejs/
After to copy the folder "nodejs", you will  need to do some changes in one of the scripts: activate-venv.ps1

```
$nodejsVsnExpected = "v16.17.1" //(change your installed version)
$nodejsVsnMax = "v16.17.2" //(change your installed version and increment it)
$nodejsDownloadLoc = "https://nodejs.org/en/download/releases/"
$jslclDir = ".jslcl"
$nodejsDir = "nodejs" //(put the folder where you have installed nodejs)

# Pick up the verification functions
#
. "$scriptDir\check-functions.src.ps1"

# Check whether Node.js v0.12.13 is installed
#
$nodejsInstallBase = Get-ChildItem -Path "Env:ProgramFiles" //(maybe you will need to change this folder, depending if you have 32 or 64 bits)
$nodejsInstallBase = $nodejsInstallBase[0].Value
$nodejsInstallBase = "$nodejsInstallBase\$nodejsDir"
```

```
 .\nodejs\make-venv.ps1
 script will install the virtual environment for a specific version of node by copying the pristine installcation image into a local .jslcl folder for the project—first checking whether .jslcl already exists and contains a valid virtual environment.

.\nodejs\activate-venv.ps1
script will check for a valid virtual environment local directory (i.e., a valid .jslcl directory) and will then add the .jslcl subdirectory to the path as well as the node_modules\.bin subdirectory to the path. Then it will prefix the command prompt with “(js)”. Finally it will create a deactivation script deactivate-venv.ps1 that should be used to deactivate the virtual environment (remove the virtual environment from the PATH and remove the command prompt prefix).

.\nodejs\provision-venv.ps1
script will install all the npm packages upon which the project depends. This script only installs packages locally, not globally. (Note: this avoids the issue of having a common global package installation location. That is, avoiding global packages avoids dependency conflicts between different instances of Node.js virtual environments).

.\nodejs\deactivate-venv.ps1


```


When you activate the environment you will see "(js)" this in the console:
(js) PS C:\workspace\ts\tennis_ts>

## Install jest for typescript with babel
Jest support Typescript, via Babel. So, you will need install babel:
``` 
npm install --save-dev babel-jest @babel/core @babel/preset-env

```
Configure Babel to target your current version of Node by creating a babel.config.js file in the root of your project:
``` ts
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```
Now you need to install typescript for babel
```
npm install --save-dev @babel/preset-typescript
```

This typescript support of babel is purely transpilation. Jest will not type-check your test as they are run. If you want that,
you can use ts-test instead or just run the typescript compiler tsc separately.

## Configurations for jtest
Yo don't have to use it. It is only information.
To make jest work with Typescript you will need to add configuration to package.json
``` json
//package.json
{
...
"jest": {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": ["ts", "tsx", "js"]
  }
}
```