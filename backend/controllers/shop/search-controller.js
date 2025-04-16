import Pet from "../../models/Pet.js";

export const searchPets = async (req, res) => {
  try 
  {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in string format",
      });
    }

    // Create a case-insensitive regex pattern
    const searchPattern = new RegExp(keyword, "i");

    // Create a more comprehensive search query
    const searchQuery = {
      $or: [
        { title: searchPattern },
        { name: searchPattern },
        { description: searchPattern },
        { species: searchPattern },
        { breed: searchPattern },
        { colour: searchPattern },
        { size: searchPattern }
      ],
      $and: [
        {
          $or: [
            { status: 'available' },
            { status: { $exists: false } }
          ]
        }
      ]
    };

    // Find pets matching the search criteria
    const searchResults = await Pet.find(searchQuery)
      .sort({ createdAt: -1 }); // Sort by newest first

      
    res.status(200).json({ 
      success: true, 
      data: searchResults,
      count: searchResults.length
    });
  } 
  catch (error) 
  {
    console.error("Search error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error searching pets",
      error: error.message 
    });
  }
};

