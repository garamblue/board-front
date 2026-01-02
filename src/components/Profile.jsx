import React from "react";
import Avatar from "./Avatar";

export default function Profile({imgUrl, name, job, isNew = false}) {
  return (
    <div className="profile">
      <Avatar imgUrl={imgUrl} isNew={isNew} />
      <h1>{name}</h1>
      <p>{job}</p>
    </div>
  );
}