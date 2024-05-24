import { interestTag } from '@/constant/interestTag';
import { jobPosition } from '@/constant/jobPosition';

export const useEnumToCategory = (category: string) => {
  const newArr = jobPosition.concat(interestTag);
  const findCategory = newArr.find((item) => item.description === category);
  return findCategory?.title as string;
};
