import express from "express";
import { messagingScript } from "./scripts/Pollinator.js";
// import {connectionScript} from "./scripts/ConnectionAcceptScript.js"
import cors from "cors";

const app = express();
app.use(cors())

app.post('/message',async (req,res) =>{
    console.log("Hello, Rohit")
    try{
        await messagingScript();
        res.status(200).json({user:"messaging script working"});
    }catch(err){
        console.log(err);
        res.status(500).json({user:"messaging script error"});
    }
});
// app.post('/connect',async (req,res) =>{
//     console.log("Hello, Rohit")
//     try{
//         await connectionScript();
//         res.status(200).json({user:"connections script working"});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({user:"connections script error"});
//     }
// });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
