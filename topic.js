//const Kafka = require("kafkajs").Kafka
const { Kafka } = require('kafkajs');

run();

async function run(){
    try {
        const kafka = new Kafka({
            clientId: 'myapp',
            brokers :['andrii-pc:9092'] // andrii-ps -> hostname
        });

        const admin = kafka.admin();

        console.log('Connecting.....');

        await admin.connect();

        console.log('Connected!');
        //A-M, N-Z
        await admin.createTopics({
            topics: [{
                topic : 'Users',
                numPartitions: 2 // how many partitions
            }]
        });

        console.log('Created Successfully!');

        await admin.disconnect();
    }
    catch(ex) {
        console.error(`Something bad happened ${ex}`)
    } finally {
        process.exit(0);
    }

}