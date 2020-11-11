import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import axios from "axios";
import * as yup from "yup";
import schema from "./validation/formSchema";

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

  // const getUsers = () => {
  //   axios.get("https://reqres.in/api/users")
  //     .then((res) => {
  //       setFriends(res.data);
  //     })
  //     .catch((err) => {console.log(err)});
  // };

  const postNewUser = (newUser) => {
    axios.post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
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


  // useEffect(() => {
  //   getFriends();
  // }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
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

      {/* {users.map((user) => {
        return (
          <div className='friend container'>
            <h2>{details.username}</h2>
            <p>Email: {details.email}</p>
            <p>Role: {details.role}</p>
            <p>Civil: {details.civil}</p>
          </div>
        );
      })} */}

    </div>
  );
}

export default App;
