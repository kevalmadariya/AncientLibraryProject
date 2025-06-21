const mongoose = require('mongoose');

// const url = "mongodb+srv://kevalnpatel070:UHdmhxjbbNpVJtm9@cluster0.e5cdaxe.mongodb.net/Ancient_Library?retryWrites=true&w=majority&appName=Cluster0";
const url = "mongodb://localhost:27017/Ancient_Library"

mongoose.connect(url)
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch(err => {
  console.error("❌ MongoDB connection failed:", err);
});

