import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import Navbar from './components/navbar' 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
            path='/'
            element={<Home />}
            />
            <Route
            path='/login'
            element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
