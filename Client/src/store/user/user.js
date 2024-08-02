
import { createSlice } from '@reduxjs/toolkit';


const loadStateFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};




const userSlice = createSlice({
    name: 'user',
    initialState :{
        user: loadStateFromLocalStorage(),
        status: 'Idle',
        error: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.status = 'succeeded';
            localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
            console.log("log in")
          },
          logout(state) {
            state.user = null;
            state.status = 'idle'; // Reset status on logout
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log("loged out")
            // navigate('/')
          },
          setError(state, action) {
            state.error = action.payload;
            state.status = 'failed';
          },
          checkStatus(state) {
            state.user !== null; // Check if user is logged in true on login /// false on logout
          },
    }


})

export const {logout, setUser, setError,checkStatus} = userSlice.actions;

export default userSlice.reducer;