// 初始情報數據
const initialData = [
    {
        id: "1",
        date: "1945-08-15",
        content: "重要情報：第二次世界大戰結束"
    },
    {
        id: "2",
        date: "1969-07-20",
        content: "阿波羅11號成功登月"
    },
    {
        id: "3",
        date: "1989-11-09",
        content: "柏林圍牆倒塌"
    }
];

// DOM 元素
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const addView = document.getElementById('add-view');
const intelligenceList = document.getElementById('intelligence-list');
const detailDate = document.getElementById('detail-date');
const detailContent = document.getElementById('detail-content');
const addBtn = document.getElementById('add-btn');
const backBtn = document.getElementById('back-btn');
const cancelBtn = document.getElementById('cancel-btn');
const addForm = document.getElementById('add-form');
const dateInput = document.getElementById('date-input');
const contentInput = document.getElementById('content-input');

// 當前數據
let intelligenceData = [];

// 初始化應用
function initApp() {
    // 從 localStorage 讀取數據，如果沒有則使用初始數據
    const savedData = localStorage.getItem('intelligenceData');
    if (savedData) {
        intelligenceData = JSON.parse(savedData);
    } else {
        intelligenceData = [...initialData];
        saveToLocalStorage();
    }

    renderIntelligenceList();
    setupEventListeners();
}

// 渲染情報列表
function renderIntelligenceList() {
    intelligenceList.innerHTML = '';
    
    intelligenceData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'intelligence-item';
        itemElement.textContent = item.date;
        itemElement.dataset.id = item.id;
        
        intelligenceList.appendChild(itemElement);
    });
}

// 設置事件監聽器
function setupEventListeners() {
    // 點擊情報項目顯示詳情
    intelligenceList.addEventListener('click', (e) => {
        const item = e.target.closest('.intelligence-item');
        if (item) {
            const id = item.dataset.id;
            showDetail(id);
        }
    });

    // 返回按鈕
    backBtn.addEventListener('click', showList);
    cancelBtn.addEventListener('click', showList);

    // 添加按鈕
    addBtn.addEventListener('click', showAddForm);

    // 提交表單
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addIntelligence();
    });
}

// 顯示情報詳情
function showDetail(id) {
    const item = intelligenceData.find(item => item.id === id);
    if (item) {
        detailDate.textContent = item.date;
        detailContent.textContent = item.content;
        
        listView.classList.add('hidden');
        addView.classList.add('hidden');
        detailView.classList.remove('hidden');
    }
}

// 顯示列表視圖
function showList() {
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
    addView.classList.add('hidden');
}

// 顯示添加表單
function showAddForm() {
    listView.classList.add('hidden');
    detailView.classList.add('hidden');
    addView.classList.remove('hidden');
    
    // 清空表單
    dateInput.value = '';
    contentInput.value = '';
}

// 添加新情報
function addIntelligence() {
    const date = dateInput.value.trim();
    const content = contentInput.value.trim();
    
    if (date && content) {
        const newItem = {
            id: Date.now().toString(),
            date,
            content
        };
        
        intelligenceData.push(newItem);
        saveToLocalStorage();
        renderIntelligenceList();
        showList();
    }
}

// 保存到 localStorage
function saveToLocalStorage() {
    localStorage.setItem('intelligenceData', JSON.stringify(intelligenceData));
}

// 啟動應用
document.addEventListener('DOMContentLoaded', initApp);
