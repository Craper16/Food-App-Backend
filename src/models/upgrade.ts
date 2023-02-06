import { Schema, model, Types } from 'mongoose';

export interface UpgradeModel {
  title: string;
  price: number;
  _id: string | Types.ObjectId;
}

const upgradeSchema = new Schema<UpgradeModel>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Upgrade = model<UpgradeModel>('Upgrade', upgradeSchema);
