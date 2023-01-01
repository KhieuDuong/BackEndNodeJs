module.exports = app => {
    const lessons = require("../controllers/LessonsController.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", lessons.create);
  
    // Retrieve all Tutorials
    router.get("/", lessons.findAll);

    //router.get("/:id", lessons.findOne);

    //router.get("/:level", lessons.findLevel);

    // Update a Tutorial with id
    router.put("/:id", lessons.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", lessons.delete);
  
    // Create a new Tutorial
    router.delete("/", lessons.deleteAll);
  
    app.use("/api/lessons", router);
  };
  