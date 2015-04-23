    var _ = require('lodash')

    var Post = require('./post.model');

    function handleError(res, err) {
      return res.send(500, err);
    }

    // Get list of posts
    exports.index = function(req, res) {
        Post.find(function (err, posts) {
        if(err) { return handleError(res, err); }
        return res.json(200, posts);
      });
    } ;

    // Creates a new post in datastore.
    exports.create = function(req, res) {
      req.body.comments = []
      req.body.upvotes = 0
      Post.create(req.body, function(err, post) {
        if(err) { return handleError(res, err); }
        return res.json(201, post);
      });
    };

    exports.show = function(req, res) {
        Post.findById(req.params.id, function (err, post) {
            if(err) { return handleError(res, err); }
            return res.json(200, post);

        });
    } ;

    // Update an existing posts upvotes in datastore.
    exports.update_upvotes = function(req, res) {
       Post.findById(req.params.id, function (err, post) {
            post.upvotes = req.body.upvotes
            post.save(function (err) {
                if(err) { return handleError(res, err); }
                return res.json(200, post);
            });
        });
    };

    // Add a comment to a post
    exports.add_comment = function(req, res) {
       Post.findById(req.params.id, function (err, post) {
              var comment = {
                  body: req.body.body,
                  author: req.body.author ,
                  upvotes: 0
               }
              post.comments.push(comment)
              post.save(function (err) {
                if(err) { return handleError(res, err); }
                var last = _.last(post.comments)
                if (last != undefined) {
                   return res.json(200, last);
                } else {
                  return res.send(500,"Database error")
                   }
              });
        });
    };

exports.search = function(req, res) {
  var key= req.params.keywords;
  console.log(key);
  Post.find({title: { $regex: key }},null,null,function (err, post) {
     if(err) { return handleError(res, err); }
     if(!post) { return res.send(404); }
     return res.json(200, post);
   });
};


    exports.update_comment_upvotes = function(req, res) {
        Post.findById(req.params.post_id, function (err, post) {
            var comment_index = _.findIndex(post.comments ,
               function(comment) {
                  return comment._id == req.params.comment_id;
              });
           if (comment_index != -1) {
              post.comments[comment_index].upvotes = req.body.upvotes
              post.save(function (err) {
                console.log(post.comments)
                  if(err) { return handleError(res, err); }
                  return res.json(200,post.comments[comment_index])
                });
            } else {
              return res.send(401,"Bad comment id")
            }

         })
      }