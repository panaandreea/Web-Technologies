export const deleteNoteAsync = (index) => {
  return (dispatch) => {
    // simulăm un server
    setTimeout(() => {
      dispatch({
        type: "DELETE_NOTE",
        payload: index,
      });
    }, 1000);
  };
};
