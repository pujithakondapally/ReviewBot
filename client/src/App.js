import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/chatBot" element={<ChatBot/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
