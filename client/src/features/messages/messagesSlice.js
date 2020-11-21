import { createSlice } from '@reduxjs/toolkit';
import { MessagesAPI } from 'utils/api/MessagesAPI';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messagesList: [],
    messagesFilter: ''
  },
  reducers: {
    updateList: (state, action) => {
      state.messagesList = action.payload;
    },
    updateFilterValue: (state, action) => {
      state.messagesFilter = action.payload;
    }
  },
});

export const { updateList, updateFilterValue } = messagesSlice.actions;

export const updateListAsync = () => (dispatch, getState) => {
  let filterValue = selectMessagesFilter(getState());
  MessagesAPI.getItemsList(filterValue).then(res => {
    if (res && res.data) {
      dispatch(updateList(res.data));
    }
  });
};



export const selectMessagesList = state => state.messages.messagesList;
export const selectMessagesFilter = state => state.messages.messagesFilter;

export default messagesSlice.reducer;
