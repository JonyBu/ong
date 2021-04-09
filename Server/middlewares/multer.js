const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

const uploadSliders = multer({ storage }).fields([
  {
    name: 'image',
    maxCount: 1
  },
  { 
    name: 'sliderPic1', 
    maxCount: 1 
  }, 
  { 
    name: 'sliderPic2', 
    maxCount: 1 
  },
  { 
    name: 'sliderPic3', 
    maxCount: 1 
  }
]);

module.exports = {
  upload,
  uploadSliders
}
