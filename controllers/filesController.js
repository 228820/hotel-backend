const FilesManager = require("../utils/files-manager");
const path = require("path");

class FilesController {
    async getFile(req, res) {
        const filePath = req.params.path
        if(!filePath) {
            return res.status(400).json({ message: 'Incorrect path' })
        }

        const options = {
            root: path.join(process.cwd(),FilesManager.tempDirectoryName)
        };

        try {
            return res.status(200).sendFile(filePath, options);
        } catch (e) {
            console.error(e);
            return res.status(404).json({ message: 'File not found' });
        }
    }
}

module.exports = new FilesController();