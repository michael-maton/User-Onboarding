import React from "react";

export default function UserCard(props) {
  const { details } = props;

  if (!details) {
    return <h3>Working fetching the user's details...</h3>;
  }

  return (
    <div className="user container">
      <h2>
        {details.fname ? details.fname : details.first_name} {details.lname ? details.lname : details.last_name}
      </h2>
      <p>Email: {details.email}</p>
    </div>
  );
}
