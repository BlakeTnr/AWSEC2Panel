const { EC2, StartInstancesCommand, EC2Client } = require('@aws-sdk/client-ec2');
const express = require('express')
const app = express()
const port = 3000

var ec2_region = new EC2({region: 'us-east-1', maxAttempts: 15});

function startInstanceById(id) {
    const input = { // StartInstancesRequest
        InstanceIds: [ // InstanceIdStringList // required
            id,
        ]
    };
    ec2_region.startInstances(input, (err, data) => {
        //if(err) console.log(err, err.stack)
        //else console.log(data)
    })
}

function stopInstanceById(id) {
    const input = { // StartInstancesRequest
        InstanceIds: [ // InstanceIdStringList // required
            id,
        ]
    };
    ec2_region.stopInstances(input, (err, data) => {
        //if(err) console.log(err, err.stack)
        //else console.log(data)
    })
}

const my_test_id = "i-0a87aa86329a56c68" // TODO: Remove this
app.get('/', (req, res) => {
    res.send("AWSMCStart backend API")
    startInstanceById(my_test_id)
})

app.listen(port, () => {
    console.log(`AWSMCStart backend API running on port ${port}`)
})