import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import firebase from "./firebaseConfig";
import { loginUser, logoutUser } from "./reducer/userSlice";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Upload from "./pages/Upload";
import Header from "./header/Header";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log('userInfo: ', userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(logoutUser());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    console.log('user', user)
  }, [])

  const isUserEmailVerified = firebase.auth().currentUser?.emailVerified;
  console.log('isUserEmailVerified', isUserEmailVerified)

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:postNum" element={<Detail />} />
        <Route path="/items/:postNum/edit" element={<Edit />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
