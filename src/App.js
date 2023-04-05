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
import { io } from "socket.io-client"
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
import Chat from "./pages/messages/Chat";
import Conversation from "./pages/messages/Conversation";
import { makeUserOffline, makeUserOnline, onlineUsersList } from "./redux/messageSlicer";
import { offlineStatusUpdate, onlineStatusUpdate } from "./services/profileServices";
//import SocketClient from "./SocketClient";

//const url = BASE_ENDPOINT
let socket;
function App() {
  const { loggedUser } = useSelector(store => store.currentUser)
  const { darkTheme } = useSelector(store => store.screenTheme)
  const { onlineUsers } = useSelector(store => store.messages)
  console.log(onlineUsers)
  const dispatch = useDispatch();
  const [showCreatePostPopup, setShowCreatePostPopup] = useState(false)
  const [notReview, setNotReview] = useState(false)
  const [not, setNot] = useState(null)

  const refreshTokenFunc = useCallback(async () => {
    try {
      const { data } = await axios.get("/auth/refresh_token");
      //console.log(data);
      dispatch(
        refreshToken(data)
      );
      Cookies.set("user", JSON.stringify(data))
    } catch (error) {
      console.log(error)
      //toast.error(error.response.data.message)
    }
  }, [dispatch]);

  useEffectOnce(() => {
    if (loggedUser) {
      refreshTokenFunc()
    }
  })

  useEffect(() => {
    socket = io(BASE_ENDPOINT, {
      transports: ['websocket'],
      secure: true
    })
  }, [])
  useEffect(() => {
    socket.on("connection", () => {
      console.log("I am connected")
    })
  }, [])

  useEffect(() => {
    socket?.emit("joinUser", loggedUser?._id)
  }, [loggedUser?._id])

  //Online users
  useEffect(() => {
    socket.on("onlineUsers", data => {
      console.log(data)
      dispatch(onlineUsersList(data.map(d => (d.id))))
    })
  }, [dispatch, onlineUsers])
  useEffect(() => {
    dispatch(makeUserOnline())
  }, [dispatch, onlineUsers])


  /* const updateOnlineStatusOfUsers = useCallback(async (onlineUsers) => {
    onlineUsers.length > 0 && onlineUsers.map(async (u) => (
      await onlineStatusUpdate(u)
    ))
  }, [])

  useEffect(() => {
    updateOnlineStatusOfUsers(onlineUsers)
  }, [updateOnlineStatusOfUsers, onlineUsers]) */

  //Offline users
  /* useEffect(() => {
    socket?.on("offlineUsers", async (u) => {
      console.log(u)
      dispatch(makeUserOffline(u))
      //await offlineStatusUpdate(u)
    })

  }, [dispatch, onlineUsers]) */

  return (
    <div className={darkTheme ? "dark" : ""}>
      <ToastContainer position="bottom-center" limit={1} />
      {showCreatePostPopup && <CreatePostPopup setShowCreatePostPopup={setShowCreatePostPopup}
        user={loggedUser} />}

      <Routes>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home socket={socket} setShowCreatePostPopup={setShowCreatePostPopup} not={not} setNot={setNot} setNotReview={setNotReview} notReview={notReview} />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/activate/:token" element={<Activate />} />
          <Route path="/profile/:username" element={<Profile socket={socket} not={not} setNot={setNot} setNotReview={setNotReview} notReview={notReview} />} />
          <Route path="/chat" element={<Chat socket={socket} not={not} setNot={setNot} setNotReview={setNotReview} notReview={notReview} />} />
          <Route path="/message/:id" element={<Conversation socket={socket} not={not} setNot={setNot} setNotReview={setNotReview} notReview={notReview} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/:type" element={<Friends />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login socket={socket} />} />
        </Route>
        <Route path="/forgot_pwd" element={<ForgotPassword />} />


        <Route path="*" element={<Error />} />


      </Routes>
    </div>
  );
}

export default App;
