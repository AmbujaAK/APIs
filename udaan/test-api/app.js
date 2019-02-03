const Joi = require('joi');
const express = require('express');
const app = express();

/* to use json */
app.use(express.json());
const screens = require('./screens.js');

// to get available seats.
var getAvailableSeats = function(row) {    
    if(row == "A"){
        // total seats
        //console.log("-----TOTAL SEAT------");
        var seat_tot = screens[0].seats;
        seat_tot = JSON.stringify(seat_tot);
        seat_tot = JSON.parse(seat_tot);

        //console.log("Total seats :" + seat_tot.A);
        seat_tot = seat_tot.A; // array

        // reserved seats
        //console.log("-----RESERVED SEAT------");
        var seat_res = screens[0].reservedSeats.seats;
        seat_res = JSON.stringify(seat_res);
        seat_res = JSON.parse(seat_res);

        //console.log("Reserved seats :" + seat_res.A);
        seat_res = seat_res.A; // array
    }
    else if(row == "B"){
        // total seats
        //console.log("-----TOTAL SEAT------");
        var seat_tot = screens[0].seats;
        seat_tot = JSON.stringify(seat_tot);
        seat_tot = JSON.parse(seat_tot);
    
        //console.log("Total seats :" + seat_tot.B);
        seat_tot = seat_tot.B; // array
    
        // reserved seats
        //console.log("-----RESERVED SEAT------");
        var seat_res = screens[0].reservedSeats.seats;
        seat_res = JSON.stringify(seat_res);
        seat_res = JSON.parse(seat_res);
    
        //console.log("Reserved seats :" + seat_res.B);
        seat_res = seat_res.B; // array
        
    }
    else if(row == "C"){
        // total seats
        //console.log("-----TOTAL SEAT------");
        var seat_tot = screens[0].seats;
        seat_tot = JSON.stringify(seat_tot);
        seat_tot = JSON.parse(seat_tot);
    
        //console.log("Total seats :" + seat_tot.C);
        seat_tot = seat_tot.C; // array
    
        // reserved seats
        //console.log("-----RESERVED SEAT------");
        var seat_res = screens[0].reservedSeats.seats;
        seat_res = JSON.stringify(seat_res);
        seat_res = JSON.parse(seat_res);
    
        //console.log("Reserved seats :" + seat_res.C);
        seat_res = seat_res.C; // array
        
    }
    else{
        console.log('NO rows found !');
    }
    // available seats
    //console.log("-----AVAILABLE SEAT------");
    seat_tot = seat_tot.filter(v => !seat_res.includes(v));
    
    //console.log("Available : " + seat_tot);
    var seat_avail = seat_tot;
    return seat_avail;
}

// get request
app.get('/', (req, res) => {
    res.send('Home page for Ticket Booking system');
});

// retrive all the details about screen
app.get('/screens', (req, res) => {
    res.send(screens);
});

// show particular screen
app.get('/screens/:name', (req, res) => {
    const screen = screens.find(c => c.name === req.params.name);
    if(!screen) res.status(404).send('Given screen name is not available');
    res.send(screen);
});



/* 1. API to accept details of a movie screen */
app.post('/screens', (req, res) => {
    const { error } = validateData(res.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const screen = {
        name: req.body.name,
        seatInfo: req.body.seatInfo,
        seats: req.body.seats,
        reservedSeats : req.body.reservedSeats,
        availableSeats : req.body.availableSeats
    }
    screens.push(screen);
    res.send(screen);
});



/* 2. API to reserve tickets for given seats in a given screen. */
app.post('/screens/:name/reserve', (req, res) => {
    const { error } = validateData(res.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const reservedseats = {
        seats: req.body.seats
    }

    screens[0].reservedSeats = reservedseats;
    res.send(reservedseats);
});



/* 3. API to get the available seats for a given screen. */
app.get('/screens/:name/seats', (req, res) => {
    const status = req.query.status;

    if(status == 'unreserved'){
        //console.log('Unreserved seats');
        const seats = {}
        var len = 3;
        for(var i = 65; i < len+65; i++){
            var ch = String.fromCharCode(i);
            //console.log("Rows : " + ch);
            seat = getAvailableSeats(ch);
            seats[ch] = seat;
        }
        screens[0].availableSeats.seats = seats;
        res.send(screens[0].availableSeats);

    } else {
        //console.log('Reserved seats');
    }
});


// helper function to validate the data
function validateData(screen){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(screen, schema);
}

// connecting to server
const port = process.env.PORT || 9090 ;
app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
});
