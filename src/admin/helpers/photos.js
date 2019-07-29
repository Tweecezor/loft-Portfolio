import requests from '@/requests';

export const getAbsoluteImgPath = imgPath => {
  const baseUrl = requests.defaults.baseURL;
  return `${baseUrl}/${imgPath}`
 }

