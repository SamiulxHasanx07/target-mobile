

const fetchData = phoneName =>{
    const url = `https://openapi.programming-hero.com/api/phones?`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayPhone(data.data))
}

fetchData('Data')


const displayPhone = allPhone =>{
    allPhone.forEach(singleData =>{
        console.log(singleData);
    })
}