import AdoptionOrder from "../../models/AdoptionOrder.js"; 
import Pet from "../../models/Pet.js"; 

export const getAllOrdersOfAllUsers = async (req, res) => {
    try {
        const orders = await AdoptionOrder.find({})
                                          .populate('userId', 'userName email') 
                                          .sort({ adoptionDate: -1 }); 

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
                                         .populate('userId', 'userName email phone') 
                                         .populate('pets.PetId', 'name species breed image');

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
        let { adoptionStatus } = req.body;

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

        // First get the order to check pets
        const order = await AdoptionOrder.findById(id).populate('pets.PetId');
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Application not found!",
            });
        }

        // Check if any pets are already adopted
        const hasAdoptedPets = order.pets.some(pet => pet.PetId && pet.PetId.status === 'adopted');
        if (hasAdoptedPets) {
            // If trying to approve or complete an order with adopted pets, reject it
            if (adoptionStatus === 'approved' || adoptionStatus === 'completed') {
                adoptionStatus = 'rejected';
            }
        }

        const updatedOrder = await AdoptionOrder.findByIdAndUpdate(
            id,
            {
                adoptionStatus: adoptionStatus,
                lastUpdated: new Date()
            },
            { new: true }
        ).populate('pets.PetId');

        if (adoptionStatus === 'completed') {
            // Update all pets in the order to 'adopted' status
            for (const petInfo of updatedOrder.pets) {
                if (petInfo.PetId) {
                    await Pet.findByIdAndUpdate(petInfo.PetId._id, { 
                        status: 'adopted',
                        adoptionDate: new Date(),
                        adoptedBy: updatedOrder.userId
                    });
                }
            }
        } else if (adoptionStatus === 'rejected' || adoptionStatus === 'cancelled') {
            // If the order is rejected or cancelled, ensure pets are available for adoption
            for (const petInfo of updatedOrder.pets) {
                if (petInfo.PetId) {
                    await Pet.findByIdAndUpdate(petInfo.PetId._id, { 
                        status: 'available',
                        adoptionDate: null,
                        adoptedBy: null
                    });
                }
            }
        }

        res.status(200).json({
            success: true,
            message: hasAdoptedPets ? "Application automatically rejected due to already adopted pets." : "Adoption status updated successfully!",
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

export const getAdoptedPetsHistory = async (req, res) => {
    try {
        const adoptedPets = await Pet.find({ status: 'adopted' })
            .populate('adoptedBy', 'userName email')
            .sort({ adoptionDate: -1 });

        res.status(200).json({
            success: true,
            data: adoptedPets,
            message: adoptedPets.length ? "Adopted pets history found." : "No adopted pets history found."
        });
    } catch (e) {
        console.error("Error fetching adopted pets history:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred!",
        });
    }
};