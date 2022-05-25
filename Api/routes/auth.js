const router = require('express').Router()

const dbClient = require('../db')


router.post('/account', async (req, res) => {
    // Update Loggedin User
})


router.post('/login', async (req, res) => {
    try{
        await dbClient.connect()
        const db = dbClient.db('simplebks')

        const collection = db.collection('sellers')

        const user = collection.findOne({"seller_id": req.body.username, "seller_zip_code_prefix": req.body.password})
        if (await user) {
            let user_data = await user
            res.status(200).json({user_data, "message": "Login successful"})
            
        }
        else {
            res.status(403).json("Wrong Username or Password! ")
        }
    } catch (err) {
        console.error(`we encountered ${err}`)
    }
});

module.exports = router