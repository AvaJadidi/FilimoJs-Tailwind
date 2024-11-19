// تعریف apiها
let bannerApi = "https://avajadidi.github.io/FilimoApis/bannner.json";
let movieApi = "https://avajadidi.github.io/FilimoApis/movie.json";
let filmApi = "https://avajadidi.github.io/FilimoApis/film.json";
let onlineMovieApi = "https://avajadidi.github.io/FilimoApis/onlineMovie.json";
let userIdeaApi = "https://avajadidi.github.io/FilimoApis/userIdea.json";

//
let bannerContainer = document.getElementById("bannercontainer");
let cardContainer = document.getElementById("cardContainer");
let moviesContainer = document.getElementById("moviesContainer");
let movieType = document.querySelectorAll(".movie-type");
previousMovieContent = null;

let cardsFilm = document.getElementById("cards-film");

let nextBtn = document.getElementsByClassName(".swiper-button-next");
let prevBtn = document.getElementsByClassName(".swiper-button-prev");


let onlineMovieContainer = document.getElementById("online-movies-container");
let userCards = document.getElementById("userCards");

let discloserButtons = document.querySelectorAll(".disclosure button");
let discloserPanels = document.querySelectorAll(".disclosure-panel");
let plusIcon = document.querySelectorAll(".icon-plus");

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 20,

  breakpoints: {
    400:{
      slidesPreview:2,
      // loop:true,
      // centeredSlides: true,

    },
    640: {
      slidesPreview:3,
      // centeredSlides: false,
     

    }
,
    768:{
      slidesPreview:3 , 
      loop:false,


    }
    
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// user idea swiper

var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView:2.4,
  spaceBetween: 20,
  // loop:true,

  breakpoints: {
    400:{
      slidesPreview:1,

    },
    640: {
      slidesPreview:2,
    }
,
    768:{
      slidesPreview:3, 
    }
    
  },
  navigation: {
    nextEl: ".swiper-button-prev",
    prevEl: ".swiper-button-next  ",
  },
});



// ........ show banner slider   ساخت اسلایدر بنر بالای صفحه
var bannerImages = [];
var currentIndex = 0;
const fetchData = async () => {
  try {
    let data = await fetch(bannerApi);
    bannerImages = await data.json();
    sliderbanner();
    return bannerImages;
  } catch (error) {
    console.log(error.message);
  }
};

function sliderbanner() {
  let bannerImg = document.getElementById("banner");
  bannerImg.src = bannerImages.banner[currentIndex].url;
  setInterval(() => {
    bannerImg.classList.remove("opacity-100");
    bannerImg.classList.add("opacity-0");

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % bannerImages.banner.length;
      let source = bannerImages.banner[currentIndex].url;
      bannerImg.src = source;
      bannerImg.classList.remove("opacity-0");
      bannerImg.classList.add("opacity-100");
    }, 700);
  }, 3000);
}

fetchData();

// show movie cards..... قسمت فیلم و سریال و  نمایش جزییات فیلم
let cards = "";
let movies = [];
let defaultMovieType = "سریال";
// تغیر پس زمینه فیلتر فیلم و سریال
movieType.forEach((item) => {
  item.addEventListener("click", () => {
    let nextelement = item.nextElementSibling;
    let prevelement = item.previousElementSibling;

    item.classList.add("bg-gray-400");
    item.classList.add("rounded-full");
    if (nextelement) {
      nextelement.classList.remove("bg-gray-400");
      nextelement.classList.remove("rounded-full");
    } else {
      prevelement.classList.remove("bg-gray-400");
      prevelement.classList.remove("rounded-full");
    }
    let type = item.innerHTML;
    movieTypeSelected(type, event);
  });
});
// نمایش داده ها بر اساس فیلتر انتخابی (فیلم و سریال)
function movieTypeSelected(type, event) {
  event.preventDefault();
  defaultMovieType = type;
  movies = [];
  cardContainer.innerHTML = "";
  fetchMovies();
}
// فتچ کردن اظلاعات از api
let fetchMovies = async () => {
  try {
    let data = await fetch(movieApi);
    let result = await data.json();
    movies = result.movie.filter((item) => item.type === defaultMovieType);
  
    cards = movies.map((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList =
        "cardElement rounded-lg border-2 h-[250px] min-w-[150px] max-w-[250px]";
      cardElement.innerHTML = `<img src=${card.image}  class="rounded-lg w-full h-full" alt=${card.type}> `;
      cardContainer.appendChild(cardElement);
      cardElement.addEventListener("click", () => {
        showMoviesDetail(index);
      });
    });
    showMoviesDetail(0);
    cardContainer.insertAdjacentHTML("afterbegin", cards);
  } catch (error) {
    console.log(error);
    
  }
};

