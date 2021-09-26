import mongoose, { ConnectOptions, mongo } from 'mongoose';
import config from 'config';

const connect = () => {
  const databaseUrl = config.get('mongourl') as string;

  return mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log('database connected');
    })
    .catch((err) => {
      console.log('Error as occured');
      process.exit(1);
    });
};

export default connect;
