# 部署指南

本文檔提供將「情報官」應用部署到 GitHub Pages 的步驟。

## 部署步驟

1. 確保您已經安裝了 Git 並配置了 GitHub 帳戶。

2. 如果這是您第一次部署：
   - 在 GitHub 上創建一個名為 `intelligence-officer` 的新倉庫
   - 確保倉庫是公開的（Public）

3. 推送代碼到 GitHub：
   - 如果您的默認分支是 `main`，運行 `push-to-github.bat`
   - 如果您的默認分支是 `master`，運行 `push-to-github-master.bat`
   - 系統會要求您輸入 GitHub 用戶名和密碼（或個人訪問令牌）

4. 設置 GitHub Pages：
   - 在 GitHub 上打開您的倉庫
   - 點擊 "Settings" 選項卡
   - 滾動到 "GitHub Pages" 部分
   - 在 "Source" 下拉菜單中選擇 `main` 或 `master` 分支
   - 點擊 "Save"

5. 訪問您的網站：
   - 部署完成後，您可以通過 https://[您的用戶名].github.io/intelligence-officer/ 訪問您的網站
   - 例如：https://pppeee861005.github.io/intelligence-officer/

## 更新現有部署

如果您已經部署過應用，只需運行相應的批處理文件即可更新：
- `push-to-github.bat` (main 分支)
- `push-to-github-master.bat` (master 分支)

GitHub Pages 通常會在幾分鐘內自動更新。

## 注意事項

- 如果您在瀏覽器中看不到更新，請嘗試清除瀏覽器緩存（按 Ctrl+F5 或 Cmd+Shift+R）
- 用戶數據存儲在瀏覽器的 localStorage 中，更新網站不會影響現有用戶的數據
