import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const allPostData = await import('@/components/community/mock/allCommentData.json');
    console.log('댓글 가져오기');
    return res.status(200).json(allPostData);
  }
  if (req.method === 'POST') {
    console.log('글 등록 완료');
    const postData = await import('@/components/community/mock/deletePostRes.json');
    return res.status(200).json(postData);
  }
}
