const initialState = {
  notes: ["Nota 1", "Nota 2", "Nota 3"]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((_, index) => index !== action.payload)
      };
    default:
      return state;
  }
}
