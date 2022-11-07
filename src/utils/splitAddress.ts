const splitAddress = (str = '') => {
  if (!str || str === '') return '-';

  return str.substr(0, 6) + '..' + str.substr(str.length - 4, str.length);
};

export default splitAddress;
