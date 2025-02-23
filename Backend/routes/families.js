var express = require('express');
var router = express.Router();
var ApprovedFamily = require('../Schemas/ApprovedFamiliesSchema');
var mongoose = require('mongoose');

router.post('/add', (req, res) => {
    console.log(req.body);
    var data = new ApprovedFamily(req.body);
    data.save();
    console.log("Completed");
});

//View all families in the area
router.get('/view', (req, res) => {
    ApprovedFamily.find((err, doc) => {
        res.send(doc)
    })
});

router.get('/update', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await ApprovedFamily.countDocuments(filter); // 0

        let doc = await ApprovedFamily.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});

router.get('/viewbyid/:id', (req, res) => {
    ApprovedFamily.find({ Identity_number: req.params.id }, (err, doc) => {

        if (!err) {
            res.send(doc);
            console.log(doc);
        }
        else {
            console.log('Error in Retriving Family :' + JSON.stringify(err, undefined, 2));

        }
    });

});

module.exports = router;