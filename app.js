require('dotenv').config();
const express = require("express")
const app = express()
app.set("view engine" , "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

const mongodb_URL = process.env.MONGODB_URL;
const document = require("./model/document")
const mongoose = require("mongoose")

 mongoose.connect(mongodb_URL )
 .then(() => console.log("🔍 MongoDB URI:", process.env.MONGODB_URL)
)
 .catch((error => console.log(error)))



app.get("/" , (req , res) => {
    const code = `   Welcome to Latin note,
 
 Lorem ipsum dolor sit amet consectetur adipisicing elit. 
 Nostrum maiores veritatis culpa consequuntur. 
 Esse, at quae nulla nisi sit veritatis, iusto odit,
 quidem ipsum reiciendis exercitationem voluptas
 ipsam quas quasi. `
    res.render("text_display" , {code})
})

app.get("/new" , (req, res) => {
    res.render("new")
})

app.post('/save' , async (req, res) => {
    const code = req.body.value
    
    try{
        const doc = await document.create({ value: code })
        console.log(doc.id)
        const userId = doc.id 
        res.render("id_display" , { userId })
    }
    catch (e) {
        console.log(code)
        res.render("new" , { txt:code})
    }
    
})

app.get("/:id" , async (req, res) => {
    const id = req.params.id;
        try{
            const text = await document.findById(id)
            res.render("text_display" , {code: text.value})
        }
        catch(e){
            res.render("text_display" , {code: "incorrect ID"} )
        }
})

app.listen(8000)