fetchMovies();
// نمایش اطلاعات فیلم های انتخاب شده
function showMoviesDetail(index) {
  let movieDetail = movies[index];
  if (previousMovieContent) {
    previousMovieContent.remove();
  }
  const movieContent = document.createElement("div");
  movieContent.classList =
    "movieContent relative h-full w-full bg-cover no-repeat z-20 flex flex-col items-start justify-evenly gap-10 p-4 text-white after:absolute after:bg-gradient-to-r after:from-black after:to-black after:opacity-50 after:w-full after:top-0  after:right-0 after:h-full ";
  movieContent.style.backgroundImage = `url(${movieDetail.poster})`;
  movieContent.innerHTML = `<div class="absolute top-0 bottom-0 h-fit max-w-[700px] mx-auto z-20 flex flex-col items-start justify-evenly gap-5 p-4 text-white">
  <h3 class="pt-10 text-2xl font-bold">${movieDetail.name}</h3>
  <p class="text-zinc-300 text-base ">کارگردان: ${movieDetail.director}</p>
  <p class="text-lg font font-semibold"> ${movieDetail.describtion}</p>
  <a href="#" class="flex items-center justify-center  bg-emerald-600 py-3 px-5 gap-2 mt-2 text-white text-lg font-semibold rounded-lg">
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24" width="24" height="24" class="text-sm font-extralight">
      <defs>
        <g id="ui-icon-subscription" viewBox="0 0 24 24">
          <path d="M19 4H5A3 3 0 0 0 2 7V17a3 3 0 0 0 3 3H19a3 3 0 0 0 3-3V7A3 3 0 0 0 19 4Zm1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7A1 1 0 0 1 5 6H19a1 1 0 0 1 1 1Z"></path>
          <path d="M12.4 11 9 8.74A1.25 1.25 0 0 0 7 9.79v4.42A1.26 1.26 0 0 0 9 15.27l3.44-2.21A1.26 1.26 0 0 0 12.4 11Z"></path>
          <circle cx="16" cy="9" r="1"></circle>
          <circle cx="16" cy="15" r="1"></circle>
          <circle cx="16" cy="12" r="1"></circle>
        </g>
      </defs>
      <g fill="#FFFFFF">
        <path d="M19 4H5A3 3 0 0 0 2 7V17a3 3 0 0 0 3 3H19a3 3 0 0 0 3-3V7A3 3 0 0 0 19 4Zm1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7A1 1 0 0 1 5 6H19a1 1 0 0 1 1 1Z"></path>
        <path d="M12.4 11 9 8.74A1.25 1.25 0 0 0 7 9.79v4.42A1.26 1.26 0 0 0 9 15.27l3.44-2.21A1.26 1.26 0 0 0 12.4 11Z"></path>
        <circle cx="16" cy="9" r="1"></circle>
        <circle cx="16" cy="15" r="1"></circle>
        <circle cx="16" cy="12" r="1"></circle>
      </g>
    </svg>
    <span>خرید اشتراک و تماشا</span>
  </a>
  <span class="text-sm"> ${movieDetail.runtime} - محصول ${movieDetail.country} - ${movieDetail.year} - کیفیت ${movieDetail.quality} - بالای${movieDetail.age} </span>
</div>`;
  moviesContainer.appendChild(movieContent);
  previousMovieContent = movieContent;
}
// all film cards نمایش اسلایدر فیلم ها


