let mongoose = require('mongoose');

let options = {
	server: { socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
	replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
};

// mLab connection
let mLabUri = "mongodb://guest:guest123@ds035177.mlab.com:35177/vanhackjobs";

// Use promises
mongoose.Promise = global.Promise;
mongoose.connect(mLabUri, options);
let conn = mongoose.connection;

// Handle connection error to show a message on console
conn.on("error", console.error.bind(console, "conection error:"));

module.exports = {
	mongoose
};
