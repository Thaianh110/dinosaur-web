const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var speciesSchema = new mongoose.Schema(
  {
    tilte: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Species", speciesSchema);
