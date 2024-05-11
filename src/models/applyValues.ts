import { ISignUp } from '@/api/types/auth';

export interface ApplyValues extends ISignUp {
  step: number;
}