let fetchFilms = async () => {
  let films = "";
  try {
    let response = await fetch(filmApi);
    let data = await response.json();

    films = data.film.map((item) => {
      let filmCard = document.createElement("div");
      filmCard.classList =
        "swiper-slide !w-[165px] text-white flex flex-col";
      filmCard.innerHTML = `<div  class="rounded-lg w-[165px] h-[220px] mb-4">
                  <img class="rounded-lg w-full h-full" src=${item.image} alt=${item.name}>
                </div>
                  <h3 id="card-film-text " class="font-normal text-xl pr-1">
                  ${item.name}
                  </h3>`;
      cardsFilm.appendChild(filmCard);
    });
  } catch (error) {
    console.log(error);
  }
};

fetchFilms();



// online movie....... نمایش اسلایدر عمودی فیلم ها و نمایش کارتها
let fetchOnlineMovies = async () => {
  let onlineMovies = "";
  try {
    let response = await fetch(onlineMovieApi);
    let data = await response.json();
    onlineMovies = data.onlineMovie.map((item) => {
      let onlineMovieCard = document.createElement("div");
      onlineMovieCard.classList =
        " md:w-[530px] w-full mx-auto h-[48%] flex items-start justify-stretch gap-3 p-3 bg-zinc-700 border-zinc-200 border-2 rounded-lg";
      onlineMovieCard.innerHTML = ` <div class="h-full sm:w-[160px] w-[100px] rounded-lg">
                  <img class="block align-middle h-full rounded-lg w-full box-border" src=${item.image} alt=${item.name}>
                </div>
                 <article class="flex flex-col justify-between items-start w-[68%] h-full text-sm font-semibold ">
                  <div class="flex justify-between pb-3 w-full">
                   <h6 class="text-lg font-semibold ">${item.name}</h6>
                   <p class=" flex text-xs font-semibold justify-center items-center gap-2">
                     <img class="w-4 h-4 rounded-full" src="src/image/ideaPic.webp" alt="">
                     <span>اکران آنلاین</span>
                   </p>
                  </div>
                  <p class="pb-2 ">کارگردان: <span>${item.director} </span></p> 
                  <p class="pb-2">${item.ganer}</p>
                  <button class="bg-emerald-600 p-1 rounded-lg text-xl font-bold w-[120px]">خرید بلیط</button>
                 </article>
               `;
      onlineMovieContainer.appendChild(onlineMovieCard);
    });
  } catch (error) {
    console.log(error);
  }
};
fetchOnlineMovies();
// user idea card======================= اسلایدر نظرات کاربران و نمایش اطلاعات از api

let fetchUserIdea = async () => {
  let userIdeas = "";
  try {
    let response = await fetch(userIdeaApi);
    let data = await response.json();
    let result = data.userIdea;

    userIdeas = result.map((item) => {
      let userIdeaCard = document.createElement("div");
      userIdeaCard.classList =
        "usercard swiper-slide flex-col justify-start item-start flex p-4 max-w-[420px] min-w-[300px] h-[150px] rounded-lg border border-zinc-400 bg-zinc-800";
      userIdeaCard.innerHTML = `<div class="flex gap-2 justify-start items-center mb-4">
                     <img class="w-4 h-4 rounded-full" src=${item.image} alt="">
                     <span>${item.name}</span>
                    </div>
                    <p class="overflow-hidden">${item.idea} </p>
`;
      userCards.appendChild(userIdeaCard);
    });
  } catch (error) {
    console.log(error);
  }
};

fetchUserIdea();

// accordion..........کنترل اکاردئون پایین صفحه

discloserButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Toggle the current disclosure panel
    discloserPanels[index].classList.toggle("hidden");
    plusIcon[index].classList.toggle("rotate-180");

    // Close the other disclosure panels
    discloserPanels.forEach((panel, idx) => {
      if (idx !== index) {
        panel.classList.add("hidden");
        plusIcon[index].classList.toggle("rotate-[-180]");
      }
    });
  });
});

// swipper
