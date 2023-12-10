const api_key = "676d6f31f83348cd8d6db17c8285959f";
const url = "https://newsapi.org/v2/everything?q="


window.addEventListener('load', () => fetchNews("Finance"))


function reload (){
    window.location.reload();
}


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${api_key}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardscontainer = document.getElementById('container');
    const newscardtemplate = document.getElementById('template');

    cardscontainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataINCard(cardClone, article);
        cardscontainer.appendChild(cardClone);

    });
}

function fillDataINCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-image');
    const newstitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsdec = cardClone.querySelector('#news-dec');

    newsImg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdec.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-us", { timeZone: "Asia/Jakarta" });


    newsSource.innerHTML = `${article.source.name} ${date} `;
    
    cardClone.firstElementChild.addEventListener('click', ()=> {
        window.open(article.url,"_blank" );

    })
}

function onNavItemClick(id) {
    fetchNews(id);

}

const searchButton = document.getElementById('search-button')
const searchText =document.getElementById('search-text')

searchButton.addEventListener('click', ()=> {
    const query = searchText.value ;
    if (!query) return;
    fetchNews(query);
})
