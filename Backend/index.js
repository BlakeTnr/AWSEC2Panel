const { EC2, StartInstancesCommand, EC2Client } = require('@aws-sdk/client-ec2');
const express = require('express')
const app = express()
const port = 3000

var ec2_region = new EC2({region: 'us-east-1', maxAttempts: 15});

var ec2Instances = [
    "i-0a87aa86329a56c68"
]

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

function tagEC2Instance(id, key, value) {
    var params = {
        Resources: [
           id
        ], 
        Tags: [
           {
          Key: key, 
          Value: value
         }
        ]
       };
    ec2_region.createTags(params)
}

function untagEC2Instance(id, key) {
    var params = {
        Resources: [
           id
        ], 
        Tags: [
           {
          Key: key,
         }
        ]
       };
    ec2_region.deleteTags(params)
}

function getEC2TagValue(id, key) {
    ec2_region.describeTags().then((tags) => {
        tags.Tags.forEach((tag) => {
            if(tag.Key == key) {
                return tag.Value
            }
        })
    })
}

function tagEC2StopAt(id, stopat) {
    tagEC2Instance(id, "StopAt", stopat)
}

function tagEC2DelayedStop(id, secondsDelay) {
    tagEC2StopAt(id, Math.floor(new Date().getTime()/1000)+secondsDelay)
}

function isEC2PastStopAt(id) {
    var stopAtUNIX = getEC2TagValue(id, "StopAt")
    if(new Date().getTime() > stopAtUNIX) {
        return true
    }
    return false
}

function checkForPendingStopEC2() {
    ec2Instances.forEach((ec2Instance) => {
        if(isEC2PastStopAt(ec2Instance)) {
            stopInstanceById(ec2Instance)
            untagEC2Instance(ec2Instance, "StopAt")
        }
    })
}

const my_test_id = "i-0a87aa86329a56c68" // TODO: Remove this
app.get('/', (req, res) => {
    res.send("AWSMCStart backend API")
    startInstanceById(my_test_id)
    tagEC2DelayedStop(my_test_id, 20)
})

app.listen(port, () => {
    console.log(`AWSMCStart backend API running on port ${port}`)
})