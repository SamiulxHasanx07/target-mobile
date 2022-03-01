// get search bar 
const searchBar = () =>{
    const input = document.getElementById('search-bar');
    return input;
}

// Fetch 20 Data from API
const fetchData = searchText =>{
    const searchInput = searchBar();
    if(searchText == ''){
        searchInput.style.border = '1px solid red';
        searchInput.placeholder = 'Enter Phone Name';  
        searchInput.classList.add('plh-color');

        // load Button Visiblity
        loadButtonVisiblity('invisible');

        // search field empty
        const displayPhone = document.getElementById('display-phone');
        displayPhone.textContent = '';
        
    }else{
        // console.log(typeof searchPhone)
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(response => response.json())
        .then(data => displayPhone(data.data.slice(0,20)))

        // reset search validation style 
        searchInput.style.border = '';
        searchInput.classList.remove('plh-color');
    }
}

// fetch Details
const fetchDetail = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => loadDetailsData(data.data))
}

const loadDetailsData = (data) =>{
    // Sensors Data Load
    const sensorArray = data.mainFeatures.sensors;
    const allSensor = sensorArray.join(', ');

    // Details Data Validation
    const validChecker = (othersData)=>{
        if(othersData == undefined || othersData.length == 0){
            return "Data Not Available";
        }else{
            return othersData;
        }
    }

    // Details Datas
    const detailSection = document.getElementById('details');
    detailSection.classList.add('mt-5');
    detailSection.textContent = '';
    const fullSpecClass = ['row','align-items-center'];
    const fullSpec = document.createElement('div');
    fullSpec.classList.add(...fullSpecClass);
    fullSpec.innerHTML = `
        <div class="col-12 col-md-12 my-4 my-lg-0 col-lg-3 tm-shadow">
            <div class="bg-white img-wrapper d-flex align-items-center justify-content-center py-4">
                <img src="${data.image}" alt="">
            </div>
        </div>
        <div class="col-12 col-md-12 col-lg-9">
            <h2 class="">${data.name}</h2>
            <p class="mb-2">${validChecker(data.releaseDate)}</p>
            <div class="row">
                <div class="col-12 col-md-6">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row">Brand:</th>
                                <td>${data.brand}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 class="tm-color">Main Features</h4>
                    <table class="table">
                        <tbody>                       
                            <tr>
                                <th scope="row">ChipSet</th>
                                <td>${data.mainFeatures.chipSet}</td>
                            </tr>
                            <tr>
                                <th scope="row">Display Size:</th>
                                <td>${data.mainFeatures.displaySize}</td>
                            </tr>
                            <tr>
                                <th scope="row">Memory:</th>
                                <td>${data.mainFeatures.memory}</td>
                            </tr>
                            <tr>
                                <th scope="row">Sensors:</th>
                                <td><p>${allSensor}</p></td>
                            </tr>
                            <tr>
                                <th scope="row">Storage: </th>
                                <td>${data.mainFeatures.storage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 col-md-6">
                    <h4 class="tm-color">Others Features</h4>
                    <table class="table">
                        <tbody>                       
                            <tr>
                                <th scope="row">Bluetooth: </th>
                                <td>${validChecker(data?.others?.Bluetooth)}</td>
                            </tr>                     
                            <tr>
                                <th scope="row">GPS: </th>
                                <td>${validChecker(data?.others?.GPS)}</td>
                            </tr>                     
                            <tr>
                                <th scope="row">NFC: </th>
                                <td>${validChecker(data?.others?.NFC)}</td>
                            </tr>                     
                            <tr>
                                <th scope="row">Radio: </th>
                                <td>${validChecker(data?.others?.Radio)}</td>
                            </tr>
                            <tr>
                                <th scope="row">USB: </th>
                                <td>${validChecker(data?.others?.USB)}</td>
                            </tr>
                            <tr>
                                <th scope="row">WLAN: </th>
                                <td>${validChecker(data?.others?.WLAN)}</td>
                            </tr>
                    </table>
                </div>
            </div>                    
        </div>   
    `;
   

    detailSection.appendChild(fullSpec);
    // console.log(detailSection)
}

