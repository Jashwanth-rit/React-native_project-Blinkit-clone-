import mongoose from 'mongoose';
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  role: {
    type: String,
    enum: ['customer', 'delivery_partner', 'admin', 'branch'],
    required: [true, 'Role is required'],
  }
});

// Customer Schema
const CustomerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // One-to-one relationship
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  location: {
    type: String,
    required: [true, 'Branch location is required'],
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  }
});

// Delivery Partner Schema
const DeliveryPartnerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // One-to-one relationship
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
  },
  location: {
    type: String,
    required: [true, 'Branch location is required'],
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
  },
  availabilityStatus: {
    type: Boolean,
    default: true,
  },
  deliveriesCompleted: {
    type: Number,
    default: 0,
  },
  branches: [{
    type: Schema.Types.ObjectId,
    ref: 'Branch',  // One-to-many relationship
  }],
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  }
  
});

// Branch Schema
const BranchSchema = new Schema({
    branchName: {
      type: String,
      required: [true, 'Branch name is required'],
    },
    location: {
      type: String,
      required: [true, 'Branch location is required'],
    },
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,  // Many-to-one relationship
    },
    deliveryPartners: [{
      type: Schema.Types.ObjectId,
      ref: 'DeliveryPartner',  // One-to-many relationship with Delivery Partner
    }]
  });
  
// Admin Schema
const AdminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,  // One-to-one relationship with User
  },
  branches: [{
    type: Schema.Types.ObjectId,
    ref: 'Branch',  // One-to-many relationship
  }],
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  role: {
    type: String,
    enum: [ 'admin'],
    default:['admin']
  }
});

// Create models
const User = mongoose.model('User', UserSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const DeliveryPartner = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
const Branch = mongoose.model('Branch', BranchSchema);
const Admin = mongoose.model('Admin', AdminSchema);

// Export models
export {
  User,
  Customer,
  DeliveryPartner,
  Branch,
  Admin,
};  