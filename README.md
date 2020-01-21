# Wiki-API - RESTful API

Wiki-API is my attempt of building my own version of an RESTful API.  I have not created a front-end for this application at the moment.


## Built with

* Node JS & Express
* Mongoose
* Robo 3T - GUI for interacting with MongoDB
* Postman - used for testing API routes

## What I learned building the Wiki-API

A review of what it means for an application to be RESTful.  

REST - REpresentational State Transfer

    is an architectural style for designing Application Programming Interfaces (API).  

    Most important rules for making an API RESTful
      * Use HTTP request verbs
        * GET
        * POST
        * PUT
        * PATCH
        * DELETE
      * Use specific pattern of routes/endpoints URLs

  HTTP request verbs are similarities to CRUD

  **GET - READ**

  **POST - CREATE**  
    * POST route should go to a collection of resources rather than a specific resource

  **PUT - PATCH - UPDATE**  <br/>

  Difference between PUT and patch  <br/>

  **PUT** - updating by sending an entirely new entry to replace the previous one.

  **PATCH** - only sends the piece of data that needs to updated

  **DELETE - DELETE**

Express routing

  using chainable route handlers for route paths using ```app.route()```

  ```
    app.route('/articles')
    // Get all articles from wikiDB
    .get((req, res) => {
      Article.find({}, (err, results) => {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
      });
    })
    // Post new Article in wikiDB
    // POST should only go to a collection of resources rather than a specific resource
    .post((req, res) => {
      const newArticle = new Article ({
        title : req.body.title,
        content: req.body.content
      });
      newArticle.save((err) => {
        if (!err) {
          res.send('Successfully added a new article.');
        } else {
          res.send(err);
        }
      });
    })
    ```
