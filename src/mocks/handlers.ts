import { authHandlers } from './authHandler';
import { questionHandlers } from './questionHandler';

export const handlers = [...authHandlers, ...questionHandlers];
