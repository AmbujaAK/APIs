const screens = [
    {
        name: "screen_1",
        seatInfo: {
            "A" : {
                "numberOfSeats" : 10,
            },
            "B" : {
                "numberOfSeats" : 15,
            },
            "C" : {
                "numberOfSeats" : 20,
            }
        },
        seats: {
            "A" : [0,1,2,3,4,5,6,7,8,9],
            "B" : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],
            "C" : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
        },
        reservedSeats: {
            seats: {
                "A" : [],
                "B" : [],
                "C" : []
            }
        },
        availableSeats: {
            seats: {
                "A" : [],
                "B" : [],
                "C" : []
            },
        }
    }
];

// to return screen object
module.exports = screens;