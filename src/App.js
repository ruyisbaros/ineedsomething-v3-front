import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Home from "./pages/home/Home";
import ForgotPassword from './pages/forgot_password/ForgotPassword';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot_pwd" element={<ForgotPassword />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
