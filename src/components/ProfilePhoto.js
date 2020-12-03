import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase/firebase";

const ProfilePhoto = ({ getData, imageSrc, el }) => {
  const [toggle, setToggle] = useState(false);
  const [blobKey, setBlobKey] = useState("");
  const db = firebase.firestore().collection("test");

  useEffect(() => {
    db.limit(1).onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        const item = doc.data();
        const blob = item.img;
        const getBlobId = item.blobId;
        setBlobKey(getBlobId);
        if (!imageSrc && !toggle) {
          imageSrc = blob;
          setToggle(true);
          getData(true, imageSrc);
        }
      });
    });
  }, []);

  // const deleteBlob = () => {
  //   db.doc(el.blobId)
  //     .delete()
  //     .then(function () {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error removing document: ", error);
  //     });
  // };

  const handleToggleClick = () => {
    setToggle(true);
    getData(true, imageSrc);
  };

  const deletePic = () => {
    setToggle(false);
    getData(false, "");
    // deleteBlob();
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
