import camelCase from 'lodash.camelcase'

// Extract only '.js' files in current modules folder
const requireModule = require.context(".", true, /\.js$/);
console.log(requireModule.keys);

// Assigning Empty modules
const modules = {};
requireModule.keys().forEach(fileName => {
    // Extracting filename from folders path
    const fileNameArr = fileName.toString().split('/')
    const fileNameFromDirectory = fileNameArr[fileNameArr.length - 1];
    // Avoiding or skipping index.js file
    if (fileName === "./index.js") return;
    // Replace ./ and .js
    const path = fileNameFromDirectory.replace(/(\.\/|\.js)/g, '')
    // By Using camelCase functions 
    // Ex: filename is auth_module => will return authModule
    const moduleName = camelCase(path);
    // By using namespaced: true, avoid name conflit;
    // Ex: Let you have 'updateAuthData' are defining two or more than two modules, 
    // then it makes a conflict which 'updateAuthData to be called'

    if (!modules[moduleName]) {
        // modules[moduleName] = {
        //     namespaced: true
        // }
    }

    // adding default export object to modules  
    modules[moduleName] = requireModule(fileName).default;
});
export default modules;