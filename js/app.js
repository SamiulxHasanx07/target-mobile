// Fetch Data from API
const fetchData = searchText =>{
    const searchInput = document.getElementById('search-bar');

    // remove after details show 
    // searchInput.value = searchText;
    if(searchText == ''){
        searchInput.style.border = '1px solid red';
        searchInput.placeholder = 'Enter Phone Name';  
    }else{
        // console.log(typeof searchPhone)
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(response => response.json())
        .then(data => displayPhone(data.data))

        // reset search validation style 
        searchInput.style.border = '';
    }
}
// remove after details show 
fetchData('samsung')

// fetch Details
const fetchDetail = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => loadDetailsData(data.data))
    // console.log(url)
}
// fetchDetail();

// need to fetch array data 
// Load Details Section Datas
const loadDetailsData = (data) =>{
    // console.log(data)

    // Others Section Data Validation Checker
    const validChecker = (othersData)=>{
        if(othersData == undefined){
            return "Data Not Available";
        }else{
            return othersData;
        }
    }

    // Details Datas
    const detailSection = document.getElementById('details');
    detailSection.textContent = '';
    const fullSpecClass = ['row','align-items-center'];
    const fullSpec = document.createElement('div');
    fullSpec.classList.add(...fullSpecClass);
    fullSpec.innerHTML = `
        <div class="col-12 col-md-12 my-5 my-lg-0 col-lg-3 tm-shadow">
            <div class="bg-white img-wrapper d-flex align-items-center justify-content-center py-4">
                <img src="${data.image}" alt="">
            </div>
        </div>
        <div class="col-12 col-md-12 col-lg-9">
            <h2 class="my-2">${data.name}</h2>
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
                    <h4 class="text-center">Main Features</h4>
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
                                <td><p>${'this section left'}</p></td>
                            </tr>
                            <tr>
                                <th scope="row">Storage:</th>
                                <td>${data.mainFeatures.storage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-12 col-md-6">
                    <table class="table overflow="hidden">
                        <tbody>
                        <tr>
                            <th scope="row">Release Date:</th>
                            <td>${data.releaseDate}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h4 class="text-center">Others Features</h4>
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
    // console.log(data.others)
    // const specData = data?.others;
   

    detailSection.appendChild(fullSpec);

    // console.log(detailSection)
}




// Show Data in UI 
const displayPhone = allPhone =>{
    // console.log(allPhone);
    if(allPhone.length == 0){
        const searchError = document.getElementById('search-error');
        searchError.innerHTML = `
            <h4>Result Not Found</h4>
        `;
        
        dataToggler('none')
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
        <div class="card py-lg-2 py-3 border-0 tm-shadow">
            <img class="img-fluid p-3 mx-auto" src="${singleData.image}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title text-center">${singleData.phone_name}</h5>
                <p class="card-text text-center">Brand: ${singleData.brand}</p>
                <div class="d-flex justify-content-center">
                    <button onclick="fetchDetail('${singleData.slug}')" class="btn bg-color text-white">Show Details</button>
                </div>
            </div>
        </div>
        
        `;
        displayPhone.appendChild(singlePhone);
        
        dataToggler('none')
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
    if(searchInput.value == ''){
        dataToggler('none')

    }else{
        dataToggler('block')

    }
    searchInput.value = '';


    
    // Details Datas reset
    const detailSection = document.getElementById('details');
    detailSection.textContent = '';
})


const dataToggler = displayProperty =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display =displayProperty;
}