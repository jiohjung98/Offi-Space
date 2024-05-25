import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const postData = await import('@/components/community/mock/postDetailData.json');
    // const postData = await import('@/components/community/mock/detailPostError.json');
    return res.status(200).json(postData);
  }
  if (req.method === 'DELETE') {
    const postData = await import('@/components/community/mock/deletePostRes.json');
    return res.status(200).json(postData);
  }
}
