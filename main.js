function main() {
fetch('https://api.themoviedb.org/3/movie/popular?api_key=2c46288716a18fb7aadcc2a801f3fc6b&language=en-US').then((response) => {
return response.json()
}).then((data) => {
console.log(data);
// Create the parent movies div
const movies = document.createElement("div");
movies.id='movies';
document.body.appendChild(movies);
for (let i=0; i<data.results.length; i++)
{

// Create card for every movie
const card = document.createElement("div");
card.className="card";
card.id='card'+i;
movies.appendChild(card);

// Create the content for each card
const title = document.createElement("p");
title.className="title";
title.innerText = data.results[i].original_title;
card.appendChild(title);

const fav = document.createElement("i");
fav.className="fa-regular fa-star favorite";
card.appendChild(fav);
fav.onclick=function(){
  fav.classList.remove("fa-regular");
  fav.classList.add("fa-solid");
  fav.setAttribute("favorite", "true"); 
document.getElementById("favoriteButton").classList.remove("disabled");
card.classList.add("selected");
 
  };

const popularity = document.createElement("p");
popularity.className="popularity";
popularity.innerText = 'Popularity: ' + data.results[i].popularity;
card.appendChild(popularity);

const displaying = document.createElement("p");
displaying.className="displaying";
displaying.innerText = 'Displaying: ' + data.results[i].release_date;
card.appendChild(displaying);



const overview = document.createElement("p");
overview.className="overview";
overview.innerText = data.results[i].overview;
overview.hidden = true;
card.appendChild(overview);
/*
const favorite = document.createElement("button");
favorite.className="favorite";
favorite.innerText = 'Mark as favorite';
favorite.onclick=function(){
favorite.setAttribute("favorite", "true"); 
document.getElementById("favoriteButton").classList.remove("disabled");
card.classList.add("selected");
};
card.appendChild(favorite);
*/
const info = document.createElement("button");
info.className="info";
info.innerText = "More Info";
info.onclick=function(){
//overview.innerText = data.results[i].overview;
overview.hidden= false;
};
card.appendChild(info);

}




})
.catch(error => {
  console.error('There was an error!', error);
});

}
// Check if sort should be ascending  or descending
let checkSortPopularity = false;
function sortListPopularity() {

var list, i, switching, b, shouldSwitch;
list = document.getElementById("movies");
switching = true;
/* Make a loop that will continue until
no switching has been done: */
while (switching) {
// start by saying: no switching is done:
switching = false;
b = list.getElementsByClassName("card");
// Loop through all list-items:
for (i = 0; i < (b.length - 1); i++) {
  // start by saying there should be no switching:
  shouldSwitch = false;
  /* check if the next item should
  switch place with the current item: */
if(checkSortPopularity)
{
  if (b[i].childNodes[2].innerHTML > b[i + 1].childNodes[2].innerHTML) {
    /* if next item is alphabetically
    lower than current item, mark as a switch
    and break the loop: */
    shouldSwitch = true;
    break;
  }
}
else{
  if (b[i].childNodes[2].innerHTML < b[i + 1].childNodes[2].innerHTML) {
    /* if next item is alphabetically
    lower than current item, mark as a switch
    and break the loop: */
    shouldSwitch = true;
    break;
  }
}



}
if (shouldSwitch) {
  /* If a switch has been marked, make the switch
  and mark the switch as done: */
  b[i].parentNode.insertBefore(b[i + 1], b[i]);
  switching = true;
  
}
}
checkSortPopularity=!checkSortPopularity;
}

function sortListFavorite() {
list = document.getElementById("movies");
b = list.getElementsByClassName("card");
for (i = 0; i < (b.length); i++) {
  if (b[i].childNodes[1].getAttribute('favorite') != 'true') {
    b[i].hidden= true;
  }

}


}

function checkDate() {
list = document.getElementById("movies");
b = list.getElementsByClassName("card");
const d = new Date();
d.setHours(0,0,0,0);
date = Date.parse(d);
console.log(date);
for (i = 0; i < (b.length); i++) {
movieReleaseDate = Date.parse(b[i].childNodes[3].innerHTML);
console.log(movieReleaseDate);
  if (date > movieReleaseDate) {
      console.log('Released');
  }
  else{
    console.log('To be Released');
    b[i].hidden= true;
  }

}

}