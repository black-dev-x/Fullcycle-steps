import { Controller, Logger } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaContext } from '@app/kafka';

@Controller('orders')
export class OrderConsumer {
  private logger = new Logger(OrderConsumer.name);

  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('nfe')
  create(payload: KafkaContext) {
    this.logger.log(
      `Receiving ${payload.messageValue.event}`,
      payload.messageValue,
    );
    return this.orderService.completeOrder(payload.messageValue);
  }
}
