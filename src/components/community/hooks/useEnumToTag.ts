import { tagWithCareer } from '@/constant/TagWithCareer';
import { tagWithInterest } from '@/constant/TagWithInterest';

export const useEnumToTag = (tag: string) => {
  const newArr = tagWithCareer.concat(tagWithInterest);
  const searched = newArr.find((item) => item.description === tag);
  return searched?.title;
};
