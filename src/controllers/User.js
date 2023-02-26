const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async(req, res) => {

    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please fill in all the fields'
            })
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        
           // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the email and password are correct, create a JWT
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the user and the JWT token
    res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Something went wrong' });
  }
        
      
   

}

const newUser = async(req, res) => {

    const { name, email, password, contact } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
  
      // If the user already exists, return an error
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user document
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        contact,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      //create token
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // Return the new user document
      res.status(201).json({result :newUser, 
    token});
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  
    }



module.exports = {
    login,
    newUser
}