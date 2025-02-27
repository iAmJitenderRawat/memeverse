import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  likedMemes: 0,
  uploadedMemes: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    addUploadedMeme: (state, action) => {
      state.uploadedMemes.push(action.payload);
    },
  },
});

export const { setProfile, addUploadedMeme } = userSlice.actions;
export default userSlice.reducer;