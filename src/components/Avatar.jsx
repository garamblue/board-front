import React from "react";

export default function Avatar({imgUrl, isNew}) {
    return <>
        <img className="profile_photo"
            src={imgUrl} alt="avatar" />
        {isNew && <span className="new">New</span>}
    </>;
}