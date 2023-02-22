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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useEffectOnce } from './utils/helpers';
import { useCallback, useState } from "react";
import CreatePostPopup from "./components/post/create_post_popup/CreatePostPopup";
import { getAllPostsRedux } from "./redux/postsSlicer";

function App() {
  const { loggedUser } = useSelector(store => store.currentUser)
  const dispatch = useDispatch();
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const fetchAllPosts = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/posts/getAllPosts", {
        headers: { "Authorization": `Bearer ${loggedUser?.token}` }
      });
      console.log(data);
      dispatch(
        getAllPostsRedux(data)
      );
      setLoading(false)

    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }, [dispatch, loggedUser]);

  useEffectOnce(() => {
    if (loggedUser) {
      fetchAllPosts()
    }
  })

  useEffectOnce(() => {
    if (loggedUser) {
      refreshTokenFunc()
    }
  })

  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      {showCreatePostPopup && <CreatePostPopup setShowCreatePostPopup={setShowCreatePostPopup}
        user={loggedUser?.user} token={loggedUser?.token} />}
      <Routes>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home setShowCreatePostPopup={setShowCreatePostPopup} />} />
          <Route path="/activate/:token" element={<Activate />} />
          <Route path="/profile/:username" element={<Profile setShowCreatePostPopup={setShowCreatePostPopup} />} />
          <Route path="/profile" element={<Profile setShowCreatePostPopup={setShowCreatePostPopup} />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />

      </Routes>
    </>
  );
}

export default App;
