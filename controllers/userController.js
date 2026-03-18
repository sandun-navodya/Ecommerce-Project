import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

                const token = jwt.sign(payload, "computer-01-store", { expiresIn: "48h" })
                //expire 

                console.log(token)
                res.json({

                    message: "Login successful",
                    token: token

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