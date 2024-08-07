import  mongoose from 'mongoose';

const adminModelSchema = new mongoose.Schema({

    adminId: {
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
        unique:true
    },
    password:{
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

const Admin = mongoose.model('admin', adminModelSchema);

export default Admin;