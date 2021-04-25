const connectDB = require("./config/db");
const path = require("path");
const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());


const { rejects } = require("assert");

// Connect Database
connectDB();

// Init Middleware  
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }))

//instantiate all the models
require("./models/patient");
require("./models/opthalmologist");
require("./models/opthalPatientMap");
require("./models/diagnosis");

//Define all the routes
app.use(require("./routes/authRoute"));
app.use(require("./routes/registerRoute"));
app.use(require("./routes/viewAndPredictRoute"));
app.use(require("./routes/predictRoute"));
app.use(require("./routes/uploadImage"));


// app.get('/predict', function(req, res) {
//   console.log(
//     "============================In of the rest request predict ====================="
//     );
//   console.log("Request Body: " + JSON.stringify(req.body));
//   axios.post('http://127.0.0.1:5000/predict', {
//     data: "ddd"
//   }).then( response => {
//     res.status(200).send({
//       "dddd":response.data
//     })
//   })
// });

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}


  
  const PORT = process.env.PORT || 9000;
  //Client code will be running on port 500
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  