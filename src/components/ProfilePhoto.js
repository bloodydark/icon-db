import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar-edit";
import firebase from "../firebase/firebase";

const ProfilePhoto = ({ getData, imageSrc }) => {
  const [toggle, setToggle] = useState(false);
  const [state, setState] = useState("");
  const db = firebase.firestore().collection("test");

  // useEffect(() => {
  //   db.limit(1).onSnapshot((snapshot) => {
  //     snapshot.docs.map((doc) => {
  //       const item = doc.data();
  //       const blob = item.img;
  //       if (!imageSrc && !toggle) {
  //         // setToggle(true);

  //         // getData(true, imageSrc);
  //         // <img src={""} />
  //         // setImageSrc(blob);
  //         // imageSrc = blob;
  //         setState(blob);
  //         console.log(blob);
  //       }
  //     });
  //   });
  // }, []);

  // if (state) {
  //   console.log("OK!");
  // }
  // if (imageSrc) {
  //   console.log("Exist");
  // } else {
  //   console.log("Empty");
  //   // setToggle(true);
  //   getData(true, imageSrc);
  // }

  const handleToggleClick = () => {
    setToggle(true);
    getData(true, imageSrc);
  };

  const deletePic = () => {
    setToggle(false);
    getData(false, "");
  };

  return (
    <div className="container">
      <button
        type="button"
        onClick={handleToggleClick}
        className="btn btn-primary rounded-circle mt-2 opaque profile-pic"
        disabled={toggle && imageSrc}
      >
        {(!toggle || !imageSrc) && (
          <FontAwesomeIcon icon={faUserAlt} color="white" size="3x" />
        )}
        {toggle && imageSrc && (
          <img
            alt="profile"
            src={imageSrc}
            className="rounded-circle"
            width="100%"
          />
        )}
      </button>
      {toggle && imageSrc && (
        <button
          type="button"
          className="btn btn-danger rounded-circle position-relative delete-button"
          onClick={deletePic}
        >
          <FontAwesomeIcon icon={faTrashAlt} color="white" size="xs" />
        </button>
      )}
    </div>
  );
};

export default ProfilePhoto;
