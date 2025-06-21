const Chapter = require('../models/Chapter');
const Scripture = require('../models/Scripture');
const User = require('../models/User');
const Verse = require('../models/Verse');
const { deleteChapter } = require('./chapterController');

const addScripture = async (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id);
    try {
        const scripture = new Scripture({
            ...req.body,
            user_id: user_id
        });
        console.log(scripture);
        await scripture.save();
        console.log("complete");
        res.json({ message: 'Scripture added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error :' + err });
    }
}

const getScriptureByScriptureId = async (req, res) => {
    const scripture_id = req.params.scripture_id;
    try {
        console.log('Fetching scripture with id:', scripture_id);
        const scripture = await Scripture.findOne({ _id: scripture_id });

        if (!scripture) {
            return res.status(404).json({ message: 'Scripture not found' });
        }

        console.log("Scripture found:", scripture);
        return res.json(scripture);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ message: 'Server Error: ' + e.message });
    }
};


const getScriptureByUserId = async (req, res) => {

    const user_id = req.params.user_id;

    try {
        const user = User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const scripture = await Scripture.find({ user_id: user_id });
        res.json(scripture);

    } catch (err) {
        res.status(500).json({ message: 'server Error : ' + err });
    }
}

const getAllScripture = async (req, res) => {
    try {
        const scripture = await Scripture.find();
        res.json(scripture);
    } catch (err) {
        res.status(500).json({ message: 'server Error : ' + err });
    }
}

const updateScripture = async (req, res) => {
    try {
        const scripture = await Scripture.findByIdAndUpdate(req.params.scripture_id, req.body, { new: false });
        if (!scripture) {
            return res.status(404).json({ message: 'Scripture not found' });
        }
        res.json({ message: 'Scripture updated Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}

const deleteScripture = async (req, res) => {
    const scriptureId = req.params.scripture_id;

    const chapters = await Chapter.find({ scripture_id: scriptureId });

    // 2. Delete all verses in each chapter
    for (const chapter of chapters) {
        await Verse.deleteMany({ chapter_id: chapter._id });
    }

    // 3. Delete all chapters
    await Chapter.deleteMany({ scripture_id: scriptureId });

    try {

        const scripture = await Scripture.deleteOne({ _id: scriptureId });
        if (!scripture) {
            return res.status(404).json({ message: 'Scripture not found' });
        }
        res.json({ message: 'Scripture deleted Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error : ' + err });
    }
}

module.exports = {
    addScripture,
    getScriptureByUserId,
    getScriptureByScriptureId,
    getAllScripture,
    updateScripture,
    deleteScripture
}