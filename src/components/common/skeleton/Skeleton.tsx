import React from 'react';
import './skeleton.scss';
const Skeleton = ({ style }: { style?: React.CSSProperties }) => {
  return <div className="skeleton home-nft-skeleton" style={style} />;
};

export default Skeleton;
