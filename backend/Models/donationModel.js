import mongoose from "mongoose";
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
  campaignId: {
    type: Schema.Types.ObjectId,
    required:true,
    ref: "Campaign",
  },
},{
  timestamps: true
});

const Donation = mongoose.model("Donation", DonationSchema);

export default Donation;