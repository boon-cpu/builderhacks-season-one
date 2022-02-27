import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Feed() {
  const [auth, setAuth] = useState(true);
  const [posts, setPosts] = useState<
    { content: string; username: string; date: string }[]
  >([
    { content: "", username: "", date: "" },
    { content: "", username: "", date: "" },
    { content: "", username: "", date: "" },
    { content: "", username: "", date: "" },
    { content: "", username: "", date: "" },
  ]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let mounted = true;

    axios({
      url: `http://localhost:8000/api/posts/post?pg=${page}`,
      method: "get",
      withCredentials: true,
    }).then((res) => {
      if (mounted) {
        setPosts(
          res.data.data.map((e: any) => {
            return { content: e.content, username: e.username, date: e.date };
          })
        );
      }
    });

    axios({
      url: "http://localhost:8000/api/auth/is-auth",
      method: "get",
      withCredentials: true,
    }).then((res) => {
      if (mounted) setAuth(res.data.data.auth);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div>
        <h2>{posts[0].username}</h2>
        <p>{posts[0].content}</p>
      </div>
      <div>
        <h2>{posts[1].username}</h2>
        <p>{posts[1].content}</p>
      </div>
      <div>
        <h2>{posts[2].username}</h2>
        <p>{posts[2].content}</p>
      </div>
      <div>
        <h2>{posts[3].username}</h2>
        <p>{posts[3].content}</p>
      </div>
      <div>
        <h2>{posts[4].username}</h2>
        <p>{posts[4].content}</p>
      </div>
    </div>
  );
}
