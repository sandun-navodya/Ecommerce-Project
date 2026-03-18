import product from "../models/products.js";
import { isAdmin } from "./userController.js";


export async function createProduct(req, res) {

    if (!isAdmin(req.user)) {
        res.status(403).json({
            message: "Only admins can create products"
        })
        return
    }



    try {
        const existingProduct = await product.findOne({
            productId: req.body.productId
        })

        if (existingProduct != null) {
            res.status(400).json({
                message: "Product with the same productId already exists"
            })
            return
        }

    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while creating the product",
            error: err.message
        })
    }


    const newProduct = new product({
        productId: req.body.productId,
        name: req.body.name,
        altNames: req.body.altNames,
        price: req.body.price,
        labelledPrice: req.body.labelledPrice,
        description: req.body.description,
        Images: req.body.Images,
        brand: req.body.brand,
        model: req.body.model,
        category: req.body.category,
        stock: req.body.stock

    })

    await newProduct.save()

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    })

}

export async function getProducts(req, res) {
    {
        try {
            
            if (isAdmin(req.user)) {
                const products = await product.find()
                res.json(products)
            }
            else{

                const product = await product.find({ isAvailable: true })
                res.json(product)
            }
            
        }
        catch (err) {
            res.status(500).json({
                message: "An error occurred while fetching products",
                error: err.message
            })
        }
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req.user)) {
        res.status(403).json({
            message: "Only admins can delete products"
        })
        return
    }
    try {
        const deletedProduct = await product.findOneAndDelete({
            productId: req.params.productId
        });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            product: deletedProduct
        });
    }
    catch (err) {
        res.status(500).json({
            message: "An error occurred while deleting the product",
            error: err.message
        })
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req.user)) {
        res.status(403).json({
            message: "Only admins can update products"
        })
        return
    }   
    try {
       await product.findOneAndUpdate(
            {
                productId: req.params.productId     
            },
            {
                name: req.body.name,
                altNames: req.body.altNames,
                price: req.body.price,
                labelledPrice: req.body.labelledPrice,
                description: req.body.description,
                Images: req.body.Images,
                brand: req.body.brand,
                model: req.body.model,
                category: req.body.category,
                stock: req.body.stock,
                isAvailable: req.body.isAvailable
            }
       )
       res.json({
        message: "Product updated successfully"
       })
        
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while updating the product",
            error: err.message
        })
    }       
}

export async function getProductById(req, res) {
    try {
        const productId = req.params.productId
        const productData = await product.findOne({ productId: productId })

        if (!productData) {
            return res.status(404).json({
                message: "Product not found"
            })
        }   
        if (productData.isAvailable){
            res.json(productData)
        }   
        else {

            if (isAdmin(req.user)) {
                res.json(productData)
                return
            }
            else{
                res.status(403).json({
                    message: "You are not authorized to view this product"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred while fetching the product",
            error: err.message
        })
    }   
}