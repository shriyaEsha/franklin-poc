// Not needed if using the old way of creating the store
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    behance: {
        avatarImageUrl: '',
      }
};

export const behanceSlice = createSlice({
    name: 'behance',
    initialState: initialState.behance,
    reducers: {}
}); 

export default behanceSlice;