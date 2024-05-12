//ISignUp에 step을 추가 -> 스텝별로 데이터 모아가기 위해
import { ISignUp } from '@/api/types/auth';

export interface ApplyValues extends ISignUp {
  step: number;
}
