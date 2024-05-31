import { useEffect, useState } from 'react';
import { notices } from '@/constant/selectedOfficeNotice';
import { useBranchStore } from '@/store/branch.store';
import { Notice } from '@/api/types/notice';

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const useNotices = () => {
  const [randomNotices, setRandomNotices] = useState<Notice[]>([]);
  const [urgentNoticeTitle, setUrgentNoticeTitle] = useState<string | null>(null);
  const [urgentNoticeContent, setUrgentNoticeContent] = useState<string | null>(null);
  const [expandedNotice, setExpandedNotice] = useState<{ [key: string]: boolean }>({});
  const [currentDate, setCurrentDate] = useState<string>('');
  const selectedBranch = useBranchStore((state) => state.selectedBranch);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setCurrentDate(`${year}.${month}.${day}`);
  };

  useEffect(() => {
    if (!selectedBranch) return;

    getCurrentDate();
    const seed = hashCode(selectedBranch.branchName);
    const urgentNotices = notices.filter(notice => notice.type === '긴급');
    const generalNotices = notices.filter(notice => notice.type === '일반');

    const randomUrgentNotice = urgentNotices.length > 0 ? urgentNotices[Math.floor(seededRandom(seed) * urgentNotices.length)] : null;
    const randomGeneralNotices = generalNotices
      .sort(() => 0.5 - seededRandom(seed))
      .slice(0, 2);

    const combinedNotices = randomUrgentNotice ? [randomUrgentNotice, ...randomGeneralNotices] : randomGeneralNotices;

    setRandomNotices(combinedNotices);
    setUrgentNoticeTitle(randomUrgentNotice ? randomUrgentNotice.title : null);
    setUrgentNoticeContent(randomUrgentNotice ? randomUrgentNotice.content : null);

  }, [selectedBranch]);

  const toggleExpand = (title: string) => {
    setExpandedNotice(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  return { randomNotices, urgentNoticeTitle, urgentNoticeContent, expandedNotice, toggleExpand, currentDate };
};
