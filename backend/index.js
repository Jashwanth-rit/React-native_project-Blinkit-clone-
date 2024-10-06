// Import Fastify and MongoDB connection function
import fastify from 'fastify';
import connectDB from './src/config/connect.js';

// Call the MongoDB connection function
connectDB();

// Create the Fastify instance as 'app'
const app = fastify({ logger: true });

// Define routes
app.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify with MongoDB connection!' };
});

// Start the server on port 3000
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
