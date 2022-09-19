/* (1)
 * Write a function which accepts an array of URLs. Each URL will respond with a JSON object
 * https://api.genderize.io/?name=luc 
 * https://api.nationalize.io/?name=nathaniel
 * https://official-joke-api.appspot.com/random_joke 
 * a. When each URL finishes fetching, log each response to console.
 * b. Modify your solution to log all responses at once, after all URLs have finished fetching.
 */

// (1).a

const urls = [
    'https://api.genderize.io/?name=luc',
    'https://api.nationalize.io/?name=nathaniel',
    'https://official-joke-api.appspot.com/random_joke'
];

async function fetchUrls(arr) {
    for (let i = 0; i < arr.length; i++) {
        const response = await fetch(arr[i]);
        console.log(await response.json());
    }
}

fetchUrls(urls);

// (1).b

let requests = urls.map(url => fetch(url));

async function handler(response) {
    console.log(await response.json());
}

Promise.all(requests).then(responses => responses.forEach(response => {
    handler(response)
}));

/* (2)
 * Create a list and display data about Bitcoin Index using the following API
 * https://api.coindesk.com/v1/bpi/currentprice.json
 * Add a refresh button which should reload the data each time you click on it.  
 * Display a loading image or text while loading data.
 */

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const wrapper = document.getElementById('fetched-data');

async function fetchBitcoin() {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        printData(data);
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
}

function printData(data) {
    cleanTheWrapper();

    const title = document.createElement('h1');
    title.innerHTML = `${data.chartName} data`;

    // convert ISO date time to local date time
    const utcDate = data.time.updatedISO;
    const date = new Date(utcDate);
    const time = document.createElement('p');
    time.innerHTML = date.toLocaleString();


    const bpiList = document.createElement('ul');

    // display a list element for each currency
    for (const property in data.bpi) {
        const li = document.createElement("li");
        const bpiObj = data.bpi[property];

        const code = document.createElement('strong');
        code.innerHTML = bpiObj.code;
        code.classList.add('code');
        const description = document.createElement('p');
        description.innerHTML = bpiObj.description;
        description.classList.add('description');
        const price = document.createElement('h3');
        price.classList.add('price');
        price.innerHTML = bpiObj.symbol + bpiObj.rate;

        li.append(code, description, price);

        bpiList.appendChild(li);
    }

    // display the disclaimer
    const disclaimer = document.createElement('small');
    disclaimer.classList.add('disclaimer');
    disclaimer.innerHTML = data.disclaimer;

    wrapper.append(title, time, bpiList, disclaimer);
}

function displayLoader() {
    cleanTheWrapper();

    const loadingImg = document.createElement('img');
    loadingImg.src = 'loading.jpg';
    loadingImg.id = "loader";

    wrapper.appendChild(loadingImg);
}

function cleanTheWrapper() {
    wrapper.innerHTML = '';
}

function getBitcoinData() {
    displayLoader();
    // it will fetch the data after 1,5 seconds, to see the loading image
    setTimeout(fetchBitcoin, 1500);
}

getBitcoinData();

const container = document.getElementById('container');

const btn = document.createElement('button');
btn.innerHTML = 'refresh';
container.appendChild(btn);

btn.addEventListener('click', getBitcoinData);