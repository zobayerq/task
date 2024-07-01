import { Navigate } from 'react-router-dom';
import useRole from '../../../hooks/useRole';

const CreatorRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <div className="w-24 h-24 animate-spin_2s_linear_infinite rounded-full border-8 border-dotted border-sky-600"></div>
      </div>
    );
  }

  if (role === 'Creator') {
    return children;
  }
  
  return <Navigate to='/' />;
};

export default CreatorRoute;