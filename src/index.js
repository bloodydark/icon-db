import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import ProfilePhoto from "./components/ProfilePhoto";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CreateAvatar from "./components/CreateAvatar";
import Portal from "./components/Portal";
import firebase from "./firebase/firebase";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [getBlob, setGetBlob] = useState("");
  const db = firebase.firestore().collection("test");

  const getData = (isOpened, imageSrc) => {
    setIsOpen(isOpened);
    setImageSrc(imageSrc);
  };

  // useEffect(() => {
  //   db.limit(1).onSnapshot((snapshot) => {
  //     snapshot.docs.map((doc) => {
  //       const item = doc.data();
  //       const blob = item.img;
  //       if (!imageSrc) {
  //         // <img src={""} />
  //         setImageSrc(blob);
  //         console.log(blob);
  //       }
  //     });
  //   });
  // }, []);

  //   console.log("Empty");
  //   db.onSnapshot((snapshot) => {
  //     snapshot.docs.map((doc) => {
  //       const display = doc.data();
  //       setGetBlob(display);
  //     });
  //   });
  // }

  // useEffect(() => {
  //   db.onSnapshot((snapshot) => {
  //     snapshot.docs.map((doc) => {
  //       const display = doc.data();
  //       // return display;
  //     });
  //   });
  // }, []);
  // console.log(getBlob);
  // const display = db.where("img", "==", "true").get();
  // console.log(display);

  // if (imageSrc) {
  //   console.log("Exist");
  // } else {
  //   setImageSrc()
  //   console.log("Empty");
  // }

  return (
    <React.Fragment>
      <ProfilePhoto getData={getData} imageSrc={imageSrc} />
      <div id="createAvatarDiv" />
      {isOpen && !imageSrc && (
        <Portal portalDiv="createAvatarDiv">
          <div className="createAvatarDiv_content m-auto">
            <CreateAvatar getData={getData} />
          </div>
        </Portal>
      )}
      <br />
      {/* <img src={""} /> */}
    </React.Fragment>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
