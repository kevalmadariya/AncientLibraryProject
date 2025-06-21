const mongoose = require('mongoose')

const progressSchema = mongoose.Schema({
      user_id : {
          type : mongoose.Schema.Types.ObjectId,
          required : true,
      },
      verse_list : {
          type : [mongoose.Schema.Types.ObjectId],
      },
});

module.exports = mongoose.model('Progress',progressSchema);