import AdminJS from 'adminjs';
import AdminJSFastify from '@adminjs/fastify';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { User, Customer, DeliveryPartner, Branch, Admin, Category, Product } from '../models/users.js'; // Adjust path as necessary
import { COOKIE_PASSWORD, mongoStore, authenticate } from './config.js'; // Adjust path if necessary
import { dark, light, noSidebar } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose);

// Initialize AdminJS
export const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: { list: false, edit: true, show: false, filter: false } },
        },
      },
    },
    { resource: Customer },
    { resource: DeliveryPartner },
    { resource: Branch },
    {
      resource: Admin,
      options: {
        properties: {
          password: { isVisible: { list: false, edit: true, show: false, filter: false } },
        },
      },
    },
    { resource: Category },
    { resource: Product },
  ],
  branding: {
    companyName: 'Blink_it',
    softwareBrothers: false,
    favicon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Blinkit-yellow-app-icon.svg/1024px-Blinkit-yellow-app-icon.svg.png",
  },
  rootPath: '/admin',
  //defaultTheme: dark.id, // Set default theme to dark
 // availableThemes: [dark, light], // Available themes: dark, light, noSidebar
});

export const buildAdminRouter = async (app) => {
  return AdminJSFastify.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate,
      cookiePassword: COOKIE_PASSWORD,
      cookieName: 'adminjs',
    },
    app,
    {
      store: mongoStore,
      saveUninitialized: false,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      },
    }
  );
};
