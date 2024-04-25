let midtransClient = require('midtrans-client');
let {User} = require('../models');

module.exports = class PaymentController{
    static async getMidtransToken(req, res, next){
        let userId = req.user.id    
        try {
            console.log(process.env.MIDTRANS_SERVER_KEY, 'ini server');
            let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            })
            let parameter = {
                "transaction_details": {
                    "order_id": "Animes_by_bintang" + Math.random(),
                    "gross_amount": 1000000
                },
                "customers_details" : {
                    "first_name": req.user.fullName,
                    "last_name": "-",
                    "email": req.user.email,
                },
                "item_details": [
                    {
                        "id": "PREMIUM_SUBSCRIPTION",
                        "name" : "PREMIUM SUBSCRIPTION",
                        "quantity" : 1,
                        "price": 1000000
                    }
                ]
            };


            let response = await snap.createTransaction(parameter)

            res.json(response)
        } catch (error) {
            next(error)
        } 
    }
    
    static async updateSucces(req, res, next){
        let id = req.user.id
        try {
            const data = await User.update({
                status: 'Premium'
            },{
                where: {
                    id: req.user.id
                }
            })
            if (data) {
                res.status(200).json(`User with id ${id} is Premium`)
            }
        } catch (error) {
            console.log(error);
        }
    }
}

