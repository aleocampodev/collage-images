import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { BsFillPlusSquareFill } from "react-icons/bs";
import index from "../styles/index.module.css";
import "../styles/index.module.css";
import ShowImage from "./ShowImage";
import axios from "axios";

function CustomModal() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonFiles = useRef();
  const [images, setImages] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleShowImages = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let id = i;
      const reader = new FileReader();
      console.log(id);
      reader.onload = (event) => {
        const newImage = {
          id,
          file,
          description: "",
          preview: event.target.result,
        };
        setImages([...images, newImage]);
      };

      if (imagesArray.length === files.length) {
        setImages(imagesArray);
      }

      reader.readAsDataURL(file);
    }
  };

  const sendData = async () => {
    const formData = new FormData();
    images.forEach((file) => {
      console.log(file, "hu");
      formData.append("files", file.file);
      formData.append("descriptions", file.description);
    });

    try {
      const { status } = await axios.post("/api/data", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status === 201) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(images);

  return (
    <div>
      <button
        onClick={openModal}
        className="block text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 "
      >
        Create
      </button>
      <>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="w-9/12 mt-8 modal"
        >
          <div className="bg-white rounded-lg shadow-lg p-7">
            <label htmlFor="upload-files" className="upload-files w-100">
              <div className="flex justify-center">
                <div className="absolute">
                  <div className="flex justify-center m-2">
                    <BsFillPlusSquareFill
                      size="3em"
                      className="cursor-pointer "
                      color="rgb(253 164 175"
                    />
                  </div>
                  <label
                    htmlFor="upload-files"
                    className={"files-selector m-3"}
                  >
                    Select files ...
                  </label>
                </div>
                <input
                  className={index.uploadFilesInput}
                  ref={buttonFiles}
                  type="file"
                  name="images"
                  onChange={handleShowImages}
                  accept=".mp4, .mov, .png, .jpeg, .jpg, .avi, .m4v"
                  multiple
                />
              </div>
            </label>

            {images.length > 0 && (
              <ShowImage images={images} setImages={setImages} />
            )}
            <div className="flex justify-end mt-24">
              {images.length > 0 && (
                <button
                  onClick={() => sendData()}
                  className="block text-white bg-rose-300 hover:bg-rose-300 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-300 dark:hover:bg-rose-300 dark:focus:ring-rose-300"
                >
                  Add Image
                </button>
              )}

              <button
                onClick={closeModal}
                className="block text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 ml-5"
              >
                Close Modal
              </button>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
}

export default CustomModal;
