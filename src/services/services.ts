import { authAxios, customAxios } from './customAxios';

export const getAccount = async (token: string) => {
  return await customAxios.get('/api/service/profile/@me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateAccount = async (address: string, data: any) => {
  // return await authAxios.post(`/api/service/profile/${address}`, data);
  const token = window.localStorage.getItem('dropsJwtToken');
  return await customAxios.post(`/api/service/profile/${address}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEventList = async () => {
  return await customAxios.get(
    '/api/service/featured?page=1&limit=5&isEvent=true'
  );
};

export const getFeaturedList = async () => {
  return await customAxios.get('/api/service/featured?page=1&limit=5');
};

export const getFeaturedCollections = async (limit: number) => {
  return await customAxios.get(`/api/service/featured?page=1&limit=${limit}`);
};

export const getFeaturedCollectionsInfinite = async (page: number) => {
  return await customAxios.get(`/api/service/featured?page=${page}&limit=8`);
};

export const getFeaturedById = async (id: string) => {
  return await customAxios.get(`/api/service/featured/${id}`);
};

export const getMysteryBoxInfo = async (id: string) => {
  return await customAxios.get(`/api/service/mysterybox/${id}`);
};

export const getCollectionInfo = async (id: string) => {
  return await customAxios.get(`/api/service/mysterybox/${id}`);
};

export const getMboxListByFeaturedId = async (id: string) => {
  return await customAxios.get(
    `/api/service/featured/${id}/mysterybox?page=1&limit=50`
  );
};

export const getCollectibleList = async () => {
  return await customAxios.get(`/api/service/collectibles`);
};

export const getCollectionList = async (isCollection?: boolean) => {
  return await customAxios.get(`/api/service/mysterybox?page=1&limit=100${
    isCollection ? `&isCollection=${isCollection}` : ''
  }
`);
};

export const getAirdropList = async () => {
  return await customAxios.get(
    `/api/service/mysterybox/airdrops?page=1&limit=5`
  );
};

export const getMboxItemListMboxId = async (id: string) => {
  return await customAxios.get(`/api/service/mysterybox/${id}/items?page=1&limit=100
`);
};

export const registerBuy = async (data: any) => {
  return await customAxios.post('/api/service/drops', data);
};

export const getMyMBoxList = async (
  address: string,
  uid: string,
  sort: string
) => {
  return await customAxios.get(
    `/api/service/drops?address=${address}&buyer=${uid}&sortBy=createdAt:${sort}`
  );
};

export const getItemPrice = async (metaLink: string) => {
  return await customAxios.get(
    `/api/service/mysterybox/uri-items?uri=${metaLink}`
  );
};

export const getClaimableCount = async (
  mysteryBoxId: number,
  buyer: string
) => {
  return await customAxios.get(
    `/api/service/drops/claimableCount?mysteryBoxId=${mysteryBoxId}&buyer=${buyer}`
  );
};

export const getHistory = async (address: string) => {
  return await customAxios.get(
    `/api/service/drops/history?address=${address}&limit=100`
  );
};

export const requestClaim = async (data: any) => {
  return await customAxios.post('/api/service/drops/requestClaim', data);
};

export const getRandomItemListByCompanyId = async (companyId: string) => {
  return await customAxios.post(
    `/api/service/company/${companyId}/random-items`
  );
};
