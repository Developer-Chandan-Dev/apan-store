const Cart = require("../models/cart.models");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    if (!productId || !quantity) {
      return next(
        new ErrorResponse("Please provide product ID and quantity", 400)
      );
    }

    if (quantity < 1) {
      return next(new ErrorResponse("Quantity must be at least 1", 400));
    }

    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "cartItems.product",
      select: "name price category imageUrl",
    });

    if (!cart) {
      cart = new Cart({ user: req.user.id, cartItems: [] });
    }

    const existingItem = cart.cartItems.find(
      (item) => item.product?._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += parseInt(quantity, 10);
    } else {
      cart.cartItems.push({
        product: productId,
        quantity: parseInt(quantity, 10),
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return next(new ErrorResponse("Cart not found", 404));
    }

    const item = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
      await cart.save();
      return res
        .status(200)
        .json({ success: true, message: "Cart item updated" });
    }

    res.status(404).json({ success: false, message: "Item not found in cart" });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

const getCart = asyncHandler(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "cartItems.product", // Populate the `product` field inside `cartItems`
      select: "name price category imageUrl", // Spcifiy the fields you want from the Product model
    });
    console.log(cart);
    if (!cart) {
      return res.status(200).json({ success: true, cartItems: [] });
    }
    console.log(cart);

    res.status(200).json(cart.cartItems);
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal Server Error", 500));
  }
});

module.exports = { addToCart, removeFromCart, updateCartItem, getCart };
