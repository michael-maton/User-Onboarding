import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import axios from "axios";
import * as yup from "yup";
import schema from "./validation/formSchema";
import UserCard from "./components/User";
import { v4 as uuid } from "uuid";
import Post from "./components/Post";

const initialFormValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  TOS: false,
};
const initialFormErrors = {
  fname: "",
  lname: "",
  email: "",
  password: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [newUsers, setNewUsers] = useState([]);

  const getUsers = () => {
    axios.get("https://reqres.in/api/users")
      .then((res) => {
        // debugger;
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };  

  const postNewUser = (newUser) => {
    axios.post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        setNewUsers([res.data, ...newUsers]);
        // <Post user={res.data}/>
        setFormValues(initialFormValues);
      })
      .catch((err) => {console.log(err)});
  };

  const inputChange = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      fname: formValues.fname.trim(),
      lname: formValues.lname.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),  
    };
    postNewUser(newUser);
  };
  
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  
  useEffect(() => {
    console.log(users);
  }, [users]);
  
  return (
    <div className="wrapper">
      <div className="container">
      <header>
        <h1>User Application</h1>
      </header>

      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {users.map((user) => {
        return <UserCard key={uuid()} details={user} />
        // return (
          //   <div className='friend container'>
          //     <h2>{user.fname}</h2>
          //     <h2>{user.lname}</h2>
          //     <p>Email: {user.email}</p>
          //   </div>
          // );
        })}
      {/* {users.map((user) => {
        let userStr = JSON.stringify(user);
        return (
          <div className='postRequests'>
          <pre>
          {userStr}
          </pre>
          </div>
          );
        })} */}
        <Post user={newUsers[0]} />
      </div>
    </div>
    
  );
}

export default App;
