import mongoose from "mongoose";

const AdoptionOrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Store pets being applied for
    pets: [{
        PetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }, 
        name: String, 
        image: String 
    }],
    // Adopter's contact/address info
    adopterInfo: {
        addressId: { type: mongoose.Schema.Types.ObjectId }, 
        fullName: String, 
        email: String,  
        phone: String,
        address: String,
        city: String,
        pincode: String,
        notes: String, 
    },
    // Details from the adoption application form
    applicationDetails: {
        livingSituation: String,
        hasFence: String,
        petExperience: String,
        vetNamePhone: String,
        reasonForAdoption: String,
    },
    // Status fields
    adoptionStatus: { type: String, default: 'pending_review', required: true },
    adoptionFee: { type: Number, default: 0 }, 
    paymentStatus: { type: String, default: 'pending', required: true }, 
    paymentMethod: { type: String }, 
    paymentId: { type: String }, 
    // Timestamps
    adoptionDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

const 
AdoptionOrder = mongoose.model("AdoptionOrder", AdoptionOrderSchema);
export default AdoptionOrder;