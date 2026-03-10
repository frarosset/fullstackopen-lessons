import { useState, useEffect } from "react";
import noteService from "./services/notes.js";
import Note from "./components/Note.jsx";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("a new note....");

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    noteService.getAll().then((initialNotes) => {
      console.log("promise fulfilled");
      setNotes(initialNotes);
    });
  }, []);
  console.log("render", notes?.length, "notes");

  // do not render anything if notes is still null
  if (!notes) {
    return null;
  }

  const addNote = (e) => {
    e.preventDefault();
    console.log("Button clicked", e.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: String(notes.length + 1), // let the server generate this!
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
