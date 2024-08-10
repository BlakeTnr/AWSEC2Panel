const { EC2, StartInstancesCommand, EC2Client } = require('@aws-sdk/client-ec2');
var cron = require('node-cron');

var ec2_region = new EC2({region: 'us-east-1', maxAttempts: 15}); // TODO: Turn the region into an environment variable

var ec2Instances = [
    "i-0a87aa86329a56c68" // TODO: Turn the instances into an environment variable
]

export function startInstanceById(id) {
    console.log(`Sending start for ${id}...`)
    const input = { // StartInstancesRequest
        InstanceIds: [ // InstanceIdStringList // required
            id,
        ]
    };
    ec2_region.startInstances(input, (err, data) => {
        //if(err) console.log(err, err.stack)
        //else console.log(data)
    })
    console.log(`Sent start for ${id}!`)
}

export function stopInstanceById(id) {
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

export function tagEC2Instance(id, key, value) {
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

export function untagEC2Instance(id, key) {
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

export async function getEC2TagValue(id, key) {
    var tags = await ec2_region.describeTags()
    var result = undefined
    tags.Tags.forEach((tag) => {
        if(tag.Key == key) {
            result = tag.Value
        }
    })
    return result
}

export async function getEC2Name(id) {
    var result = null;
    var instances = await ec2_region.describeInstances()
    instances.Reservations.forEach((reservation) => {
        reservation.Instances.forEach((instance) => {
            if(instance.InstanceId == id) {
                result = instance.KeyName
            }
        })
    })
    return result;
}

export function tagEC2StopAt(id, stopat) {
    tagEC2Instance(id, "StopAt", stopat)
}

export function tagEC2DelayedStop(id, secondsDelay) {
    tagEC2StopAt(id, Math.floor(new Date().getTime()/1000)+secondsDelay)
}

export async function isEC2PastStopAt(id) {
    var stopAtUNIX = await getEC2TagValue(id, "StopAt")
    if(stopAtUNIX != null && Math.floor(new Date().getTime()/1000) > stopAtUNIX) {
        return true
    }
    return false
}

export async function checkForPendingStopEC2() {
    ec2Instances.forEach(async (ec2Instance) => {
        if(await isEC2PastStopAt(ec2Instance)) {
            console.log(`Stopping ${ec2Instance}...`)
            stopInstanceById(ec2Instance)
            untagEC2Instance(ec2Instance, "StopAt")
            console.log(`Sent stop for ${ec2Instance}!`)
        }
    })
}

export function startEC2StopDaemon() {
    cron.schedule('* * * * * *', async () => {
        await checkForPendingStopEC2()
    });
}

export async function getAllInstancesInfo() {
    var allInstances = [

    ]

    for(const instance of ec2Instances) {
        var instanceInfo = {}

        instanceInfo.Id = instance
        instanceInfo.Name = await getEC2Name(instance)

        allInstances.push(instanceInfo)
    }

    return allInstances
}

export const my_test_id = "i-0a87aa86329a56c68" // TODO: Remove this