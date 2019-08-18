const fs = require('fs');
const path = require('path');

const projectFilesToDelete = ['App.js']
const templateFilesToDelete = ['cleanup.js']

const deleteFile = filePath => {
  if (!fs.existsSync(filePath)) {
    return
  }

  fs.unlinkSync(filePath)
}

const projectPath = path.join(__dirname, '..', '..')
const deleteProjectFile = fileName => deleteFile(path.join(projectPath, fileName))
const deleteTemplateFile = fileName => deleteFile(path.join(__dirname, fileName))

projectFilesToDelete.forEach(deleteProjectFile)
templateFilesToDelete.forEach(deleteTemplateFile)
