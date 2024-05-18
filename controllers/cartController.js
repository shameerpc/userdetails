const Cart=require('../models/Cart')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

exports.addCart=async (req,res)=>{
    try {
        const { items, userId } = req.body;
        
        if (!items || !Array.isArray(items) || !userId) {
          return res.status(400).json({ message: 'Invalid input data' });
        }
        
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });
        if (!cart) {
          cart = new Cart({ user: userId, items: [] });
        }
        
        items.forEach(item => {
          const productIndex = cart.items.findIndex(p => p.product.toString() === item.product);
          if (productIndex > -1) {
            cart.items[productIndex].quantity += item.quantity;
          } else {
            cart.items.push({ product: item.product, quantity: item.quantity });
          }
        });
        
        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

}

exports.listCart=async(req,res)=>{
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) }).populate('items.product');
        
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        
        res.status(200).json(cart);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
}

exports.updateCart=async (req,res)=>{
    try {
        const userId = req.params.userId;
        const { items } = req.body;
        
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        
        items.forEach(item => {
          const productIndex = cart.items.findIndex(p => p.product.toString() === item.product);
          if (productIndex > -1) {
            cart.items[productIndex].quantity = item.quantity;
          } else {
            cart.items.push({ product: item.product, quantity: item.quantity });
          }
        });
        
        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }

}


exports.deleteCart=async (req,res)=>{
    try {
        const userId = req.params.userId;
        const { productId } = req.body;
    
        let cart = await Cart.findOne({ user: mongoose.Types.ObjectId(userId) });
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        
        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
}