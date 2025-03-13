const themeReducer = (state, action) => {
  // For primary colors
  if (action.type === "color-1") {
    return { ...state, primary: "color-1", primaryHue: 270 };
  }
  if (action.type === "color-2") {
    return { ...state, primary: "color-2", primaryHue: 110 };
  }
  if (action.type === "color-3") {
    return { ...state, primary: "color-3", primaryHue: 240 };
  }
  if (action.type === "color-4") {
    return { ...state, primary: "color-4", primaryHue: 325 };
  }
  if (action.type === "color-5") {
    return { ...state, primary: "color-5", primaryHue: 360 };
  }
  if (action.type === "color-6") {
    return { ...state, primary: "color-6", primaryHue: 55 };
  }

  // For background colors
  if (action.type === "bg-1") {
    return { ...state, background: "bg-1" };
  }
  if (action.type === "bg-2") {
    return { ...state, background: "bg-2" };
  }

  return state;
};

export default themeReducer;