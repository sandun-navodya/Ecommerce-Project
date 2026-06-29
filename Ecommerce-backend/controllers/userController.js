import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

export async function createUser(req, res) {

    try {

        const passwordHash = bcrypt.hashSync(req.body.password, 10)


        const newUser = new User({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: passwordHash,
            isAdmin: req.body.isAdmin


        });

        await newUser.save();

        res.json({ message: "User created successfully", user: newUser });
    } catch (err) {
        //res.status(500).json({ error: err.message });
        res.json("Error Creating User")
    }


}

export async function getUsers(req, res) {

    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized"
        })
    } else {
        res.status(200).json({
            message: "User details fetched successfully",
            user: req.user
        })
    }
}

export async function updateUserData(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized"
        })
    } else {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.user.email },
                { firstname: req.body.firstname, lastname: req.body.lastname, image: req.body.image },
                // { new: true }
            );

            const updatedUser = await User.findOne({ email: req.user.email });
            const tokenPayload = {
                email: updatedUser.email,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                isAdmin: updatedUser.isAdmin,
                isBlocked: updatedUser.isBlocked,
                isEmailVerified: updatedUser.isEmailVerified,
                image: updatedUser.image
            };

            const token = jwt.sign(tokenPayload, process.env.tokenSecret, { expiresIn: "48h" });

            res.json({
                message: "User data updated successfully",
                token: token
            })
        } catch (err) {
            res.status(500).json({
                message: "Error updating user data",
                error: err.message
            })
        }
    }
}

export async function updatePassword(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized"
        })
    }
    else {
        await User.findOneAndUpdate(
            { email: req.user.email },
            { password: bcrypt.hashSync(req.body.password, 10) }
        );
        res.json({
            message: "Password updated successfully"
        })
    }
}




export async function loginUser(req, res) {
    try {
        const user = await User.findOne(
            {
                email: req.body.email

            }
        )
        console.log(user);

        if (user == null) {
            res.status(404).json({ message: "User not found" })
        }

        else {

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)

            if (isPasswordCorrect) {


                const payload = {
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image

                }

                const token = jwt.sign(payload, process.env.tokenSecret, { expiresIn: "48h" })
                //expire 

                console.log(token)
                res.json({

                    message: "Login successful",
                    token: token,
                    isAdmin: user.isAdmin

                })
            }

            else {
                res.status(401).json({ message: "Invalid Password" })
            }
        }

    }

    catch (error) {
        res.status(500).json({
            message: "Error login in"
        })
    }

}

export async function googleLogin(req, res) {

    const accessToken = req.body.token;

    try {
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(response.data)

    } catch (error) {
        res.status(401).json({
            message: "Error logging in with Google",
            error: error.message
        })
        
    }

}


export function isAdmin(user) {
    if (user == null) {
        return false
    }
    if (user.isAdmin) {
        return true
    }
    else {
        return false
    }
}