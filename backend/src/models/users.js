import mongoose from 'mongoose';
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Invalid email'] },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['customer', 'delivery_partner', 'admin', 'branch'], required: true }
});

// Customer Schema
const CustomerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  phone: { type: String, required: true, match: [/^\d{10}$/, 'Invalid phone number'] }
});

// Delivery Partner Schema
const DeliveryPartnerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  vehicleNumber: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  availabilityStatus: { type: Boolean, default: true },
  deliveriesCompleted: { type: Number, default: 0 },
  address: { type: String, required: true },
  phone: { type: String, required: true, match: [/^\d{10}$/, 'Invalid phone number'] }
});

// Branch Schema
const BranchSchema = new Schema({
  branchName: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  deliveryPartners: [{ type: Schema.Types.ObjectId, ref: 'DeliveryPartner' }]
});

// Admin Schema
const AdminSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Invalid email'] },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['admin'], default: 'admin' }
});

// Category Schema
const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

// Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to Category
  stock: { type: Number, required: true, min: 0 },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const DeliveryPartner = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
const Branch = mongoose.model('Branch', BranchSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);

export { User, Customer, DeliveryPartner, Branch, Admin, Category, Product };
