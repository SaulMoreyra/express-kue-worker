const os = require('os');
const fs = require('fs');
const download = require('download');
const zipFolder = require('zip-folder');

module.exports = {
  jobId: "CreateFile",
  async handle({ data, done }) {
    try {
      const baseFolder = os.tmpdir() + "/nomico";
      fs.mkdirSync(baseFolder);

      for (let index = 0; index < 3; index++) {
        const folderTemp = baseFolder + `/f${index}`;
        fs.mkdirSync(folderTemp);
        fs.writeFileSync(folderTemp + `/image${index}.jpg`, await download('https://picsum.photos/200'));
      }

      
    } catch (error) {
      done(error);
    }
  }
}
