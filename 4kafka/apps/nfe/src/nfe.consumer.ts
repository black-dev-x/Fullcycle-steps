import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KafkaContext } from '@app/kafka';
import { NfeService } from './nfe.service';

@Controller()
export class NfeConsumer {
  private logger = new Logger(NfeConsumer.name);

  constructor(private readonly nfeService: NfeService) {}

  @MessagePattern('order')
  async process(payload: KafkaContext) {
    this.logger.log(
      `Receiving ${payload.messageValue.event}`,
      payload.messageValue,
    );
    if (payload.messageValue.event !== 'order_created') {
      return;
    }
    return this.nfeService.process(payload.messageValue);
  }
}
