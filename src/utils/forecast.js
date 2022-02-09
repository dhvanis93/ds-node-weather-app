const request = require("postman-request");

// const body = {
//     request: { type: "City", query: "Surat, India", language: "en", unit: "m" },
//     location: {
//       name: "Surat",
//       country: "India",
//       region: "Gujarat",
//       lat: "20.967",
//       lon: "72.900",
//       timezone_id: "Asia/Kolkata",
//       localtime: "2022-02-08 14:24",
//       localtime_epoch: 1644330240,
//       utc_offset: "5.50",
//     },
//     current: {
//       observation_time: "08:54 AM",
//       temperature: 30,
//       weather_code: 113,
//       weather_icons: [
//         "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
//       ],
//       weather_descriptions: ["Sunny"],
//       wind_speed: 14,
//       wind_degree: 270,
//       wind_dir: "W",
//       pressure: 1012,
//       precip: 0,
//       humidity: 44,
//       cloudcover: 0,
//       feelslike: 31,
//       uv_index: 7,
//       visibility: 10,
//       is_day: "yes",
//     },
//   };
// const bodyParsed = JSON.parse(body);
// console.log(body.current);
// const textData = fs.readFileSync("res.txt");
// const data = textData.toString();
// const response = JSON.stringify(data);
// const f = JSON.parse(response);
// console.log(f.body);

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2bd4f3c5a15778d980d06248ff9eaad8&query=" +
    latitude +
    "," +
    longitude;
  //   console.log(url);
  request(url, (error, respponse, body) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (JSON.parse(body).error) {
      callback("Unable to find weather data");
    } else {
      const bodyData = JSON.parse(body);
      //   console.log(bodyData.current);
      callback(
        undefined,
        bodyData.current.weather_descriptions[0] +
          ".It is currently " +
          bodyData.current.temperature +
          " degrees out.It feeels like " +
          bodyData.current.feelslike +
          " degrees out.There is " +
          bodyData.current.precip +
          "% chances of rain.The humidity is " +
          bodyData.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
