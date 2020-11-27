import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import ProfilePhoto from "./components/ProfilePhoto";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CreateAvatar from "./components/CreateAvatar";
import Portal from "./components/Portal";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [image, setImage] = useState("");


  const onFileLoad = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  const getData = (isOpened, imageSrc) => {
    setIsOpen(isOpened);
    setImageSrc(imageSrc);
  };

  // console.log(imageSrc);

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
    </React.Fragment>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
