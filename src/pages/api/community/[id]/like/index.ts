import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const result = await import('@/components/community/mock/cancelLikeRes.json');
    return res.status(200).json(result);
  }
}
