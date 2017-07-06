    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var CommentSchema = new Schema({
        body: { type: String, required: true },
        author: { type: String, required: true },
        upvotes: Number
      });

    var PostSchema = new Schema({
      title: { type: String, required: true },
      content: { type: String, optional: true },
      username: { type: String, required: true },
      comments: [CommentSchema],
      upvotes: Number
    });

    module.exports = mongoose.model('posts', PostSchema);