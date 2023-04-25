import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillPlusSquareFill } from "react-icons/bs";

const DragAndDrop = ({ onUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onUpload(acceptedFiles);
      console.log(acceptedFiles, "accepted");
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <BsFillPlusSquareFill
            size="3em"
            className="cursor-pointer "
            color="rgb(253 164 175"
          />
          <p>Drag drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
