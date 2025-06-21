const Superstition = require('../models/superstition');

const addsuperstition = async (rec,res) => {
    try{
       const superstition = new Superstition(req.body);
       await superstition.save();
       res.status(201).json({message : 'superstition Added Successfully'});
    }catch(err){
        res.status(500).json({message : 'Server Error : ' + err});
    }
}

const getsuperstitionsByUserID = async (req,res) => {
    const user_id = req.params.user_id;
    try{
        const superstition = await Superstition.find({user_id : user_id});
        if(!superstition){
            return res.status(404).json({message : 'superstition not found'});
        }
        res.json(chpater);
    }catch(err){
        res.status(500).json({message : 'Server Error' + err});
    }
}

const updatesuperstition = async (req,res) => {
      const superstition_id = req.params.superstition_id;
      try{
          const superstition = await Superstition.updateOne({_id : superstition_id} , {$set : req.body});
          if(!superstition){
            return res.status(404).json({message : 'superstition not found'});
          }
          res.json({messsage : 'superstition Updated Succecfully'});
      }catch(err){
        res.status(500).json({message : 'Server Error :' + err});
      }
}

const deletesuperstition = async (req,res) => {
        const superstition_id = req.params.superstition_id;
        try{
            const superstition = await Superstition.deleteOne({_id : superstition_id});
            if(!superstition){
                return res.status(404).json({message : 'superstition not found'});
            }
            res.json({messsage : 'superstition Deleted Succecfully'});
        }catch(err){
            res.status(500).json({message : 'Server Error :' + err});
        }
}
module.exports ={
     addsuperstition,
     getsuperstitionsByUserID,
     updatesuperstition,
     deletesuperstition
}