console.log("Client-side JS");
fetch("http://puzzle.mead.io/puzzle").then((res) => {
  res.json().then((data) => {
    console.log(data);
  });
});

const form = document.querySelector("form");
const inputAdress = document.querySelector("input");
const message1 = document.querySelector("#msg1");
const message2 = document.querySelector("#msg2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(inputAdress.value);
  message1.textContent = "Loading..";
  message2.textContent = "";
  fetch(`/weather?address=${inputAdress.value}`).then((res) => {
    res.json().then((data) => {
      if (data.error) message1.textContent = data.error;
      else {
        console.log(data.location, data.forecast);
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });
});
