import axios from 'axios';
import { useDispatch } from 'react-redux';

import { repoActions } from '@/store/store';

const localhost = `http://localhost:8080`;

const address = `https://github-check-123.fly.dev`;

const useRepoHooks = () => {
  const dispatch = useDispatch();
  const loadTrendingRepos = async (page: string) => {
    dispatch(repoActions.setRepoLoading(true));
    try {
      const repoResponse: { data: { repoList: [] } } = await axios.request({
        method: 'POST',
        url: `${address}/repos/getAllRepos`,
        data: { page },
      });
      const { repoList } = repoResponse.data;
      dispatch(repoActions.setRepoList(repoList));
    } catch (error) {
      axios.isAxiosError(error) ? alert(error.response?.data || error.message) : console.log(error);
    } finally {
      dispatch(repoActions.setRepoLoading(false));
    }
  };
  const findRepo = async (query: string, queryType: string, page: string) => {
    dispatch(repoActions.setRepoLoading(true));
    try {
      const repoResponse: { data: { repoList: [] } } = await axios.request({
        method: 'POST',
        url: `${address}/repos/getSingleRepo`,
        data: { query, queryType, page },
      });
      const { repoList } = repoResponse.data;
      dispatch(repoActions.setRepoList(repoList));
    } catch (error) {
      axios.isAxiosError(error) ? alert(error.response?.data || error.message) : console.log(error);
    } finally {
      dispatch(repoActions.setRepoLoading(false));
    }
  };
  const refreshRepos = async () => {
    dispatch(repoActions.setRepoLoading(true));
    try {
      const repoResponse = await axios.request({
        method: 'POST',
        url: `${address}/repos/syncRepos`,
      });
      const { repoList } = repoResponse.data;
      dispatch(repoActions.setRepoList(repoList));
    } catch (error) {
      axios.isAxiosError(error) ? alert(error.response?.data || error.message) : console.log(error);
    } finally {
      dispatch(repoActions.setRepoLoading(false));
    }
  };
  return { loadTrendingRepos, findRepo, refreshRepos };
};

export default useRepoHooks;
