import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePost from "./Pages/CreatePost";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
