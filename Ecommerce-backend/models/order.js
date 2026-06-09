import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        
        },
        phone: {
            type: String,
            required: true
        },
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: "pending"
        },
        total: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        
        products: [
            {
                productId: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                labelledPrice: {
                    type: Number,
                    required: false
                },
                image: {
                    type: String,
                    required: false,
                    default: "/images/default.product.01.png"
                },
                
                quantity: {
                    type: Number,
                    required: true
                }
            } 
        ]
    },
    //{ timestamps: true } // Optional: Order එකක් සාදපු සහ වෙනස් කරපු වෙලාවන් (createdAt, updatedAt) auto සටහන් වෙන්න මේක එකතු කරගන්න පුළුවන්.
);

const Order = mongoose.model("Order", orderSchema);
export default Order;