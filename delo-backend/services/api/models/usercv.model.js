import  mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        required:true
    },

    jobrole:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },

    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    size:{
        type:Number,
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

const  Files = mongoose.model('cvs', fileSchema);

export default Files;