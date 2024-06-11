const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, 'uploads', file.filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading file' });
        }
        
        res.json({ success: true, content: data });
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
