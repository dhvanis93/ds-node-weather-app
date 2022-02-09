const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(path.join(__dirname));
const app = express();
const publcDirectoryPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use(express.static(publcDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dhvani Shah",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "If you need help,reach out to me!",
    title: "Help",
    name: "Dhvani Shah",
  });
  //   res.send("Help page");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dhvani Shah",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must provide address",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error)
      return res.send({
        error,
      });

    if (data) {
      console.log(data);
      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error)
          return res.send({
            error,
          });
        res.send({
          location: data.location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  });
});

app.get("/help*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found!",
  });
});

// app.get("/products", (req, res) => {
//   console.log(req.query);
//   if (!req.query.search) {
//     return res.send({
//       error: "Must provide search term ",
//     });
//   }
//   res.send({
//     products: [],
//   });
// });

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
