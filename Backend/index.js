var ObjectId = require('mongoose').Types.ObjectId;
var express = require('express');
var app = express();
var connection = require('./connection');
var mongoose = require('mongoose');
var ApprovedFamily = require('./Schemas/ApprovedFamiliesSchema');
var Mother = require('./Schemas/MotherSchema');
var Mother_baby = require('./Schemas/MotherBabyJoined');
var Notification = require('./Schemas/NotificationSchema');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.post('/', function (req, res) {

    var userlogindetails = req.body;

    var password = req.body.password;
    ApprovedFamily.find({ username: req.body.username }, (err, docs) => {
        if (!err) {
            var flag = 0;
            docs.forEach((key) => {
                console.log(key.username);
                if (password == key.password) {
                    res.send("Welcome");
                    flag = 1;
                }
            });
            if (flag == 0) res.send("Login Error");

        } else {
            res.send(JSON.stringify(err, undefined, 2));
        }

    });

});



app.post('/insert', (req, res) => {
    console.log(req.body);
    var data = new ApprovedFamily(req.body);
    data.save();
    console.log("Completed");
});


app.get('/insert', async (req, res) => {

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
app.get('/insert_baby', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await Baby.countDocuments(filter); // 0

        let doc = await Baby.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});
app.get('/insert_motherbaby', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await MotherBabyJoined.countDocuments(filter); // 0

        let doc = await MotherBabyJoined.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});
app.get('/insert_mother', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await MotherSchema.countDocuments(filter); // 0

        let doc = await MotherSchema.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});
app.get('/insert_weightheight', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await WeightHeight.countDocuments(filter); // 0

        let doc = await WeightHeight.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});


app.post('/insertmother', (req, res) => {
    console.log(req.body);
    var data = new Mother(req.body);
    data.save();
    console.log("Completed");
});

app.post('/insertmotherandbaby', (req, res) => {
    console.log(req.body);
    var data = new Mother_baby(req.body);
    data.save(); ++
        console.log("Completed");
});

app.post('/', (req, res) => {
    console.log(req.body);
    var data = new ApprovedFamily(req.body);
    data.save();
    console.log("Completed");
});

app.get('/appfam', (req, res) => {
    ApprovedFamily.find((err, doc) => {
        res.send(doc)
    })
});

/*app.post('/nofi', (req, res) => {
    console.log(req.body);
    var data = new Notification(req.body);
    data.save();
    console.log("Completed");
});*/
app.post('/nofi', async (req, res) => {

    try {
        const filter = req.query;
        const update = req.body;

        mongoose.set('useFindAndModify', false);
        await Notification.countDocuments(filter); // 0

        let doc = await Notification.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        console.log(doc);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }

});

//approved family search
app.get('/family/:id', (req, res) => {
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

app.listen(3000);