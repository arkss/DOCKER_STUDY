const express = require("express");
const redis = require("redis");
const PORT = 8080;


const client = redis.createClient({
    host: "redis-server",
    port: 6379
});

const app = express();

client.set("number", 0);

app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        client.set("number", parseInt(number) + 1);
        res.send("add 1 to number: " + number);
    })
})

app.listen(PORT);

console.log("hello world");