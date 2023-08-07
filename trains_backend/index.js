const express = require('express')
const app = express()
const axios = require('axios')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/trains', async (req, res) => {
    try {
        const res1 = await axios.post('http://20.244.56.144/train/auth', {
            "companyName": "Sai teja & co",
             "clientID": "3fb240ea-18c2-4d2c-946a-708a62ec4fdb",
             "clientSecret": "zURojeFLVZbWTQLr",
             "ownerName": "Sai Teja",
             "ownerEmail": "saikaragalla7624@gmail.com",
             "rollNo": "160120737178"
        }
            
        )
        const res_out = await axios.get('http://20.244.56.144/train/trains', {
            headers: {
                Authorization:`Bearer ${res1.data.access_token}`
            }
        })
        let ans = res_out.data.filter((t) => {
            let tm = (parseInt(t.departureTime.Hours) * 60) + (parseInt(t.departureTime.Minutes) + parseInt(t.delayedBy))
            let ct = (new Date().getHours()*60 + (new Date().getMinutes()))
        return tm-ct>=30
        })
        ans = ans.sort(function (a, b) {
            let a_mins = (parseInt(a.departureTime.Hours) * 60) + (parseInt(a.departureTime.Minutes) + parseInt(a.delayedBy))
            let b_mins = (parseInt(b.departureTime.Hours) * 60) + (parseInt(b.departureTime.Minutes) + parseInt(b.delayedBy))
            return (a.price.sleeper + a.price.AC) - (b.price.sleeper + b.price.AC) || (b.seatsAvailable.sleeper + b.seatsAvailable.AC) - (a.seatsAvailable.sleeper + a.seatsAvailable.AC) || b_mins - a_mins
        });
        res.send(ans)
    }
    catch (err) {
        console.log(err)
        res.send("something went wrong")
    }
})
app.listen(3000,() => {
    console.log("started")
})