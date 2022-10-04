import { customAxios } from './customAxios';

export const getFeaturedList = async () => {
  return await customAxios.get('/api/service/featured?page=1&limit=20');
};

export const getFeaturedCollections = async () => {
  return await customAxios.get('/api/service/featured?page=1&limit=20');
};

export const getFeaturedById = async (id: string) => {
  return await customAxios.get(`/api/service/featured/${id}`);
};

export const getMboxListByFeaturedId = async (id: string) => {
  return await customAxios.get(
    `/api/service/featured/${id}/mysterybox?page=1&limit=50`
  );
};

export const getMboxItemListMboxId = async (id: string) => {
  return await customAxios.get(`/api/service/mysterybox/${id}/items?page=1&limit=100
`);
};
