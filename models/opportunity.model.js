const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  verified: {
    type: Boolean
  },
  host_id: {
    type: String,
    required: true,
  },
  date_posted: {
    type: Date
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: String
  },
  location: {
    type: String,
  },
  reviews: {
    type: String
  },
  position_type: [
    {
      type: String,
      required: true
    }
  ],
  opp_img: {
    type: String,
    trim: true
  },
  start_date: {
    type: String
  },
  temp_region: {
    type: String
  },
  end_date: {
    type: String
  },
  due_date: {
    type: String
  },
  tags: [
    {
      type: String
    }
  ],
  suggestion: {
    type: Boolean
  },
  temp_host_name: {
    type: String
  },
  sector: [
    {
      type: String,
      required: true
    }
  ],
  target_demo: [
    {
      type: String
    }
  ],
  learn_more: {
    type: String,
    required: true
  },
  application_link: {
    type: String
  },
  poc: {
    type: String
  },
  ambassador_id: {
    type: String
  },
  online: {
    type: Boolean
  },
  archived:{
    type: Boolean
  },
  recurring: {
    type: Boolean
  },
  paid: {
    type: String
  }
}, {
  timestamps: true,
});

opportunitySchema.index(
  {
    title: "text",
    description: "text"
  }
)

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;