import React, { Suspense } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

const Spinner = () => <div>Loading...</div>;
