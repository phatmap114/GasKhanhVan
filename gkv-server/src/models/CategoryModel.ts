import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  image: string;
  createdAt: Date;
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model<ICategory>('Category', categorySchema);