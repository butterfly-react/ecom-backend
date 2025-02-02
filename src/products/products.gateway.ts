import {
    WebSocketGateway,
    WebSocketServer,
    WsException,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { AuthService } from 'src/auth/auth.service';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    namespace: 'products',
    path: '/ws/'
  })
  export class ProductsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly logger = new Logger(ProductsGateway.name);
    
    constructor(private readonly authService: AuthService) {}
  
    @WebSocketServer()
    private server: Server;

    afterInit() {
      this.logger.log('WebSocket Gateway initialized');
    }
  
    handleProductUpdated() {
      try {
        this.logger.log('Product updated, emitting to all clients');
        if (!this.server) {
          throw new Error('WebSocket server not initialized');
        }
        
        this.server.emit('productUpdated');
        this.logger.log('Product update event broadcasted successfully');
      } catch (error) {
        this.logger.error('Failed to emit product update:', error);
      }
    }
  
    async handleConnection(client: Socket) {
      this.logger.log(`Client attempting to connect: ${client.id}`);
      try {
        const token = client.handshake.auth.Authorization;
        this.logger.log(`Received token: ${token ? 'present' : 'missing'}`);
        await this.authService.verifyToken(token);
        this.logger.log(`Client authenticated successfully: ${client.id}`);
      } catch (err) {
        this.logger.error(`Authentication failed: ${err.message}`);
        throw new WsException('Unauthorized.');
      }
    }

    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  }