// Show Data in UI 
const displayPhone = allPhone =>{
    if(allPhone.length == 0){
        const searchError = document.getElementById('search-error');
        searchError.classList.add('my-5');
        searchError.innerHTML = `
            <h4>Result Not Found</h4>
            <p>Search Again</p>
        `;
        loadButtonVisiblity('invisible');
        dataToggler('none');
    }
    
    const displayPhone = document.getElementById('display-phone');
    displayPhone.textContent = '';
    allPhone.forEach(singleData =>{
        const singlePhone = document.createElement('div');
        singlePhone.classList.add('col');
        // console.log(singleData);
        singlePhone.innerHTML = `
        <div class="card py-lg-2 py-2 border-0 tm-shadow">
            <img class="img-fluid p-3 mx-auto" src="${singleData.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${singleData.phone_name}</h5>
                <p class="card-text text-center">Brand: ${singleData.brand}</p>
                <div class="d-flex justify-content-center">
                    <a href="#details" onclick="fetchDetail('${singleData.slug}')" class="btn tm-bg text-white">Show Details</a>
                </div>
            </div>
        </div>
        `;
        displayPhone.appendChild(singlePhone);

        // data loading toggler
        dataToggler('none');
    })
}

// Store Search Data
let searcResult = [''];

// Search Button
document.getElementById('search-btn').addEventListener('click', () =>{
    const searchInput = searchBar();
    const searchValue = searchInput.value;

    // search data loawer case
    const searchLowerCase = searchValue.toLowerCase();
    fetchData(searchLowerCase);

    const searchError = document.getElementById('search-error');
    searchError.classList.remove('my-5')
    searchError.innerHTML = ``;
    // reset search bar value afeter click search
    if(searchInput.value == ''){
        dataToggler('none')
        loadButtonVisiblity('invisible');

    }else{
        dataToggler('block')
        // Load Data Button
        loadButtonVisiblity('visible');

    }
    searcResult[0] = (searchLowerCase);
    console.log(typeof searchLowerCase);
    searchInput.value = '';

    // Details Datas reset
    const detailSection = document.getElementById('details');
    detailSection.textContent = '';
});

// Fetch All Data from API
const fetchAllSearch = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => phonsesData(data.data))
}

const phonsesData = (data) =>{
    const displayPhone = document.getElementById('display-phone');
    displayPhone.textContent = '';
    data.forEach(singleData =>{
        const singlePhone = document.createElement('div');
        singlePhone.classList.add('col');
        // console.log(singleData);
        singlePhone.innerHTML = `
        <div class="card py-lg-2 py-3 border-0 tm-shadow">
            <img class="img-fluid p-3 mx-auto" src="${singleData.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${singleData.phone_name}</h5>
                <p class="card-text text-center">Brand: ${singleData.brand}</p>
                <div class="d-flex justify-content-center">
                    <a href="#details" onclick="fetchDetail('${singleData.slug}')" class="btn tm-bg text-white">Show Details</a>
                </div>
            </div>
        </div>
        
        `;
        displayPhone.appendChild(singlePhone);
        // Data loading toggler
        dataToggler('none')
    });
    loadButtonVisiblity('invisible')

    // Search Bar value reset
    const searchInput = searchBar();
    searchInput.value = '';
};

// Load More Button Visiblity
const loadButtonVisiblity = (visibleity) => {
    if(visibleity == 'visible'){
        const loadMore  = document.getElementById('load-more-Data');
        loadMore.style.display= 'block';
    }else if(visibleity == 'invisible'){
        const loadMore  = document.getElementById('load-more-Data');
        loadMore.style.display= 'none';
    }
};

// load more button Event Handler
document.getElementById('load-more-Data').addEventListener('click',() =>{
    const lastSearch = searcResult[0];
    console.log(lastSearch)
    fetchAllSearch(lastSearch);
});

// Spinner Data Loading
const dataToggler = displayProperty =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display =displayProperty;
};