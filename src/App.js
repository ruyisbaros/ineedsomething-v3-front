import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Profile from './pages/profile/Profile';
import Home from "./pages/home/Home";
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from './pages/home/Activate';
import axios from './axios';
import { refreshToken } from "./redux/currentUserSlice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useEffectOnce } from './utils/helpers';
import { useCallback } from "react";


function App() {
  const dispatch = useDispatch();

  const refreshTokenFunc = useCallback(async () => {
    try {
      const { data } = await axios.get("/auth/refresh_token");
      //console.log(data);
      dispatch(
        refreshToken(data)
      );
      Cookies.set("user", JSON.stringify(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [dispatch]);

  useEffectOnce(() => {
    refreshTokenFunc()
  })

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/activate/:token" element={<Activate />} />
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
