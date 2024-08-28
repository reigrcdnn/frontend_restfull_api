import { Routes, Route } from "react-router-dom";
import Home from "../views/home.jsx";
import PostIndex from "../views/posts/index.jsx";

function RouteIndex() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostIndex />} />
    </Routes>
  );
}

export default RouteIndex;
