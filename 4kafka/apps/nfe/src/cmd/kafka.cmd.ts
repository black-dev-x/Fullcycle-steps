import { NestFactory } from '@nestjs/core';
import { KafkaServer } from '@app/kafka';
import { NfeModule } from '../nfe.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(NfeModule, {
    strategy: new KafkaServer({
      server: {
        'bootstrap.servers': process.env.KAFKA_BROKER,
      },
      consumer: {
        'group.id': process.env.NFE_CONSUMER_GROUP,
        'client.id': `nfe-consumer-${process.env.HOSTNAME}`,
      },
    }),
  });
  await app.listen();
}
bootstrap();
