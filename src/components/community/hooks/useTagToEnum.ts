import { tagWithCareer } from '@/constant/TagWithCareer';
import { tagWithInterest } from '@/constant/TagWithInterest';

export const useTagToEnum = (tag: string) => {
  const newArr = tagWithCareer.concat(tagWithInterest);
  const searched = newArr.find((item) => item.title === tag);
  return searched?.description;
};
