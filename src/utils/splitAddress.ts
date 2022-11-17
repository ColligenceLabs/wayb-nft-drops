const splitAddress = (str = '') => {
  if (!str || str === '') return '-';

  return (
    str.substr(0, 6).toLowerCase() +
    '...' +
    str.substr(str.length - 4, str.length).toLowerCase()
  );
};

export default splitAddress;
