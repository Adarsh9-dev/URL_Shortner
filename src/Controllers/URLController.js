const URLmodel = require('../model/URLmodel.js');
const { customAlphabet }= require('nanoid');
const Redis = require("ioredis");
require("dotenv").config();

//Connect to redis
const redis = new Redis({
    host: process.env.REDIS_HOST_NAME,
    port: process.env.REDIS_PORT_NO,
    password: process.env.REDIS_PASSWORD
})

const shortURL = async (req,res)=>  {
    try {
        const longURL = req.body.longUrl;

        //Check in Cashe data is present or not
        const cashedData = await redis.get(`${longURL}`)
        if (cashedData) {
            return res.status(202).json({status: true, "data": JSON.parse(cashedData)});
        }

        const isPresent = await URLmodel.findOne({longUrl: longURL})
        if (isPresent) {
            const data = {
                longUrl: isPresent.longUrl,
                shortUrl: isPresent.shortUrl,
                urlCode: isPresent.urlCode
            } 
            res.status(200).json({status: true, "data": data})
        } else {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789_-';
            const nanoid = customAlphabet(alphabet, 8);
            
            let urlCode = nanoid();
            while(1) {
                const isUrlCode = await URLmodel.findOne({urlCode: urlCode})
                if (isUrlCode ) {
                    const nanoid = customAlphabet(alphabet, 8);
                    urlCode = nanoid();
                }
                else {
                    break;
                }
            }
            const shortURL = `https://chotaurl.onrender.com/${urlCode}`
            const data = {
                longUrl: longURL,
                shortUrl: shortURL,
                urlCode: urlCode
            } 

            //Store data in cashe
            await redis.set(`${data.longUrl}`,JSON.stringify(data) ,'EX', 3600*24)
            await redis.set(`${data.urlCode}`,data.longUrl ,'EX', 3600*24)

            const createShortUrl = await URLmodel.create(data);
            res.status(201).json({status: true, "data": data})

        }
        
    } catch(err) {
        res.status(500).json({status: false, message: err.message});
    }
}

const showURL = async (req,res)=>  {
    try {
        const URLcode = req.params.urlCode;
        //Check data in cashe
        const cashedData = await redis.get(`${URLcode}`);
        if (cashedData) {
            return res.status(302).redirect(cashedData); 
        }
        
        const data = await URLmodel.findOne({urlCode: URLcode})
        if (!data) {
            return res.status(404).json({status: false, message: "Invalid URL"});
        }
        
        res.status(302).redirect(data.longUrl);

    } catch(err) {
        res.status(500).json({status: false, message:err.message});
    }
}

module.exports = { shortURL, showURL }
