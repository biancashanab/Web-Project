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