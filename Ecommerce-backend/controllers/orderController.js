import Order from "../models/order.js";
import product from "../models/products.js"; 

export default async function createOrder(req, res) {
    const user = req.user;

    if (user == null) {
        return res.status(401).json({
            message: "You need to login to place an order"
        });
    }

    
    let orderId = "ORD0000001"; 

    const orderData = {
        orderId: orderId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        total: 0,
        products: [] 
    };

    
    if (req.body.firstName != null && req.body.firstName !== "") {
        orderData.firstName = req.body.firstName;
    }
    if (req.body.lastName != null && req.body.lastName !== "") {
        orderData.lastName = req.body.lastName;
    }
    if (req.body.phone != null && req.body.phone !== "") {
        orderData.phone = req.body.phone;
    }

    try {
       
        const lastOrder = await Order.findOne().sort({ date: -1 });

        if (lastOrder != null) {
            const lastOrderId = lastOrder.orderId;
            const lastOrderNumber = parseInt(lastOrderId.replace("ORD", ""), 10);
            const newOrderNumber = lastOrderNumber + 1;
            orderData.orderId = "ORD" + newOrderNumber.toString().padStart(7, "0");
        }

       
        for (let i = 0; i < req.body.products.length; i++) {
            const dbProduct = await product.findOne({ productId: req.body.products[i].productId });

            if (dbProduct == null || dbProduct.isAvailable === false || dbProduct.stock < req.body.products[i].quantity) {
                return res.status(404).json({
                    message: "Product with ID " + req.body.products[i].productId + " not found, unavailable or out of stock"
                });
            }

            
            orderData.products.push({
                productId: dbProduct.productId,
                name: dbProduct.name,
                price: dbProduct.price,
                labelledPrice: dbProduct.labelledPrice,
                image: dbProduct.Images && dbProduct.Images.length > 0 ? dbProduct.Images[0] : (dbProduct.image || null),
                quantity: req.body.products[i].quantity
            });

          
            orderData.total += dbProduct.price * req.body.products[i].quantity;

            
            dbProduct.stock -= req.body.products[i].quantity;
            await dbProduct.save();
        }

        
        const newOrder = new Order(orderData);
        await newOrder.save();

        res.status(201).json({
            message: "Order placed successfully",
            orderId: newOrder.orderId
        });
    }
    catch (error) {
        console.error("Error occurred while placing order:", error);
        res.status(500).json({
            message: "An error occurred while placing the order",
            error: error.message
        });
    }
}