import { postRequest } from '../request';
import { ICommon } from '../types/common';

export const fcmpost = async ({ fcmToken }: { fcmToken: string | void | undefined }) => {
  const response = postRequest<ICommon<null>, { fcmToken: string | void | undefined }>(
    'fcm-token',
    {
      fcmToken
    }
  );
  return response;
};
