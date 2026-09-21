# INFO3020 – Time-Series Air Pollution Analysis Roadmap

Landing page tĩnh, hiện đại và chuẩn mực học thuật, trực quan hóa toàn bộ lộ trình thực hiện đồ án môn học **INFO3020 – Introduction to Data Science** (Khoa CNTT & Truyền thông, Trường Đại học CMC).

Đề tài: **Phân tích mức độ ô nhiễm không khí theo thời gian (Time-Series Air Pollution Analysis)**.

---

## 1. Giới thiệu tổng quan

Trang web là giao diện trình bày trực quan bản lộ trình học thuật `ROADMAP_INFO3020_Air_Pollution.md`, hỗ trợ sinh viên và nhóm nghiên cứu theo dõi tiến độ từng tuần theo chuẩn CRISP-DM:
- **Thời lượng:** 15 Tuần &bull; 5 Chương học phần.
- **Quy mô dữ liệu:** Chuỗi thời gian 2 năm (2023–2024) theo giờ, tích hợp trạm đo tham chiếu BAM 1020 (OpenAQ) và khí tượng tái phân tích ERA5 (Open-Meteo).
- **Bộ 7 biểu đồ Explanatory:** Chuẩn phong cách Edward Tufte và Cleveland.
- **Suy luận & Mô hình hóa:** Kiểm định giả thuyết phi tham số (Mann-Whitney U, Bootstrap CI, Effect Size), Hồi quy OLS (LINE diagnostics, VIF, Cook's distance) và Phân loại cảnh báo sớm ô nhiễm (Recall, PR-AUC, Threshold Tuning).
- **Đạo đức & Trách nhiệm giải trình:** Kiểm toán định kiến (Sensor, Spatial, Survivorship Bias), Datasheet for Dataset, Model Card 1 trang và Tuyên bố sử dụng AI.

---

## 2. Công nghệ sử dụng

Trang web được thiết kế hoàn toàn tĩnh, tải nhẹ và mượt mà trên mọi thiết bị:
- **HTML5:** Cấu trúc ngữ nghĩa (Semantic HTML), tương thích bộ đọc màn hình (WCAG 2.1).
- **CSS3:** Thiết kế Technical Dashboard với biến CSS (CSS Custom Properties), bố cục Flexbox & CSS Grid, hỗ trợ chế độ Dark/Light và `prefers-reduced-motion`.
- **Vanilla JavaScript (ES6+):** Xử lý chuyển đổi giao diện, bộ lọc tuần theo giai đoạn, tương tác checklist lưu `localStorage`, thanh tiến trình đọc, tra cứu tìm kiếm Client-side (Ctrl+K) và sao chép cấu trúc repo một chạm.
- **Không sử dụng bất kỳ thư viện hay framework bên ngoài nào:** Không cần npm, Node.js, Webpack hay CDN bên ngoài, sẵn sàng triển khai ngay lập tức.

---

## 3. Cấu trúc thư mục

```text
/
├── index.html                           # Giao diện chính chứa 15 phân mục học thuật
├── styles.css                           # Toàn bộ mã nguồn định kiểu và biến giao diện
├── script.js                            # Logic tương tác vanilla JS (Theme, Search, Timeline)
├── ROADMAP_INFO3020_Air_Pollution.md     # Single Source of Truth học thuật
└── README.md                            # Hướng dẫn chạy cục bộ và triển khai GitHub Pages
```

---

## 4. Hướng dẫn chạy thử nghiệm cục bộ (Local Development)

Bạn có thể chạy website trực tiếp mà không cần cài đặt môi trường phức tạp:

### Cách 1: Mở trực tiếp bằng trình duyệt
Nhấp đúp chuột vào file `index.html` hoặc bấm chuột phải chọn **Open with** &rarr; **Google Chrome / Microsoft Edge / Firefox**.

### Cách 2: Sử dụng Python HTTP Server (Khuyến nghị)
Nếu máy tính đã cài đặt Python, mở terminal tại thư mục dự án và chạy:

```powershell
python -m http.server 8000
```

Sau đó truy cập trình duyệt tại: `http://localhost:8000`

### Cách 3: Sử dụng Live Server trong VS Code
Cài đặt extension **Live Server** trong Visual Studio Code, bấm chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## 5. Hướng dẫn Triển khai lên GitHub Pages (Deploy to GitHub Pages)

Dự án sử dụng đường dẫn tương đối (`./styles.css`, `./script.js`), đảm bảo hoạt động hoàn hảo dưới mọi tiền tố subpath của GitHub Pages (ví dụ: `https://<username>.github.io/<repo-name>/`).

### Các bước thực hiện:
1. Đẩy toàn bộ mã nguồn lên repository GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit for INFO3020 Air Pollution roadmap landing page"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
2. Trên giao diện GitHub của repository:
   - Truy cập **Settings** (Cài đặt) &rarr; chọn tab **Pages** ở thanh bên trái.
   - Tại mục **Build and deployment**:
     - **Source:** Chọn `Deploy from a branch`.
     - **Branch:** Chọn `main` và thư mục `/ (root)`.
   - Bấm nút **Save**.
3. Sau khoảng 1–2 phút, GitHub Pages sẽ tạo đường link công khai:
   ```text
   https://<username>.github.io/<repo-name>/
   ```
   Bạn có thể truy cập ngay mà không cần qua bất kỳ bước build hay compile nào.

---

## 6. Hướng dẫn Cập nhật Nội dung Lộ trình

- Toàn bộ nội dung học thuật bám sát file `ROADMAP_INFO3020_Air_Pollution.md`.
- Để thay đổi nội dung các tuần, mở file `index.html` và tìm tới phân mục `<section id="roadmap">`:
  - Mỗi tuần được bao bọc bởi một thẻ `<article class="timeline-card" data-week="X" data-phase="pY">`.
  - Cập nhật mục tiêu, nhiệm vụ chính (Tasks), sản phẩm (Deliverables) hoặc Definition of Done trực tiếp trong các thẻ con.
- Để cập nhật chỉ mục tìm kiếm nhanh (Search Index), mở file `script.js` và chỉnh sửa mảng `searchIndex`.
- Để điều chỉnh bảng màu hoặc font chữ, mở file `styles.css` và cập nhật các biến `:root` hoặc `[data-theme="light"]`.

---

## 7. Tiêu chuẩn và Liêm chính Học thuật

- Dự án tuân thủ nghiêm ngặt nguyên tắc liêm chính học thuật: Các số liệu ví dụ hoặc biểu đồ trong kế hoạch được dán nhãn minh bạch là **PLANNED VISUALIZATION** hoặc **Illustrative example from roadmap**, phân biệt rạch ròi với kết quả thực nghiệm sau khi chạy code hoàn chỉnh.
- Mọi thắc mắc và đóng góp vui lòng tham chiếu tài liệu nguồn `ROADMAP_INFO3020_Air_Pollution.md` hoặc trao đổi trực tiếp cùng giảng viên hướng dẫn ThS. Phạm Ngọc Đông.
