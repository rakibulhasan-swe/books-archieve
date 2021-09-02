const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const detailsContainer = document.getElementById('books-details');
const countContainer = document.getElementById('count');
const errorDiv = document.getElementById('error-div');
const spinner = document.getElementById("spinner");
let count = 0;

searchBtn.addEventListener('click', function(){
    const searchText = searchInput.value;
    //check input is null or not
    if (searchText === "") {
        detailsContainer.innerHTML = "";
        count = 0;
        countContainer.innerText = `Total Item: ${count}`;
        errorDiv.innerText = "Search field cannot be empty!!!";
        return;
      }
    // clear details
    count = 0;
    detailsContainer.innerHTML = "";
    

    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then(data => {
        // Setting a timer of 1.5s, before removing the spinnner, and showing data
        setTimeout(() => {
            spinner.classList.add("d-none");
            showInfo(data);
          }, 1500);
        })
});

const showInfo = info => {
    const convertedArray = info.docs;
    // Error Handing
    if (convertedArray.length === 0) {
        errorDiv.innerText = "NO Result Found";
        count = 0;
        countContainer.innerText = `Total Item: ${count}`;
    } else {
        errorDiv.innerText = "";
    }
    const slicedArrry = convertedArray.slice(0, 12);
    slicedArrry.forEach(details => {

        // Error handling of image
        let imageUrl = `https://covers.openlibrary.org/b/id/${details.cover_i}-M.jpg`;
        if(details.cover_i===undefined){
           imageUrl = 'https://previews.123rf.com/images/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-no-image-available-icon-flat-vector.jpg';
        }

        // console.log(`${details.title}, ${details.author_name}, ${details.publisher}, ${details.first_publish_year}`);

        const columnDiv = document.createElement('div');
        columnDiv.className = 'col-md-3 col-12';
        columnDiv.innerHTML = `
            <div class="card p-3 my-2 shadow-lg p-3 mb-5 bg-white rounded">
                <img id="notShown" src="${imageUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${details.title}</h5>
                    <p class="card-text">Author Name: ${details.author_name}</p>
                    <p class="card-text">Publisher Name: ${details.publisher}</p>
                    <p class="card-text">Published year: ${details.first_publish_year}</p>
                </div>
            </div>
        `;
        detailsContainer.appendChild(columnDiv);
        count++;
    });
    countContainer.innerText = `Total Item: ${count}`;
    searchInput.value = '';
};