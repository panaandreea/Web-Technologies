import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";


const initialState = {
  notes: [
    { id: 1, text: "Notiță 1" },
    { id: 2, text: "Notiță 2" },
  ],
  loading: false,
};


function notesReducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE_NOTE_REQUEST":
      return { ...state, loading: true };

    case "DELETE_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
        notes: state.notes.filter(note => note.id !== action.payload),
      };

    default:
      return state;
  }
}


const deleteNoteAsync = (id) => {
  return (dispatch) => {
    dispatch({ type: "DELETE_NOTE_REQUEST" });

    setTimeout(() => {
      dispatch({ type: "DELETE_NOTE_SUCCESS", payload: id });
    }, 1000);
  };
};


const store = createStore(notesReducer, applyMiddleware(thunk));


const NotesApp = () => {
  const { notes, loading } = useSelector(state => state);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const addNote = () => {
    if (!text.trim()) return;

    store.dispatch({
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
      <h2>Redux Async Notes</h2>

      {loading && <p>Se comunică cu serverul...</p>}

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text}
            <button
              onClick={() => dispatch(deleteNoteAsync(note.id))}
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
