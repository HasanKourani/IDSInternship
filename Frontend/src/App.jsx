import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "../Context/UserContext";
import CreatePost from "./Pages/CreatePost";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { AuthProvider } from "../Context/AuthProvider";
import Profile from "./Pages/Profile";
import SinglePost from "./Pages/SinglePost";
import Edit from "./Pages/Edit";
import EditProfile from "./Pages/EditProfile";

const App = () => {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/posts/:id" element={<SinglePost />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/editProfile/:id" element={<EditProfile />} />
            </Routes>
          </Router>
        </UserProvider>
      </AuthProvider>
    </>
  );
};

export default App;
