import fastify from 'fastify';
import connectDB from './src/config/connect.js';
import { adminJs, buildAdminRouter } from './src/config/setup.js';
import { PORT } from './src/config/config.js';

// Connect to MongoDB
connectDB();

// Create Fastify instance
const app = fastify({ logger: true });

// Build AdminJS Router
await buildAdminRouter(app);

// Define additional routes
app.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify with MongoDB connection!' };
});

// Start the server
const start = async () => {
  try {
    await app.listen({ port: PORT });
    console.log(`Server running on http://localhost:${PORT}${adminJs.options.rootPath}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
