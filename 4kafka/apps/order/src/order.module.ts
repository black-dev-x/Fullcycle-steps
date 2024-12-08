import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { KafkaModule } from '@app/kafka';
import { ConfigModule } from '@nestjs/config';
import { OrderConsumer } from './order.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KafkaModule.forFeature({ kafkaBroker: process.env.KAFKA_BROKER }),
  ],
  controllers: [OrderController, OrderConsumer],
  providers: [OrderService],
})
export class OrderModule {}
