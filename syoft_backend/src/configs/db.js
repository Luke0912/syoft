const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb+srv://shubham09:qwerty12@cluster0.ry4r4.mongodb.net/syoft?retryWrites=true&w=majority'
  );
};
