import databaseConfig from '../config/databaseConfig';
import mongoose, { ConnectionOptions } from 'mongoose';
import { StorageTypeEnum } from '../enums/StorageTypeEnum';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function databaseBootstrap(): Promise<void> {
  if (process.env.STORAGE_TYPE === StorageTypeEnum.InMemory) {
    const mongoServer: MongoMemoryServer = new MongoMemoryServer();

    mongoose.Promise = Promise;
    mongoServer.getUri().then((mongoUri: string) => {
      const mongooseOpts: ConnectionOptions = {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      };

      mongoose.connect(mongoUri, mongooseOpts);

      mongoose.connection.on('error', (err: any) => {
        if (err.message.code === 'ETIMEDOUT') {
          console.log(err);
          mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log('Error!', err);
      });

      mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
      });
    });
  } else {
    await mongoose.connect(databaseConfig.connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    } as ConnectionOptions);
  }
}
