import * as kafkaLib from '@confluentinc/kafka-javascript';

export class KafkaModule {
  static forFeature({ kafkaBroker }: { kafkaBroker: string }) {
    return {
      module: KafkaModule,
      providers: [
        {
          provide: kafkaLib.KafkaJS.Kafka,
          useFactory() {
            return new kafkaLib.KafkaJS.Kafka({
              kafkaJS: {
                brokers: [kafkaBroker],
              },
            });
          },
        },
      ],
      exports: [kafkaLib.KafkaJS.Kafka],
    };
  }
}
