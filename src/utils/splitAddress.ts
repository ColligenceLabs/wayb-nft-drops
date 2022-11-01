const splitAddress = (str = '') => {
  if (!str || str === '') return '-';

  return str.substr(0, 3) + '..' + str.substr(str.length - 3, str.length);
};

export default splitAddress;
