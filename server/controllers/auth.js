import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/User.js";

/* REGISTER USER 
    Encrypts password, saves it, when user tries 
    to log in they provide password, we salt password again 
    and hash it to make sure its correct,
    if correct we return a json web token to log in
    */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body
        
        //Creates a rand salt used in combination w our password, greatly enhances the
        //security of hashed passwords by adding randomness and uniqueness to each hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}