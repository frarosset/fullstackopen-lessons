const express = require("express");
require("dotenv").config();
const Note = require("./models/note");

// const cors = require("cors");
const app = express();

app.use(express.static("dist"));
// app.use(cors());
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path:   ", request.path);
  console.log("Body:   ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

app.get("/api/notes", (req, res, next) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => next(err));
});

app.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((err) => next(err));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if ((err.name = "ValidationError")) {
    return res.status(400).json({ error: err.message });
  }

  next(err); // pass to default Express error handler
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
