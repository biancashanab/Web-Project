import Cart from "../../models/Cart.js";
import Pet from "../../models/Pet.js";

export const addToCart = async (req, res) => {
  try 
  {

    console.log(req.body);
    const { userId, PetId} = req.body;

    if (!userId || !PetId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const pet = await Pet.findById(PetId);

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
    cart.items.push({ PetId });
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
      path: "items.PetId",
      select: "image title",
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
      (petItem) => petItem.PetId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      PetId: item.PetId._id,
      image: item.PetId.image,
      title: item.PetId.title,
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
    const { userId, PetId } = req.body;

    if (!userId || !PetId) {
      return res.status(400).json({ success: false, message: "Invalid data provided!", });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found!", });
    }

    const findCurrentPetIndex = cart.items.findIndex(
      (item) => item.PetId.toString() === PetId
    );

    if (findCurrentPetIndex === -1) {
      return res.status(404).json({ success: false, message: "Cart item not present !",});
    }

    await cart.save();

    await cart.populate({
      path: "items.PetId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      PetId: item.PetId ? item.PetId._id : null,
      image: item.PetId ? item.PetId.image : null,
      title: item.PetId ? item.PetId.title : "Product not found",
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
    const { userId, PetId } = req.params;
    if (!userId || !PetId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.PetId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.PetId._id.toString() !== PetId
    );

    await cart.save();

    await cart.populate({
      path: "items.PetId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      PetId: item.PetId ? item.PetId._id : null,
      image: item.PetId ? item.PetId.image : null,
      title: item.PetId ? item.PetId.title : "Product not found",
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