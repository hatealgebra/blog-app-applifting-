import { appliftingAxiosProtected } from './services.config';

// TODO: Add images for mobile, desktop and large desktop

export const uploadImage = async (
  imageFile: FormData,
  access_token: string
) => {
  const response = await appliftingAxiosProtected.post('/images', imageFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: access_token,
    },
  });
  return response;
};

export const showImage = async (imageId: string) => {
  const response = await appliftingAxiosProtected.get(`/images/${imageId}`, {
    responseType: 'arraybuffer',
  });
  return response;
};

export const deleteImage = async (
  imageId: string,
  access_token: string | undefined
) => {
  const response = await appliftingAxiosProtected.delete(`/images/${imageId}`, {
    headers: { Authorization: access_token },
  });
  return response;
};
