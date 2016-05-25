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
    type: Schema.Types.ObjectId
  },
  home: {
    type: Schema.Types.ObjectId,
    required: true
  }
},{
  timestamps: true

}));
