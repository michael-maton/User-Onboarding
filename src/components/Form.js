import React from "react";

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
    const { name, value, checked, type } = evt.target;
    const correctValue = type === "checkbox" ? checked : value;
    change(name, correctValue);
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <div className="form-submit">
        <h2>New User</h2>

        {/* 🔥 DISABLE THE BUTTON */}
        <button disabled={disabled}>submit</button>

        <div className="errors">
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.role}</div>
          <div>{errors.civil}</div>
        </div>
      </div>

      <div className="form-group inputs">
        <h4>General information</h4>

        {/* ////////// TEXT INPUTS ////////// */}
        {/* ////////// TEXT INPUTS ////////// */}
        {/* ////////// TEXT INPUTS ////////// */}
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
        <label>
          Password
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="text"
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
