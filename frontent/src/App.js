import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './component/Home';
import About from './component/About';
import Navbar from './component/Navbar';
import NoteState from './context/notes/NotesState';
import Login from './component/Login'
import Signup from './component/Signup';
import Alert from './component/Alert';
import { useState} from 'react';


function App() {

  const [alert,setAlert]=useState();
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />

        <div className='container'>
          <Routes>
            <Route exaact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exaact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
