import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            ubnique: true
        },

        name: {
            type: String,
            required: true
        },

        altNames: {
            type: [String],
            required: false,
            default: []
        },

        price: {
            type: Number,
            required: true
        },

        labelledPrice: {
            type: Number,
            required: false
        },

        description: {
            type: String,
            required: false
        },

        Images: {
            type: [String],
            required: false,
            default: [
                "/images/default.product.01.png",
                "/images/default.product.02.png",
            ]

        },

        brand: {
            type: String,
            required: false,
        },

        model: {
            type: String,
            required: false,
        },

        category: {
            type: String,
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        }



    }
)

 const Product=mongoose.model('Product',productSchema);

 export default Product