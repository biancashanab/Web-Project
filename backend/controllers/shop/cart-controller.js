import Cart from "../../models/Cart.js";
import Pet from "../../models/Pet.js";

export const addToCart = async (req, res) => {
  try 
  {
    const { userId, petId} = req.body;

    if (!userId || !petId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", });
  }
};

export const fetchCartItems = async (req, res) => {
  try 
  {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is manadatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.petId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          userId,
          items: [],
        },
      });
    }

    const validItems = cart.items.filter(
      (petItem) => petItem.petId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      petId: item.petId._id,
      image: item.petId.image,
      title: item.petId.title,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const updateCartItemQty = async (req, res) => {
  try 
  {
    const { userId, petId } = req.body;

    if (!userId || !petId) {
      return res.status(400).json({ success: false, message: "Invalid data provided!", });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!", });
    }

    const findCurrentPetIndex = cart.items.findIndex(
      (item) => item.petId.toString() === petId
    );

    if (findCurrentPetIndex === -1) {
      return res.status(404).json({ success: false, message: "Cart item not present !",});
    }

    await cart.save();

    await cart.populate({
      path: "items.petId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      petId: item.petId ? item.petId._id : null,
      image: item.petId ? item.petId.image : null,
      title: item.petId ? item.petId.title : "Product not found",
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try 
  {
    const { userId, petId } = req.params;
    if (!userId || !petId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.petId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.petId._id.toString() !== petId
    );

    await cart.save();

    await cart.populate({
      path: "items.petId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      petId: item.petId ? item.petId._id : null,
      image: item.petId ? item.petId.image : null,
      title: item.petId ? item.petId.title : "Product not found",
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};