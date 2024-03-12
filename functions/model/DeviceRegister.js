const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deviceRegisterSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopType: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    default: "admin",
  },
  password: {
    type: String,
    required: true,
    default: "admin123",
  },
  isGSTAvailable: {
    type: String,
    required: true,
  },
  GSTNumber: {
    type: String,
    required: false,
  },
  GSTPercentage: {
    type: String,
    required: false,
  },
  isApproved: {
    type: String,
    required: true,
    default: false,
  },
  approvedBy: {
    type: String,
    required: false,
  },
  approvedOn: {
    type: String,
    required: false,
  },
  subscriptionId: {
    type: String,
    required: false,
  },
  isActive: {
    type: String,
    required: true,
    default: true,
  },
  createdOn: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("DeviceRegistration", deviceRegisterSchema);
