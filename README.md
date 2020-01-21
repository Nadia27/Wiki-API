# Wiki-API - RESTful API

Wiki-API is my attempt of building my own version of an RESTful API.  I have not created a front-end for this application at the moment.


## Built with

* Node JS & Express
* Mongoose
* Robo 3T
* Postman

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
    * POST should go to a collection of resources rather than a specific resource

  **PUT - PATCH - UPDATE**
    * Difference between PUT and patch

    **PUT** - updating by sending an entirely new entry to replace the previous one.

    **PATCH** - only sends the piece of data that needs to updated

  **DELETE - DELETE**
