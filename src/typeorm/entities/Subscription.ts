import { Entity, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './User'
import { Base } from '../Base'

@Entity('subscription')
export class Subscription extends Base {

    @ManyToOne(() => User, (user) => user.subscriptions)
    @JoinColumn()
    fromUser: User

    @ManyToOne(() => User, (user) => user.subscriptions)
    @JoinColumn()
    toChannel: User
}