const quote = document.getElementById("quote");
const author = document.getElementById("author");

const api_url="https://type.fit/api/quotes";

async function getQuote(url){
   const response = await fetch(url);
   var data = await response.json();
   r=(data[Math.floor(Math.random()*16)]);
   quote.innerHTML=r.text;
   author.innerHTML=r.author;
}

getQuote(api_url);

function tweet(){
    window.open("https://twitter.com/intent/tweet?text="+quote.innerHTML + "----by"+author.innerHTML,"Tweet Wndow","width=600,height=300");
}