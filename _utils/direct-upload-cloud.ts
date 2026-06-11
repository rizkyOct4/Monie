"use client";

import axios from "axios";

export const uploadToCloudinary = async ({
  file,
  publicId,
  type,
  thumbnail,
  model,
  publicIdProject,
}: {
  file: any;
  publicId: string;
  type: "images" | "videos";
  thumbnail: string;
  model:
    | {
        typeModel:
          | "blog"
          | "videoThumbnail"
          | "marketingSales"
          | "project"
          | "heroImage";
        value?: string;
      }
    | undefined;
  publicIdProject: string;
}) => {
  const formData = new FormData();

  let isModel;

  switch (model?.typeModel) {
    case "heroImage":
    case "project":
    case "marketingSales": {
      isModel = `admin/${publicId}/${type}/${model?.typeModel}/${publicIdProject}`;
      break;
    }
    case "blog":
    case "videoThumbnail": {
      isModel = `admin/${publicId}/${type}/${model?.typeModel}/${model?.value}/${publicIdProject}`;
      break;
    }
  }

  formData.append("file", file);
  formData.append("upload_preset", `nextprototype_${type}`);
  formData.append("folder", `${isModel}`);
  const URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`;

  const res = await axios.post(URL, formData, {
    timeout: 0,
    onUploadProgress: (e) => {
      if (!e.total) return;
      const percent = Math.round((e.loaded * 100) / e.total);
      console.log("Upload:", percent, "%");
    },
  });
  return res.data;
};

export const uploadMultipleToCloudinary = async ({
  files,
  publicId,
  type,
  publicIdProject,
}: {
  files: any;
  publicId?: string;
  type: "images" | "videos";
  publicIdProject: string | string[];
}) => {
  const URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`;

  const uploadPromises = files.map((file: any) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", `nextprototype_${type}`);
    formData.append("folder", `admin/${publicId}/${type}/${publicIdProject}`);

    return axios.post(URL, formData, {
      timeout: 0,
      onUploadProgress: (e) => {
        if (!e.total) return;

        const percent = Math.round((e.loaded * 100) / e.total);

        console.log(`Upload :`, percent, "%");
      },
    });
  });

  const results = await Promise.all(uploadPromises);

  return results.map((res) => ({
    ...res.data,

    // otomatis webp
    secure_url: res.data.secure_url.replace("/upload/", "/upload/f_webp/"),
  }));
};
