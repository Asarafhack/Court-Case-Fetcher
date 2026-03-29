import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema({
  caseType: String,
  caseNumber: String,
  year: String,
  responseData: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Case ||
  mongoose.model("Case", CaseSchema);