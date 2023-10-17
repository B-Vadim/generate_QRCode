const AuthUser = require('../models/AuthUser');
const Links = require('../models/Links');
// const config = require('config');


const setSaveLink = async (req, res) => {
   try {
      const {url, qrcode, title} = req?.body;

      const existing = await Links.findOne({url});
      if (existing) {
         return res.json({link: existing})
      };

      const qr = new Links({url, qrcode, title, owner: req?.user?.userId});
      await qr.save();

      res.status(201).json({message: 'QRCode saved', link: qr})
   } catch (e) {
      res.status(500).json({message: 'Error save link'});
   }
}
const getLinks = async (req, res) => {
   try {
      const links = await Links.find({ owner: req?.user?.userId })
      res.json(links);
      
   } catch (e) {
      res.status(500).json({message: 'Error get links'});
   }
}
const removeLink = async (req, res) => {
   try {
      const link = await Links.findByIdAndDelete(req?.body?.idLink, {owner: req?.user?.userId});
      res.json(link);
   } catch (e) {
      res.status(500).json({message: 'Error not delete link'});
   }
}

module.exports = {setSaveLink, getLinks, removeLink}