import React from 'react'
import { useState } from 'react';


   
const Register = (props) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [FirstN, setFirstN] = useState("");
    const [LastN, setLastN] = useState("");
    const [Email, setEmail] = useState("");
    const [Gender, setGender] = useState("");
    const [age, setage] = useState("");

    const handleForm = (e) => {
      e.preventDefault();
      const post = {
        UserName,
        Password,
        FirstN,
        LastN,
        Email,
        Gender,
        age

       
      };
      fetch("http://localhost:4000/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }).then(() => {
        // console.log("post added");
        props.history.push("/");
      });
    };
    return (
      <section className="create-post">
        <h2>Register</h2>
        <form onSubmit={handleForm}>
        
        
          <label>First name :</label>
          <input
            type="FirstN"
            required
            value={FirstN}
            onChange={(e) => setFirstN(e.target.value)}
          />
          <label>Last name :</label>
          <input
            type="LastN"
            required
            value={LastN}
            onChange={(e) => setLastN(e.target.value)}
          />
              <label>Age :</label>
          <input
            type="age"
            required
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
            <label>User name :</label>
          <input
            type="UserName"
            required
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
           <label>Gender :</label>
        <select value={Gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Famale">Female</option>
        </select>
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
          Register
          </button>
        </form>
      </section>
    );
  };
        
export default Register;
