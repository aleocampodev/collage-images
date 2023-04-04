export const handleFile = (e, rol) => {
  let file_size_img = 0;
  let file_size_video = 0;
  var result = Object.keys(e.target.files).map((key) => {
    let file = e.target.files[key];
    if (file.type.split("/")[0] == "image") {
      file_size_img = file.size;
    }
    if (file.type.split("/")[0] == "video") {
      file_size_video = file.size;
    }
    return { ...imageData, ...{ file: e.target.files[key] } };
  });

  /*if (rol === 3 || rol === 4) {
    if (file_size_img > 15728640) {
      showToast("warning", "Imágenes no pueden superar los 15MB");
      return false;
    }
  }*/

  if (file_size_video > 209715200) {
    showToast("warning", "Videos no pueden superar los 200MB");
    return false;
  }
  const updatedResult = result.map((element) => {
    return {
      ...element,
      ...{
        ...element,
        ...{
          media: URL.createObjectURL(element.file),
          type: element.file.type.split("/")[0],
          mimeType: element.file.type,
          description: "",
        },
      },
    };
  });

  return updatedResult;
};
