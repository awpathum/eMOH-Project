var express = require('express');
var router = express.Router();
var Mother = require('../Schemas/MotherSchema');
var mongoose = require('mongoose');
var motherbabyjoined = require('../Schemas/MotherBabyJoined');
var motherfordoc = require('../Schemas/motherfordoc');


//Add Details to MotherBabyJoinedTable
router.post('/register', (req, res) => { 
    console.log(req.body);
    var data = new Mother(req.body);
    data.save();
    console.log("Completed");
});


//Update details in motherbabyjoined table
router.get('/update/motherbabyjoined', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await motherbabyjoined.countDocuments(filter); // 0

        let doc = await motherbabyjoined.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true 
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});

//Update details in mother table
router.get('/update/mother', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await Mother.countDocuments(filter); // 0

        let doc = await Mother.findOneAndUpdate(filter, update, {
            new: true,
            upsert: false 
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});

//Update details in motherfordoc table
router.get('/update/motherfordoc', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await motherfordoc.countDocuments(filter); // 0

        let doc = await motherfordoc.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true 
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});

//View all the mothers in the area by viewing the whole motherbabyjoined table
router.get('/view', (req, res) => {
    motherbabyjoined.find((err, doc) => {
        res.send(doc)
    })
});

//View the mothertable by motherID
router.get('/viewbyid/:id', (req, res) => {
    Mother.find({ mother_id: req.params.id }, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(doc);
        }
        else {
            console.log('Error in Retriving Mother Details :' + JSON.stringify(err, undefined, 2));

        }
    });

});

//View the motherbabyjoined table by motherID
router.get('/viewmotherbabyjoinedtable/viewbyid/:id', (req, res) => {
    motherbabyjoined.find({ mother_id: req.params.id }, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(doc);
        }
        else {
            console.log('Error in Retriving MotherBabyJoined Table Details :' + JSON.stringify(err, undefined, 2));

        }
    });

});

//View the motherfordoc table by motherID
router.get('/motherfordoc/viewbyid/:id', (req, res) => {
    motherfordoc.find({ mother_id: req.params.id }, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(doc);
        }
        else {
            console.log('Error in Retriving MotherForDoc Table Details :' + JSON.stringify(err, undefined, 2));

        }
    });

});


module.exports = router;