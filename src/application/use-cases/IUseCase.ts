import { DTOAdapter } from "../dtos/DTOAdapter";

export interface IUseCase {
    execute(dto: DTOAdapter): Promise<any>;
}