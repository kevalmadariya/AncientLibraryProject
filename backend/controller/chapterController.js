const Chapter = require('../models/Chapter');
const Verse = require('../models/Verse');

const addChapter = async (req, res) => {
    try {
        console.log('Started');
        const chapter = new Chapter({ ...req.body, scripture_id: req.params.scripture_id });
        console.log('save remaining' + chapter);

        await chapter.save();
        console.log("complete");
        res.status(201).json({ message: 'Chapter Added Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}

const getChaptersByScriptureID = async (req, res) => {
    const scripture_id = req.params.scripture_id;
    try {
        console.log("start");
        const chapter = await Chapter.find({ scripture_id: scripture_id });
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const getChaptersByID = async (req, res) => {
    const chapter_id = req.params.chapter_id;
    try {
        console.log("start");
        const chapter = await Chapter.find({ _id: chapter_id });
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.json(chapter);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' + err });
    }
}

const updateChapter = async (req, res) => {
    const chapter_id = req.params.chapter_id;
    try {
        const chapter = await Chapter.updateOne({ _id: chapter_id }, { $set: req.body });
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.json({ messsage: 'Chapter Updated Succecfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error :' + err });
    }
}

const deleteChapter = async (req, res) => {
    const chapter_id = req.params.chapter_id;
    try {
        await Verse.deleteMany({ chapter_id: chapter_id });
        const chapter = await Chapter.deleteOne({ _id: chapter_id });
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        res.json({ messsage: 'Chapter Deleted Succecfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error :' + err });
    }
}
module.exports = {
    addChapter,
    getChaptersByScriptureID,
    updateChapter,
    deleteChapter,
    getChaptersByID
}   