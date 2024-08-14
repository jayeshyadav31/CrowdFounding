const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
  transactionComplete: {
    type: Boolean,
    default: false,
  },
  userId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  transactionID: {
    type: String,
    default: "",
  },
  campaign: {
    type: Schema.Types.ObjectId,
    required:true,
    ref: "Campaign",
  },
});

const Donation = mongoose.model("Donation", DonationSchema);

module.exports = Donation;