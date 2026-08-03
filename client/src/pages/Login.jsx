import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login(){
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();
  async function handleSubmit(e){
  e.preventDefault();
  // console.log(email);
  // console.log(password);
  try{
    const response=await api.post("/auth/login",{
      email,
      password
    });
    // console.log(response.data);
    localStorage.setItem("token",response.data.token);
    localStorage.setItem("user",JSON.stringify(response.data.user));
    console.log("Login Successful");
    if(response.data.user.role==="admin"){
      navigate("/admin/dashboard");
    }
    else{
      navigate("/student/dashboard");
    }
    // console.log(localStorage.getItem("token"));
    // console.log(JSON.parse(localStorage.getItem("user")));
  }catch(error){
    console.log(error.response.data);
  }
  }
  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br/>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <br/>
        <div>
          <label>Password</label>
          <br/>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <br/>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;