import { getRequest } from '../request';
import { Branch } from '../types/branch';
import { ICommon } from '../types/common';

export const getBranchInfo = async (): Promise<ICommon<Branch[]>> => {
    const response = await getRequest<ICommon<Branch[]>>('/branches');
    return response;
};