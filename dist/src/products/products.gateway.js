"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductsGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const auth_service_1 = require("../auth/auth.service");
const common_1 = require("@nestjs/common");
let ProductsGateway = ProductsGateway_1 = class ProductsGateway {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(ProductsGateway_1.name);
    }
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
        }
        catch (error) {
            this.logger.error('Failed to emit product update:', error);
        }
    }
    async handleConnection(client) {
        this.logger.log(`Client attempting to connect: ${client.id}`);
        try {
            const token = client.handshake.auth.Authorization;
            this.logger.log(`Received token: ${token ? 'present' : 'missing'}`);
            await this.authService.verifyToken(token);
            this.logger.log(`Client authenticated successfully: ${client.id}`);
        }
        catch (err) {
            this.logger.error(`Authentication failed: ${err.message}`);
            throw new websockets_1.WsException('Unauthorized.');
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
};
exports.ProductsGateway = ProductsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ProductsGateway.prototype, "server", void 0);
exports.ProductsGateway = ProductsGateway = ProductsGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        namespace: 'products',
        path: '/ws/'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ProductsGateway);
//# sourceMappingURL=products.gateway.js.map