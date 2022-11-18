import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);

  //updates post variable
  async function fetchData () {
    const req = await fetch('http://localhost:3000/blog/');
    const json = await req.json();
    setPosts(json);
  }

  const deleteBlog = async(title) => {
    const requestData = JSON.stringify({title});
    const headers = {"content-type": "application/json"};
    await fetch('http://localhost:3000/blog/delete-post/', {body: requestData, headers, method: "DELETE"});
    //updates client
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }} key = {post.title}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <button onClick={() => deleteBlog(post.title)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}