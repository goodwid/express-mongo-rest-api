const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('People', new Schema( {
  name: {
    type: String,
    required: true
  },
  family: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  killed_by: {
    type: String
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: 'Locations',
    required: true
  }
},{
  timestamps: true

}));
