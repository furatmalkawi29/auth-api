'use strict';

const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
});

const clothesModel = mongoose.model('clothes', clothesSchema);
//making new 'collection' in database called 'clothes'
//data addedcto clothes collection called 'documents'

module.exports = clothesModel;








