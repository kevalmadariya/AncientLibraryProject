const mongoose = require("mongoose")

const datasetSchema = mongoose.Schema({
      keywords : {
        type : [String],
      }
});

module.exports = mongoose.model('Dataset',datasetSchema);
