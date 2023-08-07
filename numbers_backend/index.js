const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get("/numbers", async (req, res) => {
    try {
        const params = req.query.url
        
        var result = []
        for (let i = 0; i < params.length;i++){
            let temp = await axios.get(params[i])
            for (let j = 0; j < temp.data.numbers.length; j++){
                if (!result.includes(temp.data.numbers[j])) {
                    result.push(temp.data.numbers[j])
                }
            }
        }
        
        result = result.sort((a, b) => {
            return a-b
        })
        res.send({numbers:result})
    }
    catch (err) {
        console.log(err)
        res.send('wrong')
    }
})
app.listen(3000,() => {
    console.log("started")
})