import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import * as kafkaLib from '@confluentinc/kafka-javascript';

@Injectable()
export class OrderService implements OnModuleInit, OnApplicationShutdown {
  private kafkaProducer: kafkaLib.KafkaJS.Producer;

  constructor(private kafkaInst: kafkaLib.KafkaJS.Kafka) {}

  async onModuleInit() {
    this.kafkaProducer = this.kafkaInst.producer();
    await this.kafkaProducer.connect();
  }

  async onApplicationShutdown() {
    await this.kafkaProducer.disconnect();
  }

  async create(body) {
    // some logic
    await this.kafkaProducer.send({
      topic: 'order',
      messages: [
        {
          value: JSON.stringify({
            event: 'order_created',
            data: {
              id: Math.random().toString(36).substring(7),
              ...body,
            },
          }),
        },
      ],
    });
  }

  async completeOrder(data) {
    // some logic
    await this.kafkaProducer.send({
      topic: 'order',
      messages: [
        {
          value: JSON.stringify({
            event: 'order_completed',
            data: {
              id: Math.random().toString(36).substring(7),
              ...data,
            },
          }),
        },
      ],
    });
  }
}
