
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')
var enforce = require('express-sslify');
const fs = require('fs')

let Opportunity = require('./models/opportunity.model.js');

const app = express();

app.use(enforce.HTTPS({ trustProtoHeader: true }));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var uri = '';
if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGO_URI
}
else {
  uri = "mongodb+srv://jatin:jatin123@testingcluster-pn17a.gcp.mongodb.net/test?retryWrites=true&w=majority"
}

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const opportunitiesRouter = require('./routes/opportunities');
const hostsRouter = require('./routes/hosts');
const waitingusersRouter = require('./routes/waitinglist');
const ambassadorsRouter = require('./routes/ambassador');
const userRouter = require('./routes/user');
const dataRouter = require('./routes/data_collection');
const metaTagsRouter = require('./routes/meta_tags');
const reviewRouter = require('./routes/testimonial');

app.use('/', metaTagsRouter);
app.use('/api/opp/', opportunitiesRouter);
app.use('/api/org/', hostsRouter);
app.use('/api/waiting/', waitingusersRouter);
app.use('/api/amb/', ambassadorsRouter);
app.use('/api/user/', userRouter);
app.use('/api/data/', dataRouter);
app.use('/api/review/', reviewRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});