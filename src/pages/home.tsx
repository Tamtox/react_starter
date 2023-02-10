import '@/styles/home.scss';

import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/components/loading/Loading';
import useRepoHooks from '@/hooks/repo_hooks';
import { authActions } from '@/store/store';
import { RootState } from '@/store/store';

interface IHomeState {
  search: string;
  page: string;
  query: string;
}

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { loadTrendingRepos, findRepo, refreshRepos } = useRepoHooks();
  const repoList = useSelector<RootState, any[]>((state) => state.repoSlice.repoList);
  const repoLoading = useSelector<RootState, boolean>((state) => state.repoSlice.repoLoading);
  const [state, setState] = useReducer((state: IHomeState, action: Partial<IHomeState>) => ({ ...state, ...action }), {
    search: '',
    query: 'name',
    page: '1',
  });
  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    findRepo(state.search, state.query, state.page);
  };
  const querySelectHandler = (newQuery: string) => {
    setState({ query: newQuery });
  };
  const refreshRepoHandler = () => {
    refreshRepos();
    setState({ page: '1' });
  };
  const paginationHandler = (direction: string) => {
    let newPage = Number(state.page);
    if (direction === 'back') {
      newPage -= 1;
    } else {
      newPage += 1;
    }
    setState({ page: `${newPage}` });
    loadTrendingRepos(`${newPage}`);
  };
  useEffect(() => {
    loadTrendingRepos(state.page);
  }, []);
  return (
    <Container maxWidth={false} className="home">
      <Box className={`toolbar`}>
        <form className={`toolbar-search-form`} onSubmit={formSubmitHandler}>
          <FormControl className="toolbar-sort select" size="medium">
            <InputLabel id="toolbar-sort-label">Query</InputLabel>
            <Select
              labelId="toolbar-sort-label"
              sx={{ width: 'calc(min(10rem, 100%))' }}
              value={state.query}
              onChange={(event) => {
                querySelectHandler(event.target.value);
              }}
              size="medium"
              label="Sort"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="id">Id</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            value={state.search}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setState({ search: event.target.value });
            }}
            size="medium"
            variant="outlined"
            required
          />
          <Button
            sx={{ width: 'calc(min(10rem, 100%))' }}
            className={`toolbar-search-button`}
            variant="outlined"
            size="large"
            type="submit"
          >
            Search
          </Button>
        </form>
        <Box className={`toolbar-buttons`}>
          <Box className={`pagination`}>
            <IconButton
              color="inherit"
              onClick={() => {
                paginationHandler('back');
              }}
              disabled={state.page === '1' ? true : false}
            >
              <FaArrowLeft />
            </IconButton>
            <Typography>{`${state.page}`}</Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                paginationHandler('forward');
              }}
            >
              <FaArrowRight />
            </IconButton>
          </Box>
          <Button
            sx={{ width: 'calc(min(10rem, 100%))' }}
            className={`toolbar-refresh`}
            variant="outlined"
            size="large"
            onClick={refreshRepoHandler}
          >
            Refresh
          </Button>
        </Box>
      </Box>
      {repoLoading ? (
        <Loading height="50vh" />
      ) : (
        <Box className={`list`}>
          {repoList.map((repo, index) => (
            <Card key={repo.id} className={`list-item`}>
              <Typography variant="h6">{`${repo.name}`}</Typography>
              <Typography variant="body2">{`Repository id : ${repo.id}`}</Typography>
              <Typography variant="body2">{`Repository url : ${repo.html_url}`}</Typography>
              <Typography variant="body2">{`Repository stars : ${repo.stargazers_count}`}</Typography>
              <Typography variant="body2">{`Repository watchers : ${repo.watchers_count}`}</Typography>
              <Typography variant="body2">{`Repository language : ${repo.language || 'Unknown'}`}</Typography>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Home;
