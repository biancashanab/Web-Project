import User from '../../models/User.js'; // Adjust path

export const getAllUsersForAdmin = async (req, res) => {
    try {
        const users = await User.find({})
                                .select('-password') // Exclude password field
                                .sort({ userName: 1 }); // Sort alphabetically by username

        res.status(200).json({
            success: true,
            data: users,
            message: users.length ? "Users found." : "No users found."
        });

    } catch (error) {
        console.error("Error fetching users for admin:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching users."
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Prevent deleting the last admin
        if (user.role === 'admin') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount <= 1) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete the last admin user."
                });
            }
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Server error deleting user."
        });
    }
};