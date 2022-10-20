import { authAxios, customAxios } from './customAxios';

export const getAccount = async () => {
  return await authAxios.get('/api/service/profile/@me');
};
export const getFeaturedList = async () => {
  return await customAxios.get('/api/service/featured?page=1&limit=5');
};

export const getFeaturedCollections = async (limit: number) => {
  return await customAxios.get(`/api/service/featured?page=1&limit=${limit}`);
};

export const getFeaturedById = async (id: string) => {
  return await customAxios.get(`/api/service/featured/${id}`);
};

export const getMboxListByFeaturedId = async (id: string) => {
  return await customAxios.get(
    `/api/service/featured/${id}/mysterybox?page=1&limit=50`
  );
};

export const getCollectionList = async (isCollection?: boolean) => {
  return await customAxios.get(`/api/service/mysterybox?page=1&limit=100${
    isCollection ? `&isCollection=${isCollection}` : ''
  }
`);
};

export const getMboxItemListMboxId = async (id: string) => {
  return await customAxios.get(`/api/service/mysterybox/${id}/items?page=1&limit=100
`);
};

export const registerBuy = async (data: any) => {
  return await customAxios.post('/api/service/drops', data);
};

export const getMyMBoxList = async (address: string, sort: string) => {
  return await customAxios.get(
    `/api/service/drops?address=${address}&sortBy=createdAt:${sort}`
  );
};
