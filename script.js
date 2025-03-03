// 音效功能
function playRetroSound() {
    try {
        // 使用 Web Audio API 創建音頻上下文
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 檢查狀態並恢復 - 解決網絡環境下的聲音問題
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // 創建振盪器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 設置音頻參數
        oscillator.type = 'square'; // 方波產生更復古的聲音
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 設置頻率為 800Hz
        
        // 設置音量
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // 設置初始音量
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15); // 快速衰減
        
        // 連接節點
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 播放聲音
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15); // 播放 150 毫秒
    } catch (error) {
        console.log('音效播放失敗:', error);
        // 即使音效失敗也不影響應用功能
    }
}

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

// 刪除情報
function deleteIntelligence(id) {
    // 確認刪除
    if (confirm('確定要刪除這條情報嗎？')) {
        // 播放音效
        playRetroSound();
        
        // 從數組中過濾掉要刪除的項目
        intelligenceData = intelligenceData.filter(item => item.id !== id);
        
        // 保存到 localStorage
        saveToLocalStorage();
        
        // 如果在詳情視圖，返回列表視圖
        showList();
        
        // 重新渲染列表
        renderIntelligenceList();
    }
}

// 渲染情報列表
function renderIntelligenceList() {
    intelligenceList.innerHTML = '';
    
    intelligenceData.forEach(item => {
        // 創建容器
        const itemContainer = document.createElement('div');
        itemContainer.className = 'intelligence-item-container';
        
        // 創建情報項目
        const itemElement = document.createElement('div');
        itemElement.className = 'intelligence-item';
        itemElement.textContent = item.date;
        itemElement.dataset.id = item.id;
        
        // 創建刪除按鈕
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.innerHTML = '&times;'; // × 符號
        deleteButton.title = '刪除情報';
        deleteButton.dataset.id = item.id;
        deleteButton.onclick = (e) => {
            e.stopPropagation(); // 防止觸發項目點擊事件
            deleteIntelligence(item.id);
        };
        
        // 組合元素
        itemContainer.appendChild(itemElement);
        itemContainer.appendChild(deleteButton);
        
        intelligenceList.appendChild(itemContainer);
    });
}

// 設置事件監聽器
function setupEventListeners() {
    // 點擊情報項目顯示詳情
    intelligenceList.addEventListener('click', (e) => {
        const item = e.target.closest('.intelligence-item');
        if (item) {
            playRetroSound(); // 播放音效
            const id = item.dataset.id;
            showDetail(id);
        }
    });

    // 返回按鈕
    backBtn.addEventListener('click', () => {
        playRetroSound(); // 播放音效
        showList();
    });
    
    cancelBtn.addEventListener('click', () => {
        playRetroSound(); // 播放音效
        showList();
    });

    // 添加按鈕
    addBtn.addEventListener('click', () => {
        playRetroSound(); // 播放音效
        showAddForm();
    });

    // 提交表單
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playRetroSound(); // 播放音效
        addIntelligence();
    });
    
    // 為所有按鈕添加音效
    document.querySelectorAll('button').forEach(button => {
        if (!button.hasAttribute('data-sound-added')) {
            button.setAttribute('data-sound-added', 'true');
            button.addEventListener('click', playRetroSound);
        }
    });
}

// 顯示情報詳情
function showDetail(id) {
    const item = intelligenceData.find(item => item.id === id);
    if (item) {
        detailDate.textContent = item.date;
        detailContent.textContent = item.content;
        
        // 檢查是否已經有刪除按鈕
        let deleteBtn = detailView.querySelector('.detail-delete-btn');
        
        // 如果沒有刪除按鈕，創建一個
        if (!deleteBtn) {
            deleteBtn = document.createElement('button');
            deleteBtn.className = 'detail-delete-btn';
            deleteBtn.innerHTML = '刪除此情報';
            
            // 在返回按鈕後面插入刪除按鈕
            const backButtonContainer = detailView.querySelector('.back-button');
            backButtonContainer.appendChild(deleteBtn);
        }
        
        // 更新刪除按鈕的事件處理
        deleteBtn.onclick = () => deleteIntelligence(id);
        
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
