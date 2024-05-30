import { sendFCMNotification } from '@/components/pwa/PushSend';
import { NextApiRequest, NextApiResponse } from 'next';

export const sendFCMHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    await sendFCMNotification(message)
      .then((result) => res.status(200).json({ result }))
      .catch((error) => console.log(error));
  } else {
    res.status(405).end();
  }
};
