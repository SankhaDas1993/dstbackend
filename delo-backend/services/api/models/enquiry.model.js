import  mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({

    adminEmail: {
        type: String,
        required: true
    },

    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    created_at: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updated_at: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
})

const Enquiry = mongoose.model('enquiry', enquirySchema);

export default Enquiry;