import { NestFactory } from '@nestjs/core';
import { KafkaServer } from '@app/kafka';
import { OrderModule } from '../order.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrderModule, {
    strategy: new KafkaServer({
      server: {
        'bootstrap.servers': process.env.KAFKA_BROKER,
        'client.id': `order-consumer-${process.env.HOSTNAME}`,
      },
      consumer: {
        'group.id': 'order-consumer-group',
        'client.id': `order-consumer-${process.env.HOSTNAME}`,
        'max.poll.interval.ms': 10000,
        'session.timeout.ms': 10000,
      },
    }),
  });

  await app.listen();
}
bootstrap();
