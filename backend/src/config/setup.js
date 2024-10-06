import AdminJS from 'adminjs';
import AdminJSFastify from '@adminjs/fastify';
import { User, Customer, DeliveryPartner, Branch, Admin } from '../models/users.js'; // Adjust the path as necessary

// Initialize AdminJS
const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        // Options for User resource can be defined here
        properties: {
          password: { isVisible: { list: false, edit: true, show: false, filter: false } }, // Hide password from list and show views
        },
      },
    },
    {
      resource: Customer,
      options: {
        // Options for Customer resource can be defined here
      },
    },
    {
      resource: DeliveryPartner,
      options: {
        // Options for Delivery Partner resource can be defined here
      },
    },
    {
      resource: Branch,
      options: {
        // Options for Branch resource can be defined here
      },
    },
    {
      resource: Admin,
      options: {
        // Options for Admin resource can be defined here
        properties: {
          password: { isVisible: { list: false, edit: true, show: false, filter: false } }, // Hide password from list and show views
        },
      },
    },
  ],
  // You can add more AdminJS options here
  branding: {
    companyName: 'Your Company Name',
    softwareBrothers: false, // If you want to hide the "powered by AdminJS" footer
  },
  rootPath:'/admin'
});

// Export the AdminJS instance
export { adminJs, AdminJSFastify };
