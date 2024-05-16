export const formatDate = (utcDateString: string): string => {
  const date = new Date(utcDateString);

  const pad = (number: number): string => number.toString().padStart(2, '0');

  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${month}.${day}`;
};

export const formatTime = (utcDateString: string): string => {
  const date = new Date(utcDateString);

  const pad = (number: number): string => number.toString().padStart(2, '0');

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${hours}:${minutes}`;
};
