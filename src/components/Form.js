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
      <div className="form-inputs">
        <h4>General information</h4>
        <label>
          <span>First Name</span>
          <input
            value={values.fname}
            onChange={onChange}
            name="fname"
            type="text"
          />
        </label>
        <label>
          <span>Last Name</span>
          <input
            value={values.lname}
            onChange={onChange}
            name="lname"
            type="text"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            value={values.email}
            onChange={onChange}
            name="email"
            type="text"
          />
        </label>
        <label htmlFor="passwordInput">
          <span>Password</span>
          <input
            value={values.password}
            onChange={onChange}
            name="password"
            type="password"
          />
        </label>

        <div className="TOS">
            <label>
            <span>I agree to Terms of Service:</span>
            <input
                type="checkbox"
                name="TOS"
                checked={values.TOS}
                onChange={onChange}
            />
            </label>
        </div>
        <div className="form-submit">
        <button disabled={disabled}>submit</button>

        <div className="errors">
          <div>{errors.fname}</div>
          <div>{errors.lname}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.TOS}</div>
        </div>
      </div>
      </div>
      
    </form>
  );
}
