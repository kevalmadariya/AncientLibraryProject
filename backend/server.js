const express = require('express');
const DbConnector = require('./config/dbConnector');//<-----------mendetry...
const app = express()
const cors = require('cors')
const userRoute = require('./routers/userRoute');
const scriptureRoute = require('./routers/scriptureRoute');
const chapterRoute = require('./routers/chapterRoute')
const verseRoute = require('./routers/verseRoute');
const commentRoute = require('./routers/commentRoute');
const superstitionRoute = require('./routers/superstitionRoute');
const aiModelRoute = require('./routers/aiModelRoute');

app.use(cors())

app.use(express.json());
app.use("/", userRoute);
app.use("/", scriptureRoute);
app.use("/", chapterRoute);
app.use("/", verseRoute);
app.use("/", commentRoute);
app.use("/", superstitionRoute);
app.use("/", aiModelRoute);


app.listen(5000, () => {
    console.log("Server running at : http://localhost:5000/");
});
