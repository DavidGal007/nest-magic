import { Base } from 'src/utils/base'
import { Entity, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './User'

@Entity('subscription')
export class Subscription extends Base {

    @ManyToOne(() => User, (user) => user.subscriptions)
    @JoinColumn()
    fromUser: User

    @ManyToOne(() => User, (user) => user.subscriptions)
    @JoinColumn()
    toChannel: User
}