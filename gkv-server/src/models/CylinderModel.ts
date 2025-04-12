import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICylinder extends Document {
  name: string;
  type: Types.ObjectId;
  price: number;
  stock: number;
  image: string;
  description: string; // Rich text description
  createdAt: Date;
}

const cylinderSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true }, // Rich text description
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICylinder>('Cylinder', cylinderSchema);