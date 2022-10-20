import axios from 'axios';

const accessToken = localStorage.getItem('dropsJwtToken') ?? '{}';

export const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}`,
});

export const authAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}`,
  headers: { Authorization: `Bearer ${accessToken}` },
});
