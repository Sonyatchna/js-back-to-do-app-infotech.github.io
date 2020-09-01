import mongoose from 'mongoose';

export default function checkValidMongooseId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
};
