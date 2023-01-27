import { Schema, model } from 'mongoose';

export interface UpgradeModel {
  title: string;
  price: number;
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
