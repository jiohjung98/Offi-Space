import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    console.log('댓글 삭제 실행');
    const postData = await import('@/components/community/mock/deletePostRes.json');
    return res.status(200).json(postData);
  }
}
