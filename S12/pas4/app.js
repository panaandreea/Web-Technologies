import { useSelector, useDispatch } from "react-redux";
import { deleteNoteAsync } from "./actions";

const App = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notițe (Async)</h2>

      {notes.map((note, index) => (
        <div key={index}>
          {note}
          <button onClick={() => dispatch(deleteNoteAsync(index))}>
            Șterge
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
