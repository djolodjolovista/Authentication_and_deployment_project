import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import './App.css';
import Homescreen from './screens/Homescreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' exact element={ <Registerscreen />} />
        <Route path='/login' exact element={<Loginscreen />} />
        <Route path='/' exact element={<Homescreen />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
