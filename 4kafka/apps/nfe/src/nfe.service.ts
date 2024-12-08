import { Injectable, OnModuleInit } from '@nestjs/common';
import * as kafkaLib from '@confluentinc/kafka-javascript';

@Injectable()
export class NfeService implements OnModuleInit {
  private kafkaProducer: kafkaLib.KafkaJS.Producer;

  constructor(private kafkaInst: kafkaLib.KafkaJS.Kafka) {}

  async onModuleInit() {
    this.kafkaProducer = this.kafkaInst.producer();
    await this.kafkaProducer.connect();
  }

  process(data) {
    //some logic
    this.kafkaProducer.send({
      topic: 'nfe',
      messages: [
        {
          value: JSON.stringify({
            event: 'nfe_created',
            data: {
              id: Math.random().toString(36).substring(7),
              order_id: data.id,
              created_at: new Date(),
            },
          }),
        },
      ],
    });
  }
}
