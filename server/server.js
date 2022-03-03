import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import LandRoutes from './routes/landsRoute.js';
import UserRoutes from './routes/usersRoute.js';
import {readLands} from './controllers/landsController.js';

const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: '50mb' , extended : true}));
app.use(bodyParser.urlencoded({ limit: '50mb' , extended : true}));

app.use('/users', UserRoutes);
app.use('/lands', LandRoutes);

const CONNECTION_URL = 'mongodb+srv://ReactiveSevel:EndlessSevel@cluster0.kiots.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
    readLands()
}
))
.catch((error) => console.log(error.message))



// mongoose.set('useFindAndModify', false)



// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true
// })
// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', () => console.log('Connected to MongoDB'))

// const mapRouter = require('./routes/sites')
// app.use('/sites', sitesRouter)

// app.listen(3000, () => {
//     console.log('Server is running on port 3000')
//     // sitesRouter.readSitesFromJson()
// })