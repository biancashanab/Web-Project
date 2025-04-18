import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Pet from "../../models/Pet.js";
import mongoose from "mongoose";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

export const addPet = async (req, res) => {
  try 
  {
    const { image, title, name, age, description, species, breed, colour, size, gender } = req.body;

    const newlyCreatedPet = new Pet({
      image,
      title,
      name,
      age,
      species,
      breed,
      size,
      colour,
      description,
      gender,
      status: 'available'
    });

    await newlyCreatedPet.save(); //salvez in baza de date

    res.status(201).json({
      success: true,
      data: newlyCreatedPet,
    });
  } 
  catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const fetchAllPets = async (req, res) => {
  try {
    // Fetch all pets for the admin panel
    const listOfPets = await Pet.find({});
    res.status(200).json({
      success: true,
      data: listOfPets,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const editPet = async (req, res) => {
  try {
    const { id } = req.params;    //id-ul pet-ului pe care vreau sa il editez
    const { image, title, name, age, description, species, breed, colour, size, gender } = req.body;

    let findPet = await Pet.findById(id);
    if (!findPet)
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });

    // daca gasesc pet-ul, ii schimb atributele cu cele noi
    findPet.image = image || findPet.image;
    findPet.title = title || findPet.title;
    findPet.name = name || findPet.name;
    findPet.description = description || findPet.description;
    findPet.species = species || findPet.species;
    findPet.breed = breed || findPet.breed;
    findPet.colour = colour || findPet.colour;
    findPet.size = size || findPet.size;
    findPet.age = age || findPet.age;
    findPet.gender = gender || findPet.gender;

    await findPet.save();   //salvez modificarile in baza de date
    
    res.status(200).json({
      success: true,
      data: findPet,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByIdAndDelete(id);

    if (!pet)
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const getPetHistory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the pet and populate the adoptedBy field with user details
    const pet = await Pet.findById(id).populate('adoptedBy', 'userName email');
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }
    
    // Get adoption orders related to this pet
    const AdoptionOrder = mongoose.model('AdoptionOrder');
    const adoptionOrders = await AdoptionOrder.find({
      'pets.PetId': id
    }).sort({ createdAt: -1 });
    
    // Format the response
    const petHistory = {
      pet: {
        _id: pet._id,
        name: pet.name,
        image: pet.image,
        species: pet.species,
        breed: pet.breed,
        status: pet.status,
        adoptionDate: pet.adoptionDate,
        adoptedBy: pet.adoptedBy
      },
      adoptionHistory: adoptionOrders.map(order => ({
        orderId: order._id,
        status: order.adoptionStatus,
        adopterInfo: order.adopterInfo,
        adoptionDate: order.adoptionDate,
        lastUpdated: order.lastUpdated
      }))
    };
    
    res.status(200).json({
      success: true,
      data: petHistory,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching pet history",
    });
  }
};

export const updatePetsStatus = async (req, res) => {
  try {
    const result = await Pet.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'available' } }
    );

    res.status(200).json({
      success: true,
      message: `Updated ${result.modifiedCount} pets`,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating pets status',
      error: error.message
    });
  }
};
