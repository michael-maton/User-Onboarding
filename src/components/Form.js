import React from "react";

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const correctValue = type === "checkbox" ? checked : value;
    change(name, correctValue);
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <div className="form-submit">
        <h2>New User</h2>

        <button disabled={disabled}>submit</button>

        <div className="errors">
          <div>{errors.fname}</div>
          <div>{errors.lname}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>
      </div>

      <div className="form-inputs">
        <h4>General information</h4>
        <label>
          First Name
          <input
            value={values.fname}
            onChange={onChange}
            name="fname"
            type="text"
          />
        </label>
        <label>
          Last Name
          <input
            value={values.lname}
            onChange={onChange}
            name="lname"
            type="text"
          />
        </label>

        <label>
          Email
          <input
            value={values.email}
            onChange={onChange}
            name="email"
            type="text"
          />
        </label>
        <label htmlFor="passwordInput">
          Password
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="password"
          />
        </label>
      </div>

      <div className="TOS">
        <label>
          Agree to Terms of Service:
          <input
            type="checkbox"
            name="TOS"
            checked={values.TOS}
            onChange={onChange}
          />
        </label>
      </div>
    </form>
  );
}
