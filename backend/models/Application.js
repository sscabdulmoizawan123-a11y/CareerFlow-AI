const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    jobTitle:    { type: String, required: true },
    jobType:     { type: String, enum: ['internship', 'full-time', 'part-time', 'contract', 'remote'], default: 'full-time' },
    status:      { type: String, enum: ['bookmarked', 'applied', 'interview', 'offer', 'rejected', 'withdrawn'], default: 'applied' },
    applicationDate: { type: Date, default: Date.now },
    deadline:        Date,
    jobUrl:          String,
    location:        String,
    salary:          String,
    notes:           String,
    contactPerson:   String,
    contactEmail:    String,
    followUpDate:    Date,
    interviewDate:   Date,
    tags:            [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
