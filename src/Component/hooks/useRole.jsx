import useAuth from './useAuth'

import { useQuery } from '@tanstack/react-query'
import useAxiosCommon from './useAxiosCommon'
const useRole = () => {
  const { user, loading } = useAuth()
  const  AxiosCommon= useAxiosCommon()

  const { data: role = '', isLoading,refetch } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await AxiosCommon(`/user/rool/${user?.email}`)
      return data.role
    },
  })


  return [role, isLoading,refetch]
}

export default useRole