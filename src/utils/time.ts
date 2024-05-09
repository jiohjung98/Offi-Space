export const getNowYYMMDDHHMMSS = (): [
  string,
  string,
  string,
  string,
  string,
  string
] => {
  const now = new Date(); // ex) Sun Jan 29 2023 02:45:42 GMT+0900 (한국 표준시)

  const YY = now.getFullYear().toString().slice(2, 4);
  const MM = (now.getMonth() + 1).toString().padStart(2, '0');
  const DD = now.getDate().toString().padStart(2, '0');
  const [hh, mm, ss] = now.toString().split(' ')[4].split(':');

  return [YY, MM, DD, hh, mm, ss];
};
