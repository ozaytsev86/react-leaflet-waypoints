module.exports = {
  diff: true, //When possible, show the difference between expected and actual values when an assertion failure is encountered.
  reporter: process.env.REPORTER || 'Nyan',
  recursive: true, //When looking for test files, recurse into subdirectories.
  require: ['tests/test.config.js', 'esm', '@babel/register', 'ignore-styles'], //Require a module before loading the user interface or test files
  file: ['tests/test-runtime.config.js'], //Explicitly include a test file to be loaded before other test files
};
