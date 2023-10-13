import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Population from './page/Population';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/population-data' element={<Population/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;