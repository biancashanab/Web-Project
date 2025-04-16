import User from '../../models/User.js';
import AdoptionOrder from '../../models/AdoptionOrder.js';
import Cart from '../../models/Cart.js';
import Address from '../../models/Address.js';

export const getAllUsersForAdmin = async (req, res) => {
    try {
        const users = await User.find({})
                                .select('-password') 
                                .sort({ userName: 1 });

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

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.role === 'admin') {                            // nu sterg ultimul admin existent
            const adminCount = await User.countDocuments({ role: 'admin' });
            if (adminCount <= 1) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot delete the last admin user."
                });
            }
        }

        await Promise.all([                          // sterg toate datele asociate
            AdoptionOrder.deleteMany({ userId }),
            Cart.deleteOne({ userId }),
            Address.deleteMany({ userId }),
            User.findByIdAndDelete(userId)
        ]);

        res.status(200).json({
            success: true,
            message: "User and all associated data deleted successfully.",
            userId: userId
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Server error deleting user."
        });
    }
};