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
import io from "socket.io-client"
import { refreshToken } from "./redux/currentUserSlice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useEffectOnce } from './utils/helpers';
import { useCallback, useEffect, useState } from "react";
import CreatePostPopup from "./components/post/create_post_popup/CreatePostPopup"
import Error from './pages/Error';
import Notifications from "./pages/notification/Notifications";
import Friends from "./pages/friends/Friends";
import { BASE_ENDPOINT } from "./axios"
import { addSocketRedux } from "./redux/socketsSlicer";
//import SocketClient from "./SocketClient";

//const url = BASE_ENDPOINT
let socket;
function App() {
  const { loggedUser } = useSelector(store => store.currentUser)
  const { darkTheme } = useSelector(store => store.screenTheme)
  const dispatch = useDispatch();
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false)
  //const [socket, setSocket] = useState(null)

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
    if (loggedUser) {
      refreshTokenFunc()
    }
  })

  useEffect(() => {
    socket = io(BASE_ENDPOINT)
  }, [])


  return (
    <div className={darkTheme ? "dark" : ""}>
      <ToastContainer position="bottom-center" limit={1} />
      {showCreatePostPopup && <CreatePostPopup setShowCreatePostPopup={setShowCreatePostPopup}
        user={loggedUser} />}

      <Routes>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home socket={socket} setShowCreatePostPopup={setShowCreatePostPopup} />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/activate/:token" element={<Activate />} />
          <Route path="/profile/:username" element={<Profile setShowCreatePostPopup={setShowCreatePostPopup} />} />
          <Route path="/profile" element={<Profile setShowCreatePostPopup={setShowCreatePostPopup} />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/:type" element={<Friends />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />


        <Route path="*" element={<Error />} />


      </Routes>
    </div>
  );
}

export default App;
