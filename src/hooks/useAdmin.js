import { useAdmin as useAdminContext } from '../context/AdminContext';

const useAdmin = () => {
  return useAdminContext();
};

export default useAdmin;
