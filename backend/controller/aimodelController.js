const Dataset = require("../models/Dataset");
const Verse = require("../models/Verse")
const axios = require("axios");

const trainModel = async () => {
    console.log("trainnig start");
    const verses = await Verse.find().lean();
    const payload = { verses };
    
    axios.post('http://127.0.0.1:8000/train', payload,
        { headers: { 'Content-Type': 'application/json' } }
    )
        .then(response => {
            console.log(response);
            const keywordSample = response.data.keyword_sample;

            // Optional: Flatten the list of lists into a single array
            const allKeywords = keywordSample.flat();

            // Save to your Dataset model (assuming it has a static .save method)
            const datasetEntry = new Dataset({ keywords: allKeywords }); // adjust field name to match schema
            datasetEntry.save();

            console.log("Raw Keyword Sample:", keywordSample);
            console.log("All Keywords (flattened):", allKeywords);
        })
        .catch(error => {
            console.log(error);
        })
}

const getKeyWords = async (req, res) => {
    console.log("start");
    try {
        const keyword = await Dataset.find();
        if (!keyword) {
            return res.status(404).json({ message: "keywords not found" });
        }
        return res.json(keyword);
    } catch (err) {
        return res.status(500).json({ message: 'Server Error:' + err });
    }
}

const suggestVerses = async (req, res) => {
    console.log("suggestion start");
    console.log(req.body)
    axios.post('http://127.0.0.1:8000/predict', req.body,
        { headers: { 'Content-Type': 'application/json' } }
    )
        .then(response => {
            console.log(response);
            return res.json(response.data);
        })
        .catch(error => {
            console.log(error);
        })

}
module.exports = {
    trainModel,
    getKeyWords,
    suggestVerses
}