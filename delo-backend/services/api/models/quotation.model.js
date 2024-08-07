import  mongoose from 'mongoose';

const quoatationSchema = new mongoose.Schema({

    adminEmail: {
        type: String,
        required: true
    },

    industry: {
        type:String,
        required: true
    },
    resources:{
        type:Number,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    totalamount:{
        type:Number,
        required:true 
    },

    clientname: {
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    servicedate:{
        type:Date,
        required:true,
    },
    message:{
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

const  Quotation= mongoose.model('quotation', quoatationSchema);

export default Quotation;