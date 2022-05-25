const router = require('express').Router()

const dbClient = require('../db')

// Fetch Order Items
router.get('/', async (req, res) => {

    const {sort_by = 'shipping_limit_date', limit =20 , offset = 2} = req.query

    var mysort = sort_by == 'shipping_limit_date' ? { "shipping_limit_date": 1} : { "price": 1}


    try {
        await dbClient.connect()
        const db = dbClient.db('simplebks')

        const collection = db.collection('order_items')
        
        const cursorFind = collection
        .aggregate([
            { $lookup:
               {
                 from: 'products',
                 localField: 'product_id',
                 foreignField: 'product_id',
                 as: 'product_category'
               },
             },
             {
                $match: {
                    'seller_id': req.headers.auth_user_id, 
                }
            },
            {
                $unwind: '$product_category'
            },
            { $sort: mysort},
            { $limit: limit},
            { $skip: offset},
            {
                "$project": {
                    "order_item_id" : "$order_id",
                    product_id: 1,
                    price: 1,
                    "date": "$shipping_limit_date",
                    product_category: "$product_category.product_category_name",
                }
            }
            ])

        const data = await cursorFind.toArray();

        let total = data.length

        res.status(200).json({data, limit, total, offset })

    } catch (err) {
        console.error(`we encountered ${err}`);
    }finally {
        dbClient.close();
    }
})


// Update Order Items By Id
router.patch('/:id', async (req, res) => {

    const {id} = req.params
    // res.send(req.body)

    try {

        await dbClient.connect()
        const db = dbClient.db('simplebks')

        const collection = db.collection('order_items')

        const cursorUpdate = await collection.updateOne(
            { "order_id": id },
            { "$set": { "price": req.body.price } }
        );
  
        res.status(200).json("Record Updated Successfully!")
    } catch (err) {
        console.error(`we encountered ${err}`)
    }finally{
        dbClient.close()
    }
    
})


// Delete Order Items By Id
router.delete('/:id', async (req, res) => {
    const {id} = req.params

    try {

        await dbClient.connect()
        const db = dbClient.db('simplebks')
        const collection = db.collection('order_items')
        await collection.findOneAndDelete({"order_id": id});

        res.status(200).json(`Operation succesfful!`)
    } catch (error) {
        
    }finally {
        dbClient.close();
    }
})


module.exports = router