const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function(req, res) {
    if (req.query.allEntities == "true") {
        db.Author.findAll({ include: [db.Book] }).then(function(authors) {
            ret.json(authors, res);
        });
    } else {
        db.Author.findAll().then(function(authors) {
            ret.json(authors, res);
        });
    }
});

router.get("/:authorID", function(req, res) {
    if (req.query.allEntities == "true") {
        db.Author.findByPk(req.params.authorID, { include: [db.Book] }).then(function(author) {
            if (author) {
                ret.json(author, res);
            } else {
                res.end();
            }
        });
    } else {
        db.Author.findByPk(req.params.authorID).then(function(author) {
            if (author) {
                ret.json(author, res);
            } else {
                res.end();
            }
        });
    }
});

//CHANGES MADE BELOW
//Added the function below to get the list of books by entering author ID
router.get("/books/:authorID", function(req, res) {
  db.Author.findByPk(req.params.authorID, {include: [db.Book]}).then(function(author) {
    if (author) {
      ret.json([author], res);
    } else {
      res.end();
    }
  });
});

//CHANGES MADE BELOW
//Added website field in the database for authors.
router.post("/", function(req, res) {
    db.Author.create({ name: req.body.name, website: req.body.website}).then(function(author) {
        ret.json(author, res);
    });
});

router.post("/:authorID/books", function(req, res) {
    db.Author.findByPk(req.params.authorID, { include: [db.Book] }).then(function(author) {
        if (author) {
            db.Book.findOrCreate({
                where: { title: req.body.bookTitle, isbn: req.body.bookISBN, quantity: req.body.bookQuantity }
            }).spread(function(book, created) {
                author.addBook(book);
                author.reload().then(function(author) {
                    ret.json(author, res);
                });
            });
        } else {
            res.end();
        }
    });
});

router.post("/:authorID/books/:bookID", function(req, res) {
    db.Author.findByPk(req.params.authorID, { include: [db.Book] }).then(function(author) {
        if (author) {
            db.Book.findByPk(req.params.bookID).then(function(book) {
                if (book) {
                    author.addBook(book);
                    author.reload().then(function(author) {
                        ret.json(author, res);
                    });
                }
            });
        } else {
            res.end();
        }
    });
});

router.put("/:authorID", function(req, res) {
    db.Author.findByPk(req.params.authorID).then(function(author) {
        if (author) {
          author.name = req.body.name;
          author.website = req.body.website;
            author.save().then(function(author) {
                ret.json(author, res);
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:authorID", function(req, res) {
    db.Author.findByPk(req.params.authorID)
        .then(function(author) {
            if (author) {
                return author.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});
module.exports = router;
