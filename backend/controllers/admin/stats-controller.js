import Pet from '../../models/Pet.js';
import AdoptionOrder from '../../models/AdoptionOrder.js';
import User from '../../models/User.js'; 
import Contact from '../../models/Contact.js';

export const getDashboardStats = async (req, res) => {
    try 
    {
        let totalPets = 0, pendingApplications = 0, totalUsers = 0, totalContactMessages = 0;

        try {
            totalPets = await Pet.countDocuments();
            console.log("Total available pets:", totalPets);
       
            pendingApplications = await AdoptionOrder.countDocuments({ adoptionStatus: 'pending_review' });
            console.log("Total pending applications:", pendingApplications);
       
            totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
            console.log("Total non-admin users:", totalUsers);
            
            totalContactMessages = await Contact.countDocuments();
            console.log("Total contact messages:", totalContactMessages);
        } catch (error) {
            console.error("Error counting pets or users or applications:", error);
        }

        res.status(200).json({
            success: true,
            data: {
                totalPets,
                pendingApplications,
                totalUsers,
                totalContactMessages
            }
        });

    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        res.status(500).json({
            success: false,
            message: "Server error fetching dashboard statistics.",
            error: error.message
        });
    }
};