import { Module } from '@nestjs/common';
import { NfeConsumer } from './nfe.consumer';
import { NfeService } from './nfe.service';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from '../../../libs/kafka/src';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KafkaModule.forFeature({ kafkaBroker: process.env.KAFKA_BROKER }),
  ],
  controllers: [NfeConsumer],
  providers: [NfeService],
})
export class NfeModule {}
