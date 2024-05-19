
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Products = require('../models/Products');
require('dotenv').config()

exports.addProduct=async (req,res)=>{
    try {
        const { image, stock, price } = req.body;
    
        if (!image || stock == null || price == null) {
          return res.status(400).json({ message: 'Image, stock, and price are required' });
        }
    
        const product = new Product({
          image,
          stock,
          price,
          is_active: true,
        });
    
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
}

exports.listProduct=async(req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
    
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json(product);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
}

