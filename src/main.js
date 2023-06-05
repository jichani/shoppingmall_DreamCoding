// 제이슨 파일로 부터 아이템들을 받아온다.
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// join 메서드를 사용하지 않으면 배열 상태이므로 중간중간 ,가 추가된다.
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
        <li class="item">
            <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
            <span class="item__description">${item.gender}, ${item.size}</span>
        </li>
    `
}

function onButtonClick(event, items) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;

    if (key == null || value == null) {
        return;
    }
    // updateItems(items, key, value);

    // 업데이트를 하는 것보다는 css 속성을 주어서 사라졌다가 나타났다가 하는 편이 좋다.
    const filtered = items.filter(item => item[key] === value);
    // console.log(filtered);
    displayItems(filtered);
}
// Make the items matching {key: value} invisible.
// function updateItems(items, key, value) {
//     items.forEach(item => {
//         if (item.dataset[key] === value) {
//             item.classList.remove('invisible');
//         } else {
//             item.classList.add('invisible');
//         }
//     });
// }

// 버튼을 눌렀을 때 정렬되게 하는 것
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
    .then(items => {
        // console.log(items)
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);