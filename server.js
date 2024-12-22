const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/files', (req, res) => {
    fs.readFile('files.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/files', (req, res) => {
    const newFile = req.body;
    fs.readFile('files.json', (err, data) => {
        const fileList = err ? [] : JSON.parse(data);
        fileList.push(newFile);
        fs.writeFile('files.json', JSON.stringify(fileList), (err) => {
            if (err) {
                res.status(500).send('Error saving file data');
            } else {
                res.status(200).send('File added successfully');
            }
        });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
