const fs = require("fs");
const path = require("path");
const fsPromises = fs.promises;

class FilesManager {
    tempDirectoryName = 'TEMP';

    async saveBase64ToFile(req, base64, fileName) {
        let base64Image = base64.split(';base64,').pop();
        const currentPath = process.cwd();
        const dir = path.join(currentPath, this.tempDirectoryName);

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        const [,type] = base64.split(';')[0].split('/');
        const filePath = path.join(dir, fileName + '.' + type);

        await fsPromises.writeFile(filePath, base64Image, 'base64');

        const baseUrl = req.protocol + '://' + req.get('host') + '/files/' + fileName + '.' + type;
        console.log(baseUrl)

        return baseUrl;
    }
}

module.exports = new FilesManager();