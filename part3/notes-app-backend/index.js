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

app.get("/api/notes", (req, res) => {
  Note.find().then((notes) => res.json(notes));
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  Note.findById(id).then((note) => res.json(note));

  // if (note) {
  //   res.json(note);
  // } else {
  //   res.status(404).end();
  // }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => res.json(savedNote));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
