import Product from "../models/productModel.js";
import mongoose from "mongoose";

export const getProducts = async (req, res ) => {
    try{
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    }catch(error){
        res.status(500).json({success: false, message: "server error"});
    }
}

export const updateProducts =  async (req, res ) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "invalid id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch(error){
        res.status(500).json({ success: false, message: "something wrong"});
    }
}

export const postProducts = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image)
        return res.status(400).json({success:false, message: "Please provide all fields" });

   

    try{
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }catch(error){
        console.error("Error in Creating product: ", error.message);
        res.status(500).json({success: false, message: "Something went wrong"});
    }

}

export const deleteProducts =  async (req, res ) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Deleted" });
    }catch(error){
        res.status(404).json({success: false, message: "something wrong"});
    }
}