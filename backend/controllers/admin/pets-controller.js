import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Pet from "../../models/Pet.js"; 

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
  try {
    const {
      image,
      title,
      age,
      description,
      species,
      breed,
    } = req.body;

    const newlyCreatedPet = new Pet({
      image,
      title,
      age,
      description,
      species,
      breed,
    });

    await newlyCreatedPet.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedPet,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const fetchAllPets = async (req, res) => {
  try {
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
    const { id } = req.params;
    const {
      image,
      title,
      age,
      description,
      species,
      breed,
    } = req.body;

    let findPet = await Pet.findById(id);
    if (!findPet)
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });

    findPet.title = title || findPet.title;
    findPet.description = description || findPet.description;
    findPet.species = species || findPet.species;
    findPet.breed = breed || findPet.breed;
    findPet.image = image || findPet.image;
    findPet.age = age || findPet.age;

    await findPet.save();
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
