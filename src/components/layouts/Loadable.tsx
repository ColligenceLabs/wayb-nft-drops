import React, { Suspense } from 'react';

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

const Spinner = () => <div>Loading...</div>;
