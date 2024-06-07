import { authHandlers } from './authHandler';
import { questionHandlers } from './questionHandler';
import { notificationHandler } from './notificationHandler';

export const handlers = [...authHandlers, ...questionHandlers, ...notificationHandler];
