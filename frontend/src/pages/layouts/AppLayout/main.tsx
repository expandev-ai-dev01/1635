import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header can go here */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      {/* Footer can go here */}
    </div>
  );
};
