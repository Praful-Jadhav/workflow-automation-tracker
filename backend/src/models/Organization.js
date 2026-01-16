const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
    maxlength: [100, 'Organization name cannot exceed 100 characters']
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9]+[\-]?[a-z0-9]+\.[a-z]{2,}$/, 'Please provide a valid domain']
  },
  subscriptionPlan: {
    type: String,
    enum: ['FREE', 'PRO', 'ENTERPRISE'],
    default: 'FREE'
  },
  settings: {
    dataRetentionDays: {
      type: Number,
      default: 90,
      min: [30, 'Data retention must be at least 30 days'],
      max: [3650, 'Data retention cannot exceed 10 years']
    }
  }
}, {
  timestamps: true
});

// Indexes for performance
organizationSchema.index({ domain: 1 });
organizationSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Organization', organizationSchema);
