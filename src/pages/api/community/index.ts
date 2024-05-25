import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const allPostData = await import('@/components/community/mock/allPostData.json');
    return res.status(200).json(allPostData);
  }
  if (req.method === 'POST') {
    const result = await import('@/components/community/mock/registerPost.json');
    return res.status(200).json(result);
  }
}
