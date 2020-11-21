const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
  },
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
