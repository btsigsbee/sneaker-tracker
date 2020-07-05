const router= require('express').Router();
let Shoe = require('../models/shoe.model');
const stockxAPI = require('stockx-api');
const stockX = new stockxAPI();

function getStockX(object){
    var urlP = 'https://stockx.com/';
    var Z= stockX.fetchProductDetails(urlP + Object.keys(object))
    .then(data =>{return data.variants.filter(function(x){
        return x.size == Object.values(object);
    });
})
    .catch(err => {return err});
    return Z;
}
 
router.route('/').get((req,res) =>{
    Shoe.find()
    .then(shoes => res.json(shoes))
    .catch(err=> res.status(400).json('Error: '+err));
});
router.route('/get/:username').get((req, res)=>{
    var obj =[];
    Shoe.find({username: req.params.username})
    .then(async shoeData =>{ 
        for( var i in shoeData){
            var myObj= {};
            
            var fixedDigit = parseFloat(shoeData[i].size);
            myObj[shoeData[i].urlName] = fixedDigit;
            
            await getStockX(myObj)
            .then(data => {
                data=data[0]
                data['name'] = shoeData[i].name;
                data['imgUrl'] = shoeData[i].imgUrl;
                data['_id'] = shoeData[i]._id;
                
                
                obj.push(data);
                       
})            
          } 
          res.json(obj)   
   
    })
     
    .catch(err=> res.status(400).json('Error: '+err));
    
});
router.route('/:id').delete((req,res, next)=>{
    Shoe.findByIdAndRemove(req.params.id, (error, data) =>{
        if (error){
            return next(error);
        }else{
            res.status(200).json('shoe deleted')
        }
    })})




router.route('/search/:q').get((req,res)=>{
    var results = [];
    stockX.searchProducts(req.params.q, {
        limit: 5
    })
    .then(data => res.json(data))
    .catch(err=> res.json(err));

    

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