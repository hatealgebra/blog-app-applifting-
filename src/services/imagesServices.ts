import {
  API_KEY,
  appLiftingAxios,
  appLiftingAxiosProtected,
} from './services.config';

// TODO: Add images for mobile, desktop and large desktop

export const uploadImage = async (
  imageFile: FormData,
  access_token: string
) => {
  try {
    const response = await appLiftingAxiosProtected.post('/images', imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: access_token,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const showImage = async (imageId: string) => {
  try {
    const response = await appLiftingAxios.get(`/images/${imageId}`, {
      responseType: 'arraybuffer',
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export const deleteImage = async (
  imageId: string,
  access_token: string | undefined
) => {
  try {
    return appLiftingAxiosProtected.delete(`/images/${imageId}`, {
      headers: { Authorization: access_token },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
