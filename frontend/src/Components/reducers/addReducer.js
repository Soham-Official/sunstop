const initialData = {
  name: "",
  role: "",
};

const addReducer = (state = initialData, action) => {
  if (action.type === "Add_DATA") {
    // console.log(action.payload);
    // console.log("yoyo");
    state.name = action.payload.name;
    state.role = action.payload.role;

    return state;
  }

  return initialData;
};
export default addReducer;
