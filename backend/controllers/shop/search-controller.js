import Pet from "../../models/Pet.js";

export const searchPets = async (req, res) => {
  try 
  {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        succes: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { species: regEx },
        { breed: regEx },
      ],
    };

    const searchResults = await Pet.find(createSearchQuery);

    res.status(200).json({ success: true, data: searchResults, });
  } 
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ success: false, message: "Error",});
  }
};

