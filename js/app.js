

const fetchData = phoneName =>{
    const url = `https://openapi.programming-hero.com/api/phones?`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))
}

fetchData('Data')


const displayPhone = allPhone =>{

    const displayPhone = document.getElementById('display-phone');
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