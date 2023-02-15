import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Profile from './pages/profile/Profile';
import Home from "./pages/home/Home";
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";


function App() {

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
