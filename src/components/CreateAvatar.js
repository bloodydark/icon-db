import { parse } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useRef } from "react";
import Avatar from "react-avatar-edit";
import firebase from "../firebase/firebase";
import shortid from "shortid";

const CreateAvatar = ({ getData }) => {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const ref = useRef("");
  const db = firebase.firestore().collection("test");

  const test = (preview) => {
    // 保存先のドキュメントの取得
    // const userRef = await db.doc();

    // blobに変換
    const blob = preview;
    // const img = { img: blob };
    // const blobId = shortid.generate();
    // const time = { hope: new Date() };
    // const createdDate = new Date();

    // firestoreに保存
    // await userRef
    db.add({
      img: blob,
      time: new Date(),
      blobId: shortid.generate(),
    })
      // .set(time)
      .catch((error) => console.log(error));

    // db.add({
    //   time: new Date(),
    // });
  };

  const onCrop = (defaultPreview) => {
    setPreview(defaultPreview);
  };

  const onClose = () => {
    setPreview("");
  };

  const onBeforeFileLoad = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
  };

  const onSelectPic = () => {
    test(preview);
    // db.add({
    //   time: new Date()
    // }
    // )
    // if (setUserImage) {
    //   console.log("True");
    //   setPreview();
    //   console.log(userImage);
    // } else {
    //   console.log("False");
    // }
    getData(false, preview);
  };

  const onCancelSelect = () => {
    getData(false, "");
  };

  return (
    <div className="container">
      {/* <div>
        <img src={userImage} />
      </div> */}
      <div className="row mx-auto my-3">
        <div className="col-md-6 m-auto">
          <div
            className="mx-auto my-4 choose-file"
            // style={{ overflow: "scroll" }}
          >
            <Avatar
              ref={ref}
              img={image}
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
            // onChange={handleScale}
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
