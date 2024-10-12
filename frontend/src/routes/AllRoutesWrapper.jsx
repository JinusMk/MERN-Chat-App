import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const AllRoutesWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export default AllRoutesWrapper;
