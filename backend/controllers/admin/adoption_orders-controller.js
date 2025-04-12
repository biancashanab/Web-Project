import AdoptionOrder from "../../models/AdoptionOrder.js"; // Ensure correct path
import Pet from "../../models/Pet.js"; // Import Pet model

export const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        const orders = await AdoptionOrder.find({})
                                          .populate('userId', 'userName email') // Populate user name/email
                                          .sort({ adoptionDate: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            data: orders,
            message: orders.length ? "Applications found." : "No applications found."
        });
    } catch (e) {
        console.error("Error fetching all adoption applications:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred!",
        });
    }
};

export const getOrderDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === 'undefined') {
            return res.status(400).json({ success: false, message: "Valid Application ID required." });
        }

        const order = await AdoptionOrder.findById(id)
                                         .populate('userId', 'userName email phone') // Populate more user details
                                         .populate('pets.PetId', 'name species breed image'); // Populate details of pets applied for

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Application not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (e) {
        console.error("Error fetching application details for admin:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred!",
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { adoptionStatus } = req.body;

         if (!id || id === 'undefined') {
            return res.status(400).json({ success: false, message: "Valid Application ID required." });
        }
        if (!adoptionStatus) {
             return res.status(400).json({ success: false, message: "New adoption status is required." });
        }
         const allowedStatuses = ['pending_review', 'approved', 'rejected', 'completed', 'cancelled'];
         if (!allowedStatuses.includes(adoptionStatus)) {
             return res.status(400).json({ success: false, message: "Invalid adoption status value provided." });
         }


        const updatedOrder = await AdoptionOrder.findByIdAndUpdate(
            id,
            {
                adoptionStatus: adoptionStatus,
                lastUpdated: new Date()
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Application not found!",
            });
        }

        if (adoptionStatus === 'completed') {
            for (const petInfo of updatedOrder.pets) {
                await Pet.findByIdAndUpdate(petInfo.PetId, { status: 'adopted' });
            }
        }


        res.status(200).json({
            success: true,
            message: "Adoption status updated successfully!",
            data: updatedOrder
        });
    } catch (e) {
        console.error("Error updating adoption status:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred!",
        });
    }
};