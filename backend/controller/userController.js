const User = require('../models/User');
const { createSecretToken } = require('../util/secretToken');

const addUser = async (req, res) => {
  console.log("start function");
  const { name, email, password, age } = req.body;
  console.log("req.body")
  console.log(name);
  console.log(email);
  console.log(req.body);
  let avatar;
  if (req.file) {
    avatar = req.file.buffer;
  } else {
    //default image code letter..
  }

  try {
    console.log("start");
    const existingUserEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ name: name });
    console.log(existingUserEmail);
    console.log(existingUsername);
    if (existingUserEmail) {
      console.log("error is threr??");
      return res.status(400).json({ message: 'Email already exist' });
    } else if (existingUsername) {
      return res.status(400).json({ message: 'Username already exist' });
    }

    // const hashPassword = await bcrypt.hash(password,10);

    console.log("start user");
    const user = new User(req.body);
    console.log(user);
    await user.save();
    res.status(201).json({ message: 'User created successfully' })
    console.log("end user");

  } catch (err) {
    res.status(500).json({ message: 'Server Error : ' + err });
  }
}

const loginUser = async (req, res) => {
  console.log("start login");
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    console.log(user);
    console.log(user['email']);
    console.log(password);
    if (user.password === password) {
      const jwttoken = createSecretToken(user);
      console.log(jwttoken);
      res.json({ token: jwttoken })
      // res.status(200).json({ message: 'User logged in successfully' });
    } else {
      res.status(400).json({ message: 'password does not match' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error : ' + err });
  }
}

const getUserByUserId = async (req, res) => {
  console.log("start-getUserByUserId");
  const userid = req.params.userid;
  try {
    const user = await User.find({ _id: userid });
    if (!user) {
      return res.staus(404).json({ message: 'User not found' });
    }
    return res.status(201).json({ user: user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error : ' + err });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    users.map((user) => {
      delete user.password;
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: 'Server Error :' + err });
  }
}

const updateUser = async (req, res) => {
  const userid = req.params.userid;

  let avatar;

  // if (req.file) {
  //     avatar = req.file.buffer;
  // }
  // else {
  //     const defaultImagePath = path.join(__dirname, '../uploads/default.jpeg');
  //     try {
  //         avatar = fs.readFileSync(defaultImagePath);
  //     } catch (error) {
  //         return res.status(500).json({ message: 'Could not load default avatar.' });
  //     }
  // }

  try {
    const user = User.updateOne({ _id: userid }, { $set: req.body });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error : ' + err });
  }
}

const deleteUser = async (req, res) => {
  const userid = req.params.userid;
  try {
    const user = await User.deleteOne({ _id: userid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error :' + err });
  }
}

module.exports = {
  loginUser,
  addUser,
  getUserByUserId,
  getAllUsers,
  updateUser,
  deleteUser
}