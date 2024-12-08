import * as kafkaLib from '@confluentinc/kafka-javascript';

export class KafkaContext {
  constructor(
    readonly kafkaInst: kafkaLib.KafkaJS.Kafka,
    readonly partition,
    readonly topic,
    readonly message: kafkaLib.KafkaJS.Message,
    readonly messageValue: any,
  ) {}
}
