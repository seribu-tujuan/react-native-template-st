const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, '..', '..');
const projectFile = require(path.join(projectPath, 'app.json'));
const projectName = projectFile.name;

// copy MainActivity.java to complete React Navigation configuration
const mainActivitySrc = path.join(__dirname, 'MainActivity.java');
const mainActivityDest = path.join(
  projectPath,
  `android/app/src/main/java/com/${projectName}/MainActivity.java`,
);

if (fs.existsSync(path.join(projectPath, 'android/'))) {
  fs.copyFileSync(mainActivitySrc, mainActivityDest);
}

// delete unnecessary project and template files
const projectFilesToDelete = ['App.js'];
const templateFilesToDelete = [
  'cleanup.js',
  'LICENSE',
  'README.md',
  'MainActivity.java',
];

const deleteFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return;
  }

  fs.unlinkSync(filePath);
};

const deleteProjectFile = (fileName) => {
  deleteFile(path.join(projectPath, fileName));
};

const deleteTemplateFile = (fileName) => {
  deleteFile(path.join(__dirname, fileName));
};

projectFilesToDelete.forEach(deleteProjectFile);
templateFilesToDelete.forEach(deleteTemplateFile);
