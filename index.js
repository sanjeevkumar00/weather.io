const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather3 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "bareilly"

const fetchdata = async (target) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=2e42b3d26f4e47269a6162756230701&q=${target}`;


    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const {
        current: {
            temp_c,
            condition: { text, icon },
        },
        location: { name, localtime },

    } = data;

    updateDom(temp_c, name, localtime, icon, text);

};

function updateDom(temperature, city, time, emoji, text) {
    temperateField.innerText = temperature;
    cityField.innerText = city;

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];

    const exactDay = getDayFullName(new Date(exactDate).getDay());

    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text
}

fetchdata(target);



function getDayFullName(num) {

    switch (num) {
        case 0:
            
       return "Sunday";

       case 1:
            
       return "Monnday";

       case 2:
            
       return "Tuesday";

       case 3:
            
       return "Wednesday";

        case 4:
            
       return "Thursday";

       case 5:
            
       return "Friday";

       case 6:
            
       return "Saturday";
    
        default:
            break;
    }

}

const search =(e)=>{
    e.preventDefault();

    target = searchField.value;

    fetchdata(target)
}

form.addEventListener("submit", search);