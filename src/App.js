import "./App.css"
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgetPage from "./Components/ForgetPage";
import ResetPassword from "./Components/ResetPassword";

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
            <Route path = '/forgetPassword' element = {<ForgetPage/>}></Route>
            <Route path = '/resetPassword' element = {<ResetPassword/>}></Route>
          </Routes>   
        </div> 
      </div>
    </Router>
  );
}

export default App;
