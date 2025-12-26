import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notițe</h2>

      {notes.map((note, index) => (
        <div key={index}>
          {note}
          <button
            onClick={() =>
              dispatch({ type: "DELETE_NOTE", payload: index })
            }
          >
            Șterge
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
