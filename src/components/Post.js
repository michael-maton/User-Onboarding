import React from "react";

export default function Post(props) {
  const { user } = props;
  let userStr = JSON.stringify(user);
  return (
    <div className="post-requests">
        <h3>New post request:</h3>
        <div className="scroll">
            <pre>{userStr}</pre>
        </div>
    </div>
  );
}
