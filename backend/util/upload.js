// utils/upload.js
const multer = require('multer');

const storage = multer.memoryStorage(); // important for buffer
const audioFilter = (req, file, cb) => {
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp4', 'audio/m4a'];
    const isValidType = allowedTypes.includes(file.mimetype);

    if (isValidType) {
        cb(null, true);
    } else {
        cb(new Error('Only audio files (mp3, wav, m4a) allowed'));
    }
};

const upload = multer({ storage, fileFilter: audioFilter });

module.exports = upload;
