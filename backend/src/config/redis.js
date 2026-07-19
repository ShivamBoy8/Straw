const redis=require('redis')
const redisClient=redis.createClient({
    username: 'default',
    password: 'L1kIMEeNdO77vMId6ur8vTqWhH8gWMjT',
    socket: {
        host: 'redis-18098.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 18098
    }
});

module.exports=redisClient;