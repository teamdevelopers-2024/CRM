import axios from "axios";



export default async function uploadImage(formData){
    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dz7fnzqrs/image/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = response.data.secure_url; 

      return imageUrl
}



