import mongoose from "mongoose";

const priceTypesSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

export default mongoose.model("PriceTypes", priceTypesSchema);
