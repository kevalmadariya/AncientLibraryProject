const Verse = require('../models/Verse');
const { Readable } = require('stream');
const { createReadStream } = require('fs');
const csvParser = require('csv-parser'); // ✅ Correct usage for CommonJS
const { trainModel } = require('./aimodelController');

const addVerse = async (req, res) => {
    try {
        console.log(req.body);
        let audio = null;
        console.log(req.file);
        if (req.file) {
            audio = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }
        const verse = new Verse({ ...req.body, chapter_id: req.params.chapter_id, audio });
        await verse.save();
        trainModel();
        res.status(201).json({ message: 'Verse Added Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const addVerseByFile = async (req, res) => {
    const chapterId = req.params.chapter_id;
    const PreVerseCount = await Verse.countDocuments();
    console.log("Number of verses:", PreVerseCount);

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileMime = req.file.mimetype;
        const fileBuffer = req.file.buffer;
        const fileOriginalName = req.file.originalname;

        // JSON upload
        if (fileMime === 'application/json' || fileOriginalName.endsWith('.json')) {
            const jsonString = fileBuffer.toString('utf8');
            const data = JSON.parse(jsonString);

            for (const entry of data) {
                const verse = new Verse({ ...entry, chapter_id: chapterId });
                await verse.save();
            }

            return res.status(201).json({ message: 'All verses from JSON added successfully' });
        }

        // CSV upload
        else if (fileMime === 'text/csv' || fileOriginalName.endsWith('.csv')) {
            const verses = [];

            const stream = Readable.from(fileBuffer);
            await new Promise((resolve, reject) => {
                stream
                    .pipe(csvParser())
                    .on('data', (data) => verses.push(data))
                    .on('end', resolve)
                    .on('error', reject);
            });

            for (const entry of verses) {
                const verse = new Verse({ ...entry, chapter_id: chapterId });
                await verse.save();
            }
            const CurrverseCount = await Verse.countDocuments();
            console.log("Number of verses:", CurrverseCount);

            if (CurrverseCount - PreVerseCount > 10) {
                trainModel();
            }
            return res.status(201).json({ message: 'All verses from CSV added successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const getVerseByChapterId = async (req, res) => {
    const chapter_id = req.params.chapter_id;
    try {
        const verses = await Verse.find({ chapter_id: chapter_id });
        if (!verses) {
            res.status(404).json({ message: 'Verses Not found' });
        }
        res.json(verses);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateVerse = async (req, res) => {
    console.log(req.body);
    const verse_id = req.params.verse_id;
    let audio = null;
    console.log(req.file);
    if (req.file) {
        audio = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }

    try {
        const verse = await Verse.updateOne({ _id: verse_id }, { $set: { ...req.body, audio: audio } });
        if (!verse) {
            res.staus(404).json({ message: 'Verse Not found' });
        }
        console.log(verse);
        res.json({ messsage: 'Verse Updated Succecfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const deleteVerse = async (req, res) => {
    const verse_id = req.params.verse_id;
    try {
        const verse = await Verse.deleteOne({ _id: verse_id }, { $set: req.body });
        if (!verse) {
            res.staus(404).json({ message: 'Verse Not found' });
        }
        res.json({ messsage: 'Verse Deleted Succecfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

module.exports = {
    addVerse,
    getVerseByChapterId,
    updateVerse,
    deleteVerse,
    addVerseByFile
}