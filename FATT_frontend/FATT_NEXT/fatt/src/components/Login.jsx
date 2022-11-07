import React from 'react'
import { useState } from 'react';
import '../../styles/login.module.css'

const Login = (props) => {
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    const post = {
       Password,
      Email
   

     
    };
    fetch("http://localhost:4000/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
      
    }).then(() => { 
      props.history.push("/");
    });
  };
  return (

        
        <section className="create-post">
        <h2>Log Into FATT
</h2>
        <form onSubmit={handleForm}>     
           <label>Email :</label>
          <input
            type="Email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
         <label>Password :</label>
          <input
            type="Password"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
                <button className="btn" type="submit">
                Log In
          </button>
        </form>
        </section>
    );
  };
        

  export default Login;