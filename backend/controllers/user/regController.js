import User from "../../models/userModel.js";
import asyncHandler from 'express-async-handler';
import { generateToken } from "../../helpers/genereateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const isHaveUser = await User.findOne({email});

    if (isHaveUser) {
        res.status(400);
        throw new Error('Данный пользователь уже зарегестрирован');
    };

    const user = await User.create({
        email,
        password,
    });

    const token = generateToken(user._id);

    res.json({ user, token });

});