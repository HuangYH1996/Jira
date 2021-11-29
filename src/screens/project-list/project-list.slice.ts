import { createSlice } from "@reduxjs/toolkit";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    projectModalOpen(state) {
      state.projectModalOpen = true;
    },
    projectModalClose(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
export default projectListSlice.reducer;
