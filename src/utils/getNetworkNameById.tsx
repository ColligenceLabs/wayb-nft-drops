import { ChainId } from '../config';

export const getNetworkNameById = (id: number) => {
  return Object.keys(ChainId)[Object.values(ChainId).indexOf(id)];
};
