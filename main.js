const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const countContainer = document.getElementById('count');

searchBtn.addEventListener('click', function(){
    const searchText = searchInput.value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
      fetch(url)
      .then(res => res.json())
      .then(data => showInfo(data));
});

const showInfo = info =>{
    let count = 0;
    const convertedArray = info.docs;
    convertedArray.forEach(details => {
        const detailsContainer = document.getElementById('books-details');
        const rowDiv = document.createElement('div');
        rowDiv.innerHTML =  `
        <div class="row col-md-4 my-2 py-2 border border-dark">
            <p>Book Name: ${details.title}</p>
            <p>Author Name: ${details.author_name}</p>
            <p>Publisher Name: ${details.publisher}</p>
            <p>Published year: ${details.first_publish_year}</p>
        </div>
        `;
        detailsContainer.appendChild(rowDiv);
        count++;
    });
    countContainer.innerHTML = `Element: ${count}`;
};