import { customAxios } from './customAxios';

export const getFeaturedList = async () => {
  return await customAxios.get('/api/service/featured?page=1&limit=5');
};

export const getFeaturedCollections = async () => {
  return await customAxios.get('/api/service/featured?page=1&limit=8');
};

export const getFeaturedById = async (id: string) => {
  return await customAxios.get(`/api/service/featured/${id}`);
};
