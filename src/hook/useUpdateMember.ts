import { userinfo } from '@/api/auth/auth.get.api';
import { useSetMember } from '@/store/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useUpdateMember = () => {
  const setmember = useSetMember();

  const { data: memberData } = useQuery({ queryKey: ['userinfo'], queryFn: userinfo });

  useEffect(() => {
    setmember(memberData?.data);
  }, [memberData, setmember]);
  return true;
};

export default useUpdateMember;
