import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import HomePage from './components/HomePage';
import RQSuperHeroesPage from './components/RQSuperHeroesPage';
import { SuperHeroesPage } from './components/SuperHeroesPage';
import RQSuperHero from './components/RQSuperHero';
import RQParallel from './components/RQParallel';
import { DynamicParallelQuery } from './components/DynamicParallelQuery';
import DependentQueries from './components/DependentQueries';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/super-heroes' element={<SuperHeroesPage />} />

            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHero />} />
            <Route path='/rq-parallel' element={<RQParallel />} />
            <Route path='/rq-paginated' element={<PaginatedQueries />} />
            <Route path='/rq-infinite' element={<InfiniteQueries />} />
            <Route
              path='/rq-dynamic-parallel'
              element={<DynamicParallelQuery ids={[1, 3]} />}
            ></Route>

            <Route path='/' element={<HomePage />} />
            <Route
              path='/rq-dependent'
              element={<DependentQueries email='ahsan@gmail.com' />}
            />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
