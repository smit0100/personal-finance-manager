const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./src/config/serverConfig');
const connectDB = require('./src/config/dbConfig');
const routes = require('./src/routes');


const app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true,
}))
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


require('./src/utils/common/cron-job');


app.use('/api', routes);

app.get('/home', (req, res) => {
    res.send("hello")
})




const setupAndStartServer = async () => {
    app.listen(ServerConfig.PORT, async () => {
        try {
            await connectDB();

            console.log(`Server is running on port ${ServerConfig.PORT}`);

           
        } catch (error) {
            console.log("Not able to connect to the mongodb server");
            console.log(error);
        }


    });


}

setupAndStartServer();