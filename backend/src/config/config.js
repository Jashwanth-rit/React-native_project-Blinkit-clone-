import session from '@fastify/session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';
import { Admin } from '../models/users.js';
dotenv.config();

// MongoDB Store
const MongoStore = MongoDBStore(session);
const mongoURI = process.env.MONGO_URI;

const mongoStore = new MongoStore({
  uri: mongoURI,
  collection: 'sessions',
});

// Authentication
export const authenticate = async (email, password) => {

    if(email && password){
        const user = await Admin.findOne({ email });
        if(!user){
            return null;
        }
        else{
            return Promise.resolve({ email });
        }
    }
//   if (email === 'jk.karunadu01@gmail.com' && password === 'Jk@karunadu01') {
    
//   } else {
//     return null;
//   }
};

export const PORT = process.env.port || 3000
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

export { mongoStore };
