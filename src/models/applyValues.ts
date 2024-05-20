//스텝별로 데이터 모아가기 위해 ISignUp에 step 속성을 추가
//pages -> signup -> index에서 사용
import { ISignUp } from '@/api/types/auth';

export interface ApplyValues extends ISignUp {
  step: number;
}
