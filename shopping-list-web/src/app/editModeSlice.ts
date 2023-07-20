import { createSlice } from '@reduxjs/toolkit';

interface IEditModeState {
	value: boolean;
}

const initialState: IEditModeState = { value: false };

const editModeSlice = createSlice({
	name: 'edit-mode',
	initialState,
	reducers: {
		toggle(state) {
			state.value = !state.value;
		},
	},
});

export const { toggle } = editModeSlice.actions;

export default editModeSlice.reducer;
