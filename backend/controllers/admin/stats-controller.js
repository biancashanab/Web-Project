import Pet from '../../models/Pet.js';
import AdoptionOrder from '../../models/AdoptionOrder.js';
import User from '../../models/User.js'; 
import Contact from '../../models/Contact.js';

export const getDashboardStats = async (req, res) => {
    try 
    {
        let totalPets = 0, pendingApplications = 0, totalUsers = 0, totalContactMessages = 0;
        let petStats = {}, adoptionStats = {}, userStats = {}, messageStats = {};

        try {
            // Basic counts
            totalPets = await Pet.countDocuments();
            console.log("Total available pets:", totalPets);
       
            pendingApplications = await AdoptionOrder.countDocuments({ adoptionStatus: 'pending_review' });
            console.log("Total pending applications:", pendingApplications);
       
            totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
            console.log("Total non-admin users:", totalUsers);
            
            totalContactMessages = await Contact.countDocuments();
            console.log("Total contact messages:", totalContactMessages);

            // Detailed pet statistics
            petStats = {
                total: totalPets,
                byType: await Pet.aggregate([
                    { $group: { _id: "$type", count: { $sum: 1 } } }
                ]),
                byAge: await Pet.aggregate([
                    { $group: { _id: "$age", count: { $sum: 1 } } }
                ]),
                byGender: await Pet.aggregate([
                    { $group: { _id: "$gender", count: { $sum: 1 } } }
                ])
            };

            // Detailed adoption statistics
            adoptionStats = {
                total: await AdoptionOrder.countDocuments(),
                byStatus: await AdoptionOrder.aggregate([
                    { $group: { _id: "$adoptionStatus", count: { $sum: 1 } } }
                ]),
                recentAdoptions: await AdoptionOrder.find({ adoptionStatus: 'completed' })
                    .sort({ createdAt: -1 })
                    .limit(5)
            };

            // Detailed user statistics
            userStats = {
                total: totalUsers,
                byRole: await User.aggregate([
                    { $group: { _id: "$role", count: { $sum: 1 } } }
                ]),
                recentUsers: await User.find()
                    .sort({ createdAt: -1 })
                    .limit(5)
            };

            // Detailed message statistics
            messageStats = {
                total: totalContactMessages,
                byStatus: await Contact.aggregate([
                    { $group: { _id: "$status", count: { $sum: 1 } } }
                ]),
                recentMessages: await Contact.find()
                    .sort({ createdAt: -1 })
                    .limit(5)
            };

        } catch (error) {
            console.error("Error gathering detailed statistics:", error);
        }

        res.status(200).json({
            success: true,
            data: {
                totalPets,
                pendingApplications,
                totalUsers,
                totalContactMessages,
                petStats,
                adoptionStats,
                userStats,
                messageStats
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