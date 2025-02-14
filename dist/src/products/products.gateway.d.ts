import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
export declare class ProductsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    private server;
    afterInit(): void;
    handleProductUpdated(): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
}
