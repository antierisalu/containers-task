import { connect } from 'amqplib';
import { saveOrderToDatabase } from './database.js';

async function startConsumer() {
  try {
    const conn = await connect(`amqp://${process.env.RABBITMQ_HOST}`);
    const channel = await conn.createChannel();

    const queue = 'orders_queue';

    await channel.assertQueue(queue, {
      durable: true
    });

    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const orderData = JSON.parse(msg.content.toString());
        console.log('Received:', orderData);

        try {
          await saveOrderToDatabase(orderData);
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing order:', error);
          // channel.nack(msg, false, true); // if you want to requeue but it started spamming some why
        }
      }
    }, {
      noAck: false
    });

  } catch (error) {
    console.error('Error in RabbitMQ consumer:', error);
  }
}
console.log("Started consumer")
startConsumer();
