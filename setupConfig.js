const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, '..', '..');
const packageJsonPath = path.join(projectPath, 'package.json');
const packageJsonFile = JSON.parse(fs.readFileSync(packageJsonPath), 'utf8');

// add Prettier script to package.json
const prettierScript =
  'prettier --config .prettierrc.json --write "src/**/*.js"';
packageJsonFile.scripts['pretty'] = prettierScript;

// add ESLint script to package.json
const eslintScript = 'eslint "src/**/*.js"';
packageJsonFile.scripts['lint'] = eslintScript;

// set up `husky` and `lint-staged`
packageJsonFile['husky'] = {
  hooks: {
    'pre-commit': 'lint-staged',
  },
};
packageJsonFile['lint-staged'] = {
  "src/**/*.js": [
    'prettier --config .prettierrc.json --write',
    'eslint',
    'git add',
  ]
}

const packageJsonString = JSON.stringify(packageJsonFile, null, 2);
fs.writeFileSync(packageJsonPath, packageJsonString);
