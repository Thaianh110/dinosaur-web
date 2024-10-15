const mongoose = require("mongoose"); // Erase if already required
const { type } = require("os");

// Declare the Schema of the Mongo model
var animalSchema = new mongoose.Schema(
  {
    common_name: {
      type: String,
      required: true,
    },
    images: {
        type:Array,
    },
    scientific_name: {
      type: String,
    },
    weigth: {
      type: Number,
    },
    height: {
      type: Number,
    },
    features: {
      type: String,
    },
    environment: {
      type: String,
    },
    specie: {
      type: mongoose.Types.ObjectId,
      ref: "species",
    },
    period: {
      type: mongoose.Types.ObjectId,
      ref: "period",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Animal", animalSchema);
