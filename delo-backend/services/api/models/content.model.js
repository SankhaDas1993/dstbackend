import mongoose from 'mongoose';


const contentSchema = new mongoose.Schema({
    adminId: String,
    home: Object,
    about: Object,
    team: Object,
    clients: Object,
    careers: Object,
    services: Object,
    hiringmodel: Object,
    projecthiringmodel: Object,
    hourmodel: Object,
    taskmodel: Object,
    supportmodel: Object,
    hybrid: Object,
    quote: Object,
    faqs: Object,
    blogs: Object,
    contact: Object,
    allcasestuides: Object,
    proejctRang:Object,
    build:Object,
    grow:Object,
    eiffel:Object,
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
});


const Content = mongoose.model('content', contentSchema);

export default Content;

