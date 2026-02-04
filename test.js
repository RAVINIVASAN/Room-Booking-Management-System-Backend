const dns = require('dns');
const { MongoClient } = require('mongodb');

// 1. Force Node.js to use Google DNS (8.8.8.8)
try {
  dns.setServers(['8.8.8.8']);
  console.log("DNS servers set to: ", dns.getServers());
} catch (e) {
  console.error("Failed to set DNS servers:", e.message);
}

// 2. Your MongoDB Connection Setup
const uri = "mongodb+srv://ravidb:ravi8525@roombookingsystem.yqwjblv.mongodb.net/RoomBookingSystem";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Attempting to connect...");
    await client.connect();
    
    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected successfully!");

  } catch (err) {
    console.error("❌ Connection failed!", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);