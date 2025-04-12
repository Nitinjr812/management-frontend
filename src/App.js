import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import "./Components/Navbar"
import Teacher from './Components/Teacher';
import Students from './Components/Students';
import { Active } from './Components/Active';
import Edit from './Components/Edit';
import Homes from './Components/Homes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>``
          <Route path="/AdminHome" element={<Home />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/students" element={<Students />} />
          <Route path="/Active" element={<Active />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/" element={<Homes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
