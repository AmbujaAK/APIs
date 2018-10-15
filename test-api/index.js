const Joi = require('joi');
const express = require('express');
const app = express();

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'},
    {id:5, name: 'course5'},
];

/* to use json */
app.use(express.json());

// get request
app.get('/', (req, res) => {
    res.send('Hello world !!!');
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given course ID was not found');
    res.send(course);
});

// post request
app.post('/api/courses', (req, res) => {
    const { error } = validateData(res.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// put request
app.put('/api/courses/:id', (req, res) => {
    // check error 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given course ID was not found');
    
    //const result = Joi.validate(req.body, schema);
    const { error } = validateData(req.body); // request.error
    
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // update course
    course.name = req.body.name;
    res.send(course);
});

// delete request
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given course ID was not found');
    
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

// helper functions
function validateData(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

// connecting to server
const port = process.env.PORT || 8000 ;
app.listen(port, () => {
    console.log(`App listening on port ${port} !`);
});
