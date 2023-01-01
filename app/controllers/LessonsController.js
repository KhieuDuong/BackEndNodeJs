const db = require("../models");
const Lesson = db.lessons;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const lesson = new Lesson({
    title: req.body.title,
    description: req.body.description,
    descriptionDetail: req.body.descriptionDetail,
    level: req.body.level
  });

  // Save Tutorial in the database
  lesson
    .save(lesson)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  console.log("get all Lessons");
  const level = req.query.level;
  var condition = level ? { level: { $regex: new RegExp(level), $options: "i" } } : {};
  
  Lesson.find(condition)
    .then(data => {
      console.log(level);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log("get one Lesson");

  Lesson.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Lesson with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Lesson with id=" + id });
    });
};



// Find Lessons with an level
// exports.findLevel = (req, res) => {
//   const level = req.params.level;
//   console.log("Find Lessons with an level" + level);

//   Lesson.find({ level: level })
//     .then(data => {
//       console.log(data);
//       if (!data)
//         res.status(404).send({ message: "Not found Lesson with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Lesson with id=" + id });
//     });
// };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Lesson with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Lesson was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Lesson with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Lesson.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Lesson.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Lesson were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};


