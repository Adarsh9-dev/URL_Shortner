const URLmodel = require('../model/URLmodel.js');
const nano= require('nanoid');


const shortURL = async (req,res)=>  {
    try {
        const longURL = req.body.longUrl;
        const isPresent = await URLmodel.findOne({longUrl: longURL})
        if (isPresent) {
            const data = {
                longUrl: isPresent.longUrl,
                shortUrl: isPresent.shortUrl,
                urlCode: isPresent.urlCode
            } 
            res.status(200).json({status: true, "data": data})
        } else {
            let urlCode = nano.nanoid(8);
            while(1) {
                const isUrlCode = await URLmodel.findOne({urlCode: urlCode})
                if (isUrlCode) {
                    urlCode = nano.nanoid(8);
                }
                else {
                    break;
                }
            }
            const shortURL = `http://localhost:3000/${urlCode}`
            const data = {
                longUrl: longURL,
                shortUrl: shortURL,
                urlCode: urlCode
            } 

            const createShortUrl = await URLmodel.create(data);
            res.status(200).json({status: true, "data": data})

        }

    } catch(err) {
        res.status(500).json({status: false, message: "Something going wrong in ShortURL"})
    }
}

const showURL = async (req,res)=>  {
    try {
        const URLcode = req.params.urlCode;

        const data = await URLmodel.findOne({urlCode: URLcode})
        if (!data) {
            return res.status(404).json({status: false, message: "Invalid URL"});
        }
        
        res.status(302).redirect(data.longUrl);

    } catch(err) {
        res.status(500).json({status: false, message: "Something going wrong"})
    }
}

module.exports = { shortURL, showURL }