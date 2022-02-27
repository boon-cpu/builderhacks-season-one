import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Feed from "./components/feed";
import Post from "./components/post";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
