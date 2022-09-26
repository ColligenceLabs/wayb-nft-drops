import { customAxios } from './customAxios';

export const testGetMbox = async () => {
  return await customAxios.get(
    '/api/service/mysterybox/deployed?page=1&limit=5'
  );
};
