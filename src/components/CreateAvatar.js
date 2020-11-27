import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import firebase, { storage } from "../firebase/firebase"

const CreateAvatar = ({ getData }) => {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onCrop = (defaultPreview) => {
    setPreview(defaultPreview);
  };

  const onClose = () => {
    setPreview("");
  };

  const onBeforeFileLoad = (e) => {
    const image = e.target.files[0];
    setImage(image);
    console.log(image);
    storage.ref(`images/${image.name}`).put(image).on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage.ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
        })
      }
    )
  };



  const onSelectPic = (e) => {
    getData(false, preview);
  };

  const onCancelSelect = () => {
    getData(false, "");
  };

  return (
    <div className="container">
      <div className="row mx-auto my-3">
        <div className="col-md-6 m-auto">
          <div
            className="mx-auto my-4 choose-file"
            // style={{ overflow: "scroll" }}
          >
            <Avatar
              // handleImage={handleImage}
              imageWidth={270}
              width={"100%"}
              height={180}
              onCrop={onCrop}
              onClose={onClose}
              onBeforeFileLoad={onBeforeFileLoad}
            />
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className="previewDiv rounded-circle m-auto">
            {preview && (
              <img
                alt="preview"
                src={preview}
                width="100%"
                height="100%"
                className="rounded-circle"
              />
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-secondary btn-md float-left ml-2 mb-3 text-center"
            style={{ minWidth: "100px" }}
            onClick={onCancelSelect}
          >
            Cancel
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            // onFileLoad={onFileLoad}
            className="btn btn-success btn-md float-right mr-2 mb-3 text-center"
            onClick={onSelectPic}
            disabled={!preview}
            style={{ minWidth: "100px" }}
          >
            Ok
          </button>
          {/* onFileLoad={onFileLoad} */}
          {/* <input type="file" onChange={handleImage} /> */}
        </div>
      </div>
    </div>
  );
};

export default CreateAvatar;
