module.exports = app => {
    const users = require("../controllers/UsersController.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all Tutorials
    router.get("/", users.findAll);

    router.get("/:id", users.findOne);

    //router.get("/:level", lessons.findLevel);

    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
  
    app.use("/api/users", router);
  };
  