import { Logger, OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, ConnectedSocket, WebSocketGateway, WebSocketServer, OnGatewayDisconnect, OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { ClientToServerEvents, Message, ServerToClientEvents } from "src/utils/interfaces/chat.interface";



@WebSocketGateway({
  origin: ['http://localhost:3000']
})

export class MyGateway implements OnGatewayDisconnect, OnGatewayConnection {

  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents, ClientToServerEvents>();
  private logger = new Logger('ChatGateway');
  private clients: any = []
  private activeClients: Set<any> = new Set();


  // onModuleInit(socket: Socket): Promise<void>  {
  //     this.server.on('connection', (socket) => {

  //        console.log(`⚡: ${socket.id} user just connected!`);

  //     })
  // }

  @SubscribeMessage('message')
  async onNewMessage(@MessageBody() payload: Message): Promise<Message> {
    this.logger.log(payload)


    this.server.emit('messageResponse', payload)
    return payload
  }

  handleConnection(client: any, socket: Socket, ...args: any[]) {

    // this.logger.log(`Socket connected: ${socket.id}`)
    // this.server.emit('newUser', () => {
    //     this.clients.push(client.id);

    //     socket.emit('newUserResponse', this.clients)
    // })

    console.log(`Client connected: ${client.id}`)


  }

  handleDisconnect(client: any) {
    //this.activeClients.delete(client);
    console.log(`Client disconnected: ${client.id}`);
  }


  @SubscribeMessage('typing')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.server.emit('typingResponse', data)
    return data;
  }

  @SubscribeMessage('liked')
  handleEventLiked(client: Socket, msg: string): void {
    // You can also access the WebSocketServer instance
    // in other methods of the service
    this.logger.log(`Received event from client: ${client.id}`);
    this.server.emit('Videoliked', msg);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    //const newMessage = await this..createMessage(payload);
    this.server.emit('receiveMessage', payload);

  }

  //handleDisconnect(client: any) {
  //this.activeClients.delete(client);
  // this.clients = this.clients.filter((user: any) => user.socketID !== socket.id);
  // this.server.emit('newUserResponse', this.clients)
  // this.logger.log(`Socket disconnected: ${socket.id}`)
  //}


}