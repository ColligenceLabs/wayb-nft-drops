const splitAddress = (str = '') => {
  if (!str || str === '') return '-';

  return str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length);
};

export default splitAddress;
