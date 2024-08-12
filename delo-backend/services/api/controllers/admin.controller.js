import Admin from '../models/admin.model.js'
import Content from '../models/content.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Crypto from '../helper/encryption.js'
import { checkAutorized, checkPassword } from '../helper/helper.js';
import dotenv from 'dotenv';
import Enquiry from '../models/enquiry.model.js'
import { cvMail, sendMail } from '../helper/emailNotification.js'
import Quotation from '../models/quotation.model.js'
import Files from '../models/usercv.model.js'
dotenv.config()
const crypto = new Crypto(process.env.DECRYPT_KEY);

const signupAdmin = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Field missing", success: false })
        }


        const emailData = await Admin.find({ email: email });
        if (emailData.length > 0) {
            return res.status(400).send({
                message: 'Email already present'
            });
        }
        password = await crypto.encrypt(password)
        // email = crypto.encrypt(email)

        const admin = await Admin.create({
            adminId: "DSTADMIN000001",
            name: name,
            email: email,
            password: password,
        })
        return res.status(201).send({ message: "Admin created", success: true })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: true, error: error.stack })
    }

}

const signIn = async (req, res) => {

    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({ message: "Email or Password is missing", success: false });
        }

        const user = await Admin.findOne({ email })

        if (!user) {
            return res.status(400).send({ message: "Invalid email or password", success: false })
        }
        console.log("user", user)
        const isPasswordMatch = await checkPassword(password, user.password)
        console.log(isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(400).send({ message: "Invalid email Or password", success: false })
        }

        const jwtTokenObject = {
            _id: user._id,
            adminId: user.adminId,
            email: user.email,
        }

        const jwtToken = jwt.sign(jwtTokenObject, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRE_TIME
        })

        return res.status(200).send({
            success: true,
            message: "User Login Successfully",
            token: jwtToken,
            user: jwtTokenObject
        })

    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }
}


const getAdmin = async (req, res) => {

    let { adminId } = req.query

    try {
        let token = req.headers['x-access-token'] || req.headers.authorization;
        let isCheck = await checkAutorized(token, adminId)
        if (!isCheck.success) {
            return res.status(400).send(isCheck);
        }

        const user = await Admin.findOne({
            adminId: adminId
        })
        if (!user) {
            return res.status(400).send({ message: "Something went wrong", success: false })
        }

        let json = {
            adminId: adminId,
            name: user.name,
            email: user.email,
            token: token
        }

        return res.status(200).send({ message: "Get Details", success: true, data: json })


    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }

}


const updateContent = async (req, res) => {

    try {
        const { key, adminId } = req.query;
        const body = req.body;
        let token = req.headers['x-access-token'] || req.headers.authorization;

        let isCheck = await checkAutorized(token, adminId)
        if (!isCheck.success) {
            return res.status(400).send(isCheck);
        }
        if (!key || !adminId || !body) {
            return res.status(400).send({ message: "Key, adminId, or body is missing", success: false });
        }

        let content = await Content.findOne({ adminId: adminId });

        if (!content) {
            content = new Content({ adminId });
        }

        content[key] = body;
        content.updated_at = Date.now();

        const updatedContent = await content.save();

        return res.status(201).send({ message: "Content updated successfully", success: true });
    } catch (error) {
        console.log(error.stack);
        res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }

}

const getConentByType = async (req, res) => {

    const { adminId, key } = req.query
    let token = req.headers['x-access-token'] || req.headers.authorization;
    try {
        let isCheck = await checkAutorized(token, adminId)
        if (!isCheck.success) {
            return res.status(400).send(isCheck);
        }
        if (!key) {
            return res.status(400).send({ message: "Key is missing" })
        }
        // Find the document by adminId
        const content = await Content.findOne({ adminId });
        if (content && content[key] !== undefined) {
            return res.status(200).json({ message: "Get All Content", success: true, data: content[key] });
        } else {
            return res.status(400).json({ message: "No Content", success: false, data: {} });
        }
    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }
}

const getAllContent = async (req, res) => {

    const { key } = req.query

    try {
        if (!key) {
            return res.status(400).send({ message: "Key is missing" })
        }
        // Find the document by adminId
        const content = await Content.findOne({ adminId:"DSTADMIN000001" });
        if (content && content[key] !== undefined) {
            return res.status(200).json({ message: "Get All Content", success: true, data: content[key] });
        } else {
            return res.status(400).json({ message: "No Content", success: false, data: {} });
        }
    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }
}






const sendEnquiry = async (req, res) => {

    const { name, email, subject, details } = req.body
    const type = Number(req.query.type)
    try {

        const adminId = await Admin.findOne({ adminId: "DSTADMIN000001" })
        const adminEmail = adminId.email

        if (!type) {
            return res.status(400).send({ message: "Missing type", success: false })
        }

        if (!name || !email || !subject || !details) {
            return res.status(400).send({ message: "Missing fields", success: false })
        }
        let json = {
            adminEmail: adminEmail,
            name: name,
            email: email,
            subject: subject,
            details: details
        }

        const result = await Enquiry.create(json)
        const mailsent = await sendMail(json, type)
        if (mailsent) return res.status(201).send({ message: "Enquiry Sent Successfully", success: true })


    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }


}


const sendQuation = async (req, res) => {

    const { industry, resources, duration, totalamount, clientname, email, phone, address, servicedate, message } = req.body
    const type = Number(req.query.type)

    try {

        if (!type) {
            return res.status(400).send({ message: "Missing type", success: false })
        }
        if (!industry || !resources || !duration || !totalamount || !clientname || !email || !phone || !address || !servicedate || !message) {
            return res.status(400).send({ message: "Missing type", success: false })
        }

        const adminId = await Admin.findOne({ adminId: "DSTADMIN000001" })
        const adminEmail = adminId.email

        let json = {
            adminEmail: adminEmail,
            industry: industry,
            resources: Number(resources),
            duration: Number(duration),
            totalamount: Number(totalamount),
            clientname: clientname,
            email: email,
            phone: Number(phone),
            address: address,
            servicedate: servicedate,
            message: message
        }

        const result = await Quotation.create(json)
        const mailsent = await sendMail(json, type)
        if (mailsent) return res.status(201).send({ message: "Quotation Sent Successfully", success: true })


    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }


}


const sendCv = async (req, res) => {
    let json = req.file
    const {jobrole,location} = req.body
    try {

        if(!jobrole || !location){
            return res.status(400).send({ message: "Missing Fields", success: false }) 
        }

        const adminId = await Admin.findOne({ adminId: "DSTADMIN000001" })
        const adminEmail = adminId.email


        json = {...json,adminEmail,jobrole}

        const result = await Files.create({
            adminEmail:adminEmail,
            jobrole:jobrole,
            location:location,
            filename:json.originalname,
            contentType:json.mimetype,
            size:Number(json.size)
        })
        const mailsent = await cvMail(json)
        if (mailsent) return res.status(201).send({ message: "Resume uploaded Successfully", success: true })

    } catch (error) {
        console.log(error.stack);
        return res.status(500).send({ message: "Internal Server Error", error: error.stack });
    }


}

export { signupAdmin, signIn, getAdmin, updateContent, getConentByType, sendEnquiry, sendQuation, sendCv ,getAllContent  }
