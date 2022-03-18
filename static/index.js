console.log("This is my index js file");
let source='bbc-news';
let apiKey = "374b0e47dc0a4ef4b5c082dac10ddf87";

// Grab the news container
let newsAccordion = document.getElementById("newsAccordion");

newsAccordion.removeAttribute("class", "accordion");

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
  // https://newsapi.org/v2/top-headlines?sources='bbc-news'&apiKey=374b0e47dc0a4ef4b5c082dac10ddf87`
  true
);

// What to do when response is ready
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    
    let newsHtml = "";
    articles.forEach(function (element, index) {
      // console.log(element, index)
      // let news = `<div class="card">
      // <div class="card-header" id="heading${index}">
      // <h2 class="mb-0">
      // <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
      // aria-expanded="false" aria-controls="collapse${index}">

      // </button>
      // </h2>
      // </div>

      // <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
      // <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
      // </div>
      // </div>`;

      /* <div class="card my-2 mx-2 " style="width: 18rem;"> */

      element["content"] =   element["content"].replace(/<\/?[^>]+(>|$)/g, "");
      let news = ` 
             
      
           <div class="col-md-6 col-lg-4   my-2 " >
              <div class=" card col-12" >
                                              <b style="text-align:center;">Breaking News ${
                                              index + 1
                                              }:</b> <span style="color:blue; " >${
                          element["title"]
                          }</span><br><span><b style="color:brown;">Dated:&nbsp;</b>${element["publishedAt"].substring(0,10)}</span>

                                              <img src="${
                                              element["urlToImage"]
                                              }" class="card-img-top" alt="...">
                                              <div class="card-body">
                                              <p class="card-text">${
                                              element["content"]
                                              } <button type="button" class="btn btn-primary"  id="a"><a href="${
                                                element["url"]
                                                }" target="_blank" style="color:white;">Read more here</a></button></p>
                                              </div>
               </div>      
            
       
            </div>`;

      newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
  } 
};

xhr.send();

// Initialize the news api parameters

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let source = document.getElementById("inputVal").value;

  let apiKey = "374b0e47dc0a4ef4b5c082dac10ddf87";

  // Grab the news container
  let newsAccordion = document.getElementById("newsAccordion");

  newsAccordion.removeAttribute("class", "accordion");

  // Create an ajax get request
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://newsapi.org/v2/everything?q=${source}&apiKey=${apiKey}`,
    true
  );

  // What to do when response is ready
  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      
      console.log(articles);
      let newsHtml = "";
      articles.forEach(function (element, index) {
        // console.log(element, index)
        // let news = `<div class="card">
        // <div class="card-header" id="heading${index}">
        // <h2 class="mb-0">
        // <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
        // aria-expanded="false" aria-controls="collapse${index}">

        // </button>
        // </h2>
        // </div>

        // <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
        // <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
        // </div>
        // </div>`;

        /* <div class="card my-2 mx-2 " style="width: 18rem;"> */

        element["content"] =   element["content"].replace(/<\/?[^>]+(>|$)/g, "");
        let news = ` 
               
        
             <div class=" col-md-6 col-lg-4  my-2 " >
                <div class=" card col-12" >
                                                <b style="text-align:center;">Breaking News ${
                                                index + 1
                                                }:</b> <span style="color:blue;">${
                            element["title"]
                            }</span></span><br><span><b style="color:brown;">Dated:&nbsp;</b>${element["publishedAt"].substring(0,10)}</span>

                                                <img src="${
                                                element["urlToImage"]
                                                }" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                <p class="card-text">${
                                                element["content"]
                                                } <button type="button" class="btn btn-primary" ><a href="${
                                                  element["url"]
                                                  }" target="_blank" style="color:white;" id="a">Read more here</a></button></p>
                                                </div>
                 </div>      
              
         
              </div>`;

        newsHtml += news;
      });
      newsAccordion.innerHTML = newsHtml;
    } 

    else{
      alert('Please ensure that you have entered the news you want to search for')
    }
  };

  xhr.send();

   
});


