const Progress = require('../models/Progress');
const User = require('../models/User');

const addProgress = async (req,res) => {
    try{
       const progress = PageRevealEventrogress(req.body());
       await progress.save();
    }catch(err){
        res.status(500).json({message : 'Server Error :'+ err});
    }
}

const getProgressByUserId = async (req,res) => {

    const userId = req.params.userId;

    try{
        const user = User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const progress = await Progress.find({user_id : userid});
        res.json(progress);

    }catch(err){
        res.status(500).json({message: 'server Error : '+ err});
    }
}

const getAllProgress = async (req,res) => {
      try{
        const progress = await Progress.find();
        res.json(progress);
      }catch(err){
        res.status(500).json({message: 'server Error : '+ err});
      }
}

const updateProgress = async (req,res) => {
    try{
        const progress = await Progress.findByIdAndUpdate(req.params.id, req.body(), {new : false});
        if(!progress){
            return res.status(404).json({message : 'progress not found' });
        }
        res.json({message : 'progress updated Successfully'});
    }catch(err){
        res.status(500).json({message: 'Server Error : '+ err});
    }
}

const deleteProgress = async (req,res) => {
    const progressId = req.params.id;
    try{
        const progress = await Progress.findByIdAndRemove(progressId);
        if(!progress){
            return res.status(404).json({message : 'progress not found' });
        }
        res.json({message : 'progress deleted Successfully'});
    }catch(err){
        res.status(500).json({message: 'Server Error : '+ err});
    }
}

module.exports = {
    addProgress,
    getProgressByUserId,
    getAllProgress,
    updateProgress,
    deleteProgress
}