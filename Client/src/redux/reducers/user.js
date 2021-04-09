import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	isAdmin: false,
	firstName: '',
	lastName: '',
	email: '',
	image: '',
	token: '',
	id: '',
};

export const startCheckingUser = createAsyncThunk('user/startCheckingUser', async ({ httpGet }, thunkAPI) => {
	try {
		const response = await httpGet('/auth/me');
		const token = localStorage.getItem('token') || null;
		const dataUser = { ...response.data.user, token };

		return thunkAPI.dispatch(userSlice.actions.login(dataUser));
	} catch (error) {
		console.log(error.message);
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			const { firstName = '', lastName = '', email = '', image = '', token = null, id = '', roleId } = payload;

			if (token) {
				state = { isAuth: true, firstName, lastName, email, image, token, id, isAdmin: roleId === 1, roleId };
				localStorage.setItem('token', token);
			}

			return state;
		},
		logout: () => {
			localStorage.removeItem('token');
			return initialState;
		},
		update: (state, { payload }) => {
			const { firstName = '', lastName = '', email = '', image = '', token = null, id = '', roleId } = payload;
			state = { isAuth: true, firstName, lastName, email, image, token, id, isAdmin: roleId === 1, roleId };
			return state;
		}
	},
});

export { userSlice };

export default userSlice.reducer;
