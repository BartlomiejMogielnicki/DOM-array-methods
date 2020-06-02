const main = document.getElementById('main');
const addBtn = document.getElementById('addBtn');
const doubleBtn = document.getElementById('doubleBtn');
const millionairesBtn = document.getElementById('millionairesBtn');
const sortBtn = document.getElementById('sortBtn');
const sumMoneyBtn = document.getElementById('sumMoneyBtn');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user API and add random amount of money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    // Create newUser object
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    // Pass new object to another function
    addData(newUser);
}

// Push new objects to data array
const addData = (obj) => {
    data.push(obj);

    updateDOM();
}

// Update DOM to show new person objects
const updateDOM = (providedData = data) => {

    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const el = document.createElement('div');
        el.classList.add('person');
        el.innerHTML = `<strong>${item.name}</strong> $${formatMoney(item.money)}`;
        main.appendChild(el);
    })
};

// Format number as money
const formatMoney = (item) => {
    return item.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Double money
const doubleMoney = () => {
    data = data.map(item => {
        return {
            ...item,
            money: item.money * 2
        };
    })
    updateDOM();
};


// Add event liseners
addBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);