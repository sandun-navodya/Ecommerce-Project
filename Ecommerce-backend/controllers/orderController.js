import Order from "../models/order.js";
import product from "../models/products.js";


export default async function createOrder(req, res) {
    const user = req.user;

    if (!user) {
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

    
    if (req.body.firstName) orderData.firstName = req.body.firstName;
    if (req.body.lastName) orderData.lastName = req.body.lastName;
    if (req.body.phone) orderData.phone = req.body.phone;

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

            if (!dbProduct || dbProduct.isAvailable === false || dbProduct.stock < req.body.products[i].quantity) {
                return res.status(404).json({
                    message: `Product ${req.body.products[i].productId} not found, unavailable or out of stock`
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
    } catch (error) {
        console.error("Error occurred while placing order:", error);
        res.status(500).json({
            message: "An error occurred while placing the order",
            error: error.message
        });
    }
}


export async function getOrders(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "You need to login to view your orders"
            });
        }

        
        const pageSize = parseInt(req.params.pageSize, 10) || 10;
        const pageNumber = parseInt(req.params.pageNumber, 10) || 1;

        if (pageSize <= 0 || pageNumber <= 0 || pageSize > 100) {
            return res.status(400).json({
                message: "Invalid page size or page number"
            });
        }

        let orderCount;
        let orders;

        
        if (req.user.isAdmin || req.user.isadmin) {
            orderCount = await Order.countDocuments();
            orders = await Order.find()
                .sort({ date: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);
        } 
       
        else {
            orderCount = await Order.countDocuments({ email: req.user.email });
            orders = await Order.find({ email: req.user.email })
                .sort({ date: -1 })
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);
        }

        const totalPages = Math.ceil(orderCount / pageSize);

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders: orders,
            totalPages: totalPages,
            orderCount: orderCount
        });

    } catch (error) {
        console.error("Error occurred while fetching orders:", error);
        res.status(500).json({
            message: "An error occurred while fetching orders",
            error: error.message
        });
    }
}