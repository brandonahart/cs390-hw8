import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Edit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //error state used to see if password is correct before posting
  const [error,setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content, password});
    const headers = {"content-type": "application/json"};
    
    // when the promise resolves you want to set the "setDone" variable to true
    const req = await fetch('http://localhost:3000/blog/create-post/',{body: requestData, headers, method: "POST"});
    if (req.status === 500) {
      setError(true);
    }
    else {
      navigate("/view")
    }
    
    console.log(requestData);
  }
  // fetch if theres an error in the respons (password is wrong)
  if (error){
    return <div>
        Incorrect Password
        <button onClick={() => setError(false)}>Retry Password</button>
      </div>
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={title}
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          placeholder={content}
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
        <br/>
        <input 
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>

      <button>Update</button>
    </form>
  );
}