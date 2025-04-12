import Pet from '../../models/Pet.js';
import AdoptionOrder from '../../models/AdoptionOrder.js';
import User from '../../models/User.js'; 

export const getDashboardStats = async (req, res) => {
    try {
        const [totalPets, pendingApplications, totalUsers] = await Promise.all([
            Pet.countDocuments({ status: 'available' }),
            AdoptionOrder.countDocuments({ adoptionStatus: 'pending_review' }),
            User.countDocuments({ role: { $ne: 'admin' } })
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalPets,
                pendingApplications,
                totalUsers
            }
        });

    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching dashboard statistics."
        });
    }
};