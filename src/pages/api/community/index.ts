import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const allPostData = await import('@/components/community/mock/allPostData.json');
    return res.status(200).json(allPostData);
  }
  if (req.method === 'POST') {
    const postData = req.body; // POST 요청의 body 데이터
    return res.status(200).json(postData);
  }
}
