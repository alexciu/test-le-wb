const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res, next) => {
    var now = new Date().toString();
    var log = `log: ${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if (err){
            console.log('Unable to save log in file.')
        }
    })
    next()
});

// app.use((req,res, next) => {
//     res.render('inlucru.hbs');
//     //next()
// });

app.use(express.static(__dirname + '/public'))



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<b>Hello you!!</b>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        name: 'Alex'
    })
});

app.get('/about', (req, res) => {
    //res.send('<h1>About page</h>');
    res.render('about.hbs', {
        pageTitle: 'About Page',
       // currentYear: new Date().getFullYear()
    });
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
    pageTitle: 'Projects'
    
    });
})


app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.' 
    });
})



app.listen(port , () => {
    console.log(`Server start on port ${port}.`)
}); 