import axios from "axios";

export const imageUpload = async (image) => {
  const imageData = new FormData();
  imageData.append("file", image);
  imageData.append("upload_preset", "Medicamp");

  try {
    let cloudName = "deo20ppgd";
    let resourceType = "image";
    // let api=`https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload`
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const { data } = await axios.post(api, imageData);
    // console.log(data.secure_url);
    return data.secure_url;
  } catch (error) {
    return error;
  }
};
