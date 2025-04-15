import AdoptionOrder from "../../models/AdoptionOrder.js";
import User from "../../models/User.js"; 

export const submitAdoptionApplication = async (req, res) => {
    try {
        const {
            userId,
            pets,
            addressInfo,
            applicationDetails,
            totalAmount,
            paymentMethod
        } = req.body;

        if (!userId || !pets || pets.length === 0 || !addressInfo || !applicationDetails) {
            return res.status(400).json({ success: false, message: "Missing required application data." });
        }

        const user = await User.findById(userId).select('userName email');
        if (!user) {
             return res.status(404).json({ success: false, message: "User not found." });
        }

        const newApplication = new AdoptionOrder({
            userId,
            pets,
            adopterInfo: {
                ...addressInfo,
                fullName: user.userName,
                email: user.email,
            },
            applicationDetails,
            adoptionStatus: 'pending_review',
            adoptionFee: totalAmount || 0,
            paymentStatus: totalAmount > 0 ? 'pending' : 'not_applicable',
            paymentMethod: paymentMethod || null,
            adoptionDate: new Date(),
            lastUpdated: new Date(),
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: "Adoption application submitted successfully.",
            data: newApplication,
        });

    } catch (e) {
        console.error("Error submitting adoption application:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred while submitting application.",
        });
    }
};

export const getAllAdoptionOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId || userId === 'undefined') {
            return res.status(400).json({ success: false, message: "Valid User ID is required." });
        }

        const orders = await AdoptionOrder.find({ userId }).sort({ adoptionDate: -1 });

        return res.status(200).json({
            success: true,
            data: orders,
            message: orders.length ? "Orders found" : "No adoption history found."
        });
    } catch (e) {
        console.error("Error fetching user adoption orders:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred fetching adoption history.",
        });
    }
};

export const getAdoptionOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === 'undefined') {
             return res.status(400).json({ success: false, message: "Valid Order ID is required." });
        }

        const order = await AdoptionOrder.findById(id).populate('userId', 'userName email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Adoption record not found!",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (e) {
        console.error("Error fetching adoption order details:", e);
        res.status(500).json({
            success: false,
            message: "Server error occurred fetching details.",
        });
    }
};

export const getOrderHistory = async (req, res) => {
  try 
  {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching order history" });
  }
};