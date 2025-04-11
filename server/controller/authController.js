const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modules/Users");

const login = async function(req, res){
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: "Invalid password"});

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d",})

        res.json({ token });
    }catch(err){
        res.status(500).json({message: "Server error"});

    }
};


const register = async function(req, res){
    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({message: "User already exist"});

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashPassword });
        await user.save();

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: "7d",});
        res.status(201).json({ token });

    } catch(err){
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    login,
    register,
  };