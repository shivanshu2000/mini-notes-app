const mongoose = require("mongoose");

const collectionItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  info: {
    type: String,
  },

  parentCollectionId: {
    type: mongoose.Schema.ObjectId,
  },
});

const Collectionitem = mongoose.model("CollectionItem", collectionItemSchema);
module.exports = Collectionitem;
