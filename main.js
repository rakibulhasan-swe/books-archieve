const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');

const showInputValue = () => {
    console.log(searchInput.value);
    searchInput.value = '';
}
searchBtn.addEventListener('click', showInputValue);
