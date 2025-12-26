import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

const initialState = {
  notes: [
    { id: 1, text: "Prima notiță" },
    { id: 2, text: "A doua notiță" },
  ],
};


function notesReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };

    default:
      return state;
  }
}


const store = createStore(notesReducer);


const NotesApp = () => {
  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const addNote = () => {
    if (text.trim() === "") return;

    dispatch({
      type: "ADD_NOTE",
      payload: {
        id: Date.now(),
        text,
      },
    });

    setText("");
  };

  return (
    <>
      <h2>Redux Notes</h2>

      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Scrie o notiță"
      />
      <button onClick={addNote}>Adaugă</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text}
            <button
              onClick={() =>
                dispatch({ type: "DELETE_NOTE", payload: note.id })
              }
              style={{ marginLeft: "10px" }}
            >
              Șterge
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <NotesApp />
    </Provider>
  </StrictMode>
);
