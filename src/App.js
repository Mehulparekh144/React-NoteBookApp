import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from "./context/notes/NotesState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  const [alert, setAlert] = useState(null);


  const showAlert = (message,type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert}/> 

        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>

        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
