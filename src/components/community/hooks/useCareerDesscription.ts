import { jobPosition } from '@/constant/jobPosition';

export const useCareerDescription = (career: string) => {
  const searched = jobPosition.find((item) => item.description === career);
  return searched?.title;
};
