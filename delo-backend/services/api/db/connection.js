import mongoose from 'mongoose'



const username = "soummyabiswas11";
const password = "95JIBxBjel8ol2MB"


const URL = `mongodb+srv://${username}:${password}@cluster0.mtncwhc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToDatabase = async () => {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connection is successful`);
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };
  export default connectToDatabase;  