import { createSlice } from '@reduxjs/toolkit';

interface IRepoState {
  repoList: any[];
  repoLoading: boolean;
}

const repoState: IRepoState = {
  repoList: [],
  repoLoading: false,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState: repoState,
  reducers: {
    setRepoList: (state, action) => {
      state.repoList = action.payload;
    },
    setRepoLoading: (state, action) => {
      state.repoLoading = action.payload;
    },
  },
});

export default repoSlice;
