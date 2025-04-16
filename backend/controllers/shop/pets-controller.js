import Pet from "../../models/Pet.js";

export const getFilteredPets = async (req, res) => {
  try {
    const { breed = "", species = "", size = "", colours = "", age = "", sortBy = "age-lowtohigh" } = req.query;

    const query = {};

    // Show pets that are either available or don't have a status set
    query.$or = [
      { status: 'available' },
      { status: { $exists: false } }
    ];

    if (breed) {
      const breedArray = breed.split(",");
      if (breedArray.length) {
        query.breed = { $in: breedArray };
      }
    }

    if (species) {
      const speciesArray = species.split(",");
      if (speciesArray.length) {
        query.species = { $in: speciesArray };
      }
    }

    if (size) {
      const sizeArray = size.split(",");
      if (sizeArray.length) {
        query.size = { $in: sizeArray };
      }
    }

    if (colours) {
      const coloursArray = colours.split(",");
      if (coloursArray.length) {
        query.colour = { $in: coloursArray };
        console.log("coloursArray", coloursArray);
      }
    }

    if (age) {
      const ageArray = age.split(",");
      const ageArrayInt = [];
      if (ageArray.length) {
        for (let i = 0; i < ageArray.length; i++) {
          if (ageArray[i] === "puppy") {
            ageArrayInt.push(0, 1, 2, 3);
          } else if (ageArray[i] === "adult") {
            ageArrayInt.push(4, 5, 6, 7);
          } else if (ageArray[i] === "senior") {
            ageArrayInt.push(8, 9, 10, 11, 12, 13, 14, 15);
          }
        }
        query.age = { $in: ageArrayInt };
      }
    }

    // Setează sortarea
    let sort = {};
    switch (sortBy) {
      case "age-lowtohigh":
        sort.age = 1;
        break;
      case "age-hightolow":
        sort.age = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.age = 1;
        break;
    }

    // Găsește animalele care respectă toate condițiile
    const pets = await Pet.find(query).sort(sort);

    res.status(200).json({ success: true, data: pets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

export const getPetDetails = async (req, res) => {
  try 
  {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    if (!pet)
      return res.status(404).json({ success: false, message: "Pet not found!",});

    res.status(200).json({ success: true, data: pet, });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured", });
  }
};