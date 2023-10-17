const {Schema, model, Types} = require('mongoose');

const linksSchema = new Schema({
   url: {type: String, required: true},
   title: {type: String, required: true},
   qrcode: {type: String, required: true},
   date: {type: Date, default: Date.now},
   owner: {type: Types.ObjectId, ref: 'AuthUser'}
});

const Links = model('Links', linksSchema);

module.exports = Links;