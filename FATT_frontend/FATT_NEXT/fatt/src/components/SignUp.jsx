import React from 'react'
import { useState } from 'react';
   
const SignUp = (props) => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Gender, setGender] = useState("");
    const [age, setage] = useState("");
    const [Weigth, setWeigth] = useState("");

    const handleForm = (e) => {
      e.preventDefault();
      const post = {
        UserName,
        Password,
        Name,      
        Email,
        Gender,
        age,
        Weigth 
       
      };
      fetch("http://localhost:4000/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
        
      }).then(() => {
        // console.log("post added");
       // props.history.push("/");
        window.location = '/login';

      });
    };
    return (
      <section className="create-post">
        <h2>        Sign Up
</h2>
        <h6>It’s quick and easy</h6>
        <form onSubmit={handleForm}>
        
        
          <label>Name :</label>
          <input
            type="Name"
            placeholder="Full Name" required
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
      
              <label>Age :</label>
          <input
            type="age"
            placeholder="Your age" required
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
          <label>Weigth :</label>
          <input
            type="Weigth"
            placeholder="xxx" required
            value={Weigth}
            onChange={(e) => setWeigth(e.target.value)}
          />
        
           <label>Gender :</label>
        <select value={Gender} onChange={(e) => setGender(e.target.value)}>
        <option value=""></option>
          <option value="Male">Male</option>
          <option value="Famale">Female</option>
        </select>
        <label>User name :</label>
          <input
            type="UserName"
            placeholder="mxxxx" required
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
           <label>Email :</label>
          <input
            type="Email"
            placeholder="Mette@gmail.com" required
                    
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
         <label>Password :</label>
          <input
            type="Password"
            placeholder="at least 8 characters" required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit">
          Sign Up

          
          </button>
        </form>
       
      </section>
    );
  };
        
export default SignUp;
