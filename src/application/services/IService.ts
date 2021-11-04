import { DTOAdapter } from "../dtos/DTOAdapter";

export interface IService {
    execute(dto: DTOAdapter): Promise<any>;
}