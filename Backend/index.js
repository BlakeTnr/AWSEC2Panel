const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("AWSMCStart backend API")
})

app.listen(port, () => {
    console.log(`AWSMCStart backend API running on port ${port}`)
})