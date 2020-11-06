//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs')

run();

async function run() {
    try {
        const kafka = new Kafka({
            clientId: 'myapp',
            brokers: ['andrii-pc:9092']
        });

        const consumer = kafka.consumer({ groupId: 'test' });

        console.log('Connecting.....');

        await consumer.connect();

        console.log('Connected!');

        await consumer.subscribe({
            topic: 'Users',
            fromBeginning: true // read from beginning
        });

        console.log('BEFORE');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('consumer.run');
                console.log({
                    value: message.value.toString(),
                    headers: message.headers,
                })
            },
        });

        console.log('AFTER');
    } catch(ex) {
        console.error(`Something bad happened ${ex}`)
    }

}
