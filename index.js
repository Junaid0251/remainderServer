//server creation

//importing express
const express = require('express')

//import jwt
const jwt = require('jsonwebtoken')
//dataservice

//integrating front end
const cors = require('cors')


const dataservice = require('./services/data-service')

//creating app using express
const app = express()
app.use(express.json())


//use cors

app.use(cors({
    origin: 'http://localhost:4200'
}))





//----------remainder server ---------------

    const jwtMiddleware=(req,res,next)=>{
        try {
            const token = req.headers["x-access-token"]
            const data = jwt.verify(token,'secretcode')
            req.currentemail = data.currentemail
            next()
        }

        catch{
            res.status(401).json({
                status:false,
                message:"please log in!!!!"
            })
        }

    }



//signup

app.post('/signup',(req,res)=>{
    dataservice.signup(req.body.email,req.body.name,req.body.password)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

//login

app.post('/login',(req,res)=>{
    dataservice.login(req.body.email,req.body.password)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

//add event

app.post('/addEvent',jwtMiddleware,(req,res)=>{
    dataservice.addEvent(req,req.body.email,req.body.event,req.body.date)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

//view event

app.post('/viewEvent',jwtMiddleware,(req,res)=>{
    dataservice.viewEvent(req.body.email)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})


//delete event
app.delete('/deleteEvent:email',jwtMiddleware,(req,res)=>{
    dataservice.deletEevent(req,req.params.email)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})

//cardView

app.post('/cardView',(req,res)=>{
    dataservice.cardView(req.body.email)
    .then(result=>{
        res.status(result.statuscode).json(result)
    })
})




// setting port number

app.listen(3000,()=>{
    console.log("server started at 3000");
})