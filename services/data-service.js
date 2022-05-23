//import db
const db = require('./db')

//import jwt
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')
const { set } = require('mongoose')



//database

// database ={
//     1000:{email:"abc@gmail.com",name:"test1",password:"abc"},
//     1001:{email:"demo@gmail.com",name:"user1",password:"abcd"},
//     1002:{email:"test@gmail.com",name:"test2",password:"test2"}
// }

//signup

const signup = (email, name, password) => {
    return db.User.findOne({ email })
        .then(user => {
            if (user) {

                return {
                    statuscode: 401,
                    status: false,
                    message: "Already exist",

                }
            }
            else {
                const newUser = new db.User({
                    email,
                    name,
                    password
                })
                newUser.save()
                return {
                    statuscode: 200,
                    status: true,
                    message: "successfully created"
                }
            }
        })
}

//login

const login = (email, password) => {
    return db.User.findOne({ email, password })
        .then(user => {
            if (user) {

                currentUser = user.name
                currentemail = email
                //generate token

                const token = jwt.sign({
                    currentemail: email
                }, 'secretcode')



                return {
                    statuscode: 200,
                    status: true,
                    message: "Login successfull",
                    currentUser,
                    currentemail,
                    token
                }
            }
            else {
                return {
                    statuscode: 401,
                    status: false,
                    message: "invalid creditials!!"
                }
            }
        })
}

//add event

const addEvent = (req,email, event, date) => {


    return db.User.findOne({ email })
        .then(result => {
            if(req.currentemail != email){
                return {
                    statuscode: 422,
                    status: false,
                    message: "Enter a valid email"
                  }
            }
            if (result) {
                result.event.push({
                    event: event,
                    date: date
                })
                result.save()
                return {
                    statuscode: 200,
                    status: true,
                    message: "successfully added the event " + event
                }
            }
            else {
                return {
                    statuscode: 401,
                    status: false,
                    message: "invalid creditials!!"
                }
            }
        })

    // const usr = JSON.parse(localStorage.getItem(currentemail))
    // console.log(usr);

    // console.log(email,event,date);


}

//view event

const viewEvent = (email) => {
    return db.User.findOne({ email })
        .then(result => {
            if (result) {
                // console.log(result.event);
                
                return {
                    statuscode: 200,
                    status: true,
                    event:result.event
                }
                
            }
            else
            {
               return{
                statuscode: 401,
                status: false,
                message: "No Data Found!!"
               } 
            }
        })
}

const cardView =(email)=>{
    // console.log(email);
    var today = new Date().toISOString().slice(0, 10)
    
    return db.User.findOne({ email })
        .then(result => {
            if (result) {
                const length = (Object.keys(result.event).length)
                let events=new Array()
                // console.log(length);
                for(let i=0;i<length;i++){
                    // console.log(today);
                    // console.log(result.event[i].date)
                    // if(result.event[i].date==today){
                        if((result.event[i].date)===today){
                            
                            
                           
                           events.push(result.event[i])
                           
                           
                            
                            
                        }
                        
                        // console.log(events);
                        
                        // console.log(result.event[i].date);
                        
                    // }
                    // else
                    // {
                    //     return{
                    //         statuscode: 401,
                    //         status: false,
                    //         message: "No Event Found To Corresponding Date!!"
                    //        } 
                    // }
                    
                    
                }
                
                return {
                    statuscode: 200,
                    status: true,
                    event:events
                    
                }
                
            }
            else
            {
               return{
                statuscode: 401,
                status: false,
                message: "No Data Found!!"
               } 
            }
        })
}

const deletEevent =(email)=>{
//    let dbemail = db.User.findOne({email})
//    if(dbemail===email){
//     //    console.log(db.User.findOne({}));
//     //    db.User.deleteOne({event})
//    }
}

module.exports = {
    signup,
    login,
    addEvent,
    viewEvent,
    deletEevent,
    cardView
}