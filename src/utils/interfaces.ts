import { User } from "src/typeorm/entities/User";

export interface AuthenticatedRequest extends Request {
    user: User
}