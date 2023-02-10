import axios from 'axios';
import { useDispatch } from 'react-redux';

import { repoActions } from '@/store/store';

const host = `http://localhost:8080`;

const useRepoHooks = () => {
  const dispatch = useDispatch();
  const loadTrendingRepos = async (page: string) => {
    dispatch(repoActions.setRepoLoading(true));
    try {
      const repoResponse: { data: { repoList: [] } } = await axios.request({
        method: 'POST',
        url: `${host}/repos/getAllRepos`,
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
        url: `${host}/repos/getSingleRepo`,
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
        url: `${host}/repos/syncRepos`,
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
