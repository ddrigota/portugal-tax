import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FormState {
  income: number;
}

const initialState = {
  income: 0,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<FormState>) => {
      state.income = action.payload.income;
    },
  },
});

export const { submitForm } = formSlice.actions;

export default formSlice.reducer;
