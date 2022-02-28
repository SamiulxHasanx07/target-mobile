// Fetch Data from API
const fetchData = searchPhone =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))
}

// Show Data in UI 
const displayPhone = allPhone =>{
    console.log(allPhone.length);
    if(allPhone.length == 0){
        const searchError = document.getElementById('search-error');
        searchError.innerHTML = `
            <h4>Result Not Found</h4>
        `;
        // const notFound = document.createElement('h4');
        // notFound.innerText = 'No Result Found';
        // searchError.appendChild(notFound);
    }
    
    const displayPhone = document.getElementById('display-phone');
    displayPhone.textContent = '';
    allPhone.forEach(singleData =>{
        const singlePhone = document.createElement('div');
        singlePhone.classList.add('col');
        // console.log(singleData);
        singlePhone.innerHTML = `
        <div class="card">
            <img class="img-fluid p-3 mx-auto" src="${singleData.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${singleData.phone_name}</h5>
                <p class="card-text text-center">Brand: ${singleData.brand}</p>
                <div class="d-flex justify-content-center">
                    <button class="btn bg-color text-white">Show Details</button>
                </div>
            </div>
        </div>
        
        `;
        displayPhone.appendChild(singlePhone);
    })
}


// Search Button
document.getElementById('search-btn').addEventListener('click', () =>{
    const searchInput = document.getElementById('search-bar');
    const searchValue = searchInput.value;
    fetchData(searchValue)


    const searchError = document.getElementById('search-error');
    searchError.innerHTML = ``;
    // reset search bar value afeter click search
    searchInput.value = '';
})