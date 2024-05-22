import { interestTag } from '@/constant/interestTag';
import { jobPosition } from '@/constant/jobPosition';

export const useCategoryToEnum = (category: string) => {
  const newArr = jobPosition.concat(interestTag);
  const findCategory = newArr.find((item) => item.title === category);
  return findCategory?.description as string;
};
