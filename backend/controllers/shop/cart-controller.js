import Cart from "../../models/Cart.js";
import Pet from "../../models/Pet.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, PetId } = req.body;

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
        message: "Pet not found",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ PetId }] });
      await cart.save();
      await cart.populate({
        path: "items.PetId",
        select: "image title name",
      });
      const populatedItems = cart.items.map((item) => ({
          PetId: item.PetId._id,
          image: item.PetId.image,
          title: item.PetId.title || item.PetId.name || "N/A",
      }));
      return res.status(200).json({
          success: true,
          data: { ...cart._doc, items: populatedItems },
      });

    } else {
      const itemExists = cart.items.some(
        (item) => item.PetId.toString() === PetId
      );

      if (itemExists) {
        await cart.populate({
          path: "items.PetId",
          select: "image title name",
        });
         const populatedItems = cart.items.map((item) => ({
            PetId: item.PetId._id,
            image: item.PetId.image,
            title: item.PetId.title || item.PetId.name || "N/A",
        }));
        return res.status(200).json({
          success: true,
          message: "Pet is already in cart",
          data: { ...cart._doc, items: populatedItems },
        });
      } else {
        cart.items.push({ PetId });
        await cart.save();
        await cart.populate({
          path: "items.PetId",
          select: "image title name",
        });
        const populatedItems = cart.items.map((item) => ({
            PetId: item.PetId._id,
            image: item.PetId.image,
            title: item.PetId.title || item.PetId.name || "N/A",
        }));
        return res.status(200).json({
          success: true,
          data: { ...cart._doc, items: populatedItems },
        });
      }
    }
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server Error adding to cart" });
  }
};

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.PetId",
      select: "image title name",
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

    const validItems = cart.items.filter((petItem) => petItem.PetId);

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populatedCartItems = validItems.map((item) => ({
      PetId: item.PetId._id,
      image: item.PetId.image,
      title: item.PetId.name || item.PetId.title || "Pet",
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    console.error("Error in fetchCartItems:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching cart items",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, PetId } = req.params;
    if (!userId || !PetId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided (userId or PetId missing)!",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.PetId.toString() !== PetId
    );

    if (cart.items.length === initialLength) {
       return res.status(404).json({
           success: false,
           message: "Pet not found in cart!",
       });
    }

    await cart.save();
    await cart.populate({
      path: "items.PetId",
      select: "image title name",
    });

    const populatedCartItems = cart.items.map((item) => ({
      PetId: item.PetId ? item.PetId._id : null,
      image: item.PetId ? item.PetId.image : null,
      title: item.PetId ? (item.PetId.name || item.PetId.title || "Pet") : "Data unavailable",
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populatedCartItems,
      },
    });
  } catch (error) {
    console.error("Error in deleteCartItem:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting cart item",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(`Backend clearCart: Attempting for userId: ${userId}`); // Log entry

    if (!userId || userId === 'undefined') {
       console.error("Backend clearCart Error: Invalid User ID received:", userId); // Log specific validation failure
       return res.status(400).json({ success: false, message: "Valid User ID is required!" });
    }

    const cartUpdateResult = await Cart.updateOne(
      { userId: userId },
      { $set: { items: [] } }
    );
    console.log(`Backend clearCart: Update result for userId ${userId}:`, cartUpdateResult); // Log DB result
    if (cartUpdateResult.matchedCount === 0) {
         return res.status(200).json({
            success: true,
            message: "Cart not found, considered clear.",
            data: { userId, items: [], _id: null },
        });
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: { userId, items: [], _id: cartUpdateResult.upsertedId || null },
    });
  } catch (error) {
    console.error(`Backend clearCart EXCEPTION for userId ${req.body?.userId}:`, error); 
    res.status(500).json({
      success: false,
      message: "Server error clearing cart",
    });
  }
};