import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

 export default connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}