const router= require('express').Router();
let Shoe = require('../models/shoe.model');
const stockxAPI = require('stockx-api');
const stockX = new stockxAPI();


router.route('/').get((req,res) =>{
    Shoe.find()
    .then(shoes => res.json(shoes))
    .catch(err=> res.status(400).json('Error: '+err));
});
router.route('/get/:username').get((req, res)=>{
    
    Shoe.find({username: req.params.username})
    .then(shoeData =>{
        for(i=0; i<shoeData.length; i++){
            console.log(shoeData[i]);
            
        }

    })
    .catch(err=> res.status(400).json('Error: '+err));

});
router.route('/:id').delete((req,res)=>{
    Shoe.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Shoe deleted.'))
    .catch(err => res.status(400).json('Error: '+ err));

});

router.route('/update/:id').post((req,res) =>{
    Shoe.findById(req.params.id)
        .then(shoe => {
            shoe.username= req.body.username;
            shoe.name = req.body.name;
            shoe.imgUrl = req.body.imgUrl;
            shoe.urlName = req.body.urlName;

            shoe.save()
            .then(()=> res.json('Shoe updated!'))
            .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

    router.route('/add').post((req,res)=>{
        const username = req.body.username;
        const name = req.body.name;
        const imgUrl = req.body.imgUrl;
        const urlName= req.body.urlName;
      
    
        const newShoe = new Shoe({
            username,
            name,
            imgUrl,
            urlName,
            

        });

        newShoe.save()
            .then(() => res.json('Shoe added!'))
            .catch(err => res.status(400).json('Error: '+err));
    });

    module.exports = router;