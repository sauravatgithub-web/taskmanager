import "./App.css"
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <div className="App">
          <Routes>
            <Route path = '/' element = {<Home/>}></Route>
            <Route path = '/login' element = {<Login/>}></Route>
            <Route path = '/signUp' element = {<SignUp/>}></Route>
          </Routes>   
        </div> 
      </div>
    </Router>
  );
}

export default App;
