import { appLiftingAxios, appLiftingAxiosProtected } from './services.config';

// TODO: Add images for mobile, desktop and large desktop

export const uploadImage = async (
  imageFile: FormData,
  access_token: string
) => {
  const response = await appLiftingAxiosProtected.post('/images', imageFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: access_token,
    },
  });
  return response;
};

export const showImage = async (imageId: string) => {
  const response = await appLiftingAxios.get(`/images/${imageId}`, {
    responseType: 'arraybuffer',
  });
  return response;
};

export const deleteImage = async (
  imageId: string,
  access_token: string | undefined
) => {
  try {
    return await appLiftingAxiosProtected.delete(`/images/${imageId}`, {
      headers: { Authorization: access_token },
    });
  } catch (e) {
    throw e;
  }
};
