const { User, Sequelize } = require('../models');

exports.login = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};


exports.getUsers = async (req, res) => {
  const {userId} = req.params
  try {
    // Ambil semua pengguna (kecuali pengguna yang membuat janji temu)
    const users = await User.findAll({
      where: {
        id: { [Sequelize.Op.ne]: userId }
      }
    });

    return res.status(200).json({
      message: 'User list fetched successfully',
      users: users
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
};