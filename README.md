# MaxR Story - Kinh tế chính trị Mác - Lênin trực quan

MaxR Story là một tựa game mô phỏng kinh doanh (Business Simulation Game) tương tác được thiết kế đặc biệt nhằm đưa các khái niệm học thuật của môn Kinh tế chính trị Mác - Lênin vào thực tiễn thương trường. Thông qua các kịch bản đa nhánh và phản hồi trực tiếp từ AI, người chơi sẽ học cách vận dụng quy luật thị trường, giá trị thặng dư và cạnh tranh vào việc ra quyết định kinh doanh.

## 🌟 Tính năng nổi bật

- **Nhập vai đa dạng:** Lựa chọn 1 trong 20 nhân vật thuộc 5 khối ngành khác nhau (Sản xuất, Dịch vụ, Bán lẻ, Công nghệ số, Nông nghiệp).
- **Kịch bản đa nhánh (Decision Tree):** Các tình huống giả định được hệ thống tự động chắt lọc sao cho phù hợp nhất với ngành nghề kinh doanh của bạn. Mỗi quyết định đúng/sai đều rẽ nhánh sang một diễn biến phụ riêng biệt.
- **Tích hợp Giáo sư AI (Gemini):** Đánh giá các quyết định kinh doanh của bạn dưới góc nhìn Kinh tế chính trị Mác - Lênin, cung cấp bài học chuyên sâu ngay tại thời gian thực.
- **Hệ thống chỉ số sinh tồn:** Cân bằng giữa Vốn, Uy tín, Khách hàng, Nhân sự và Tri thức Mác - Lênin để đưa doanh nghiệp đến kết thúc có hậu (hoặc tránh bị phá sản).
- **Hệ thống Huy chương & Đa kết cục:** Mở khóa các danh hiệu học thuật và trải nghiệm những cái kết khác nhau dựa trên năng lực điều hành của bạn.

## 🚀 Hướng dẫn cài đặt và chạy nội bộ (Run Locally)

**Yêu cầu hệ thống:** Node.js

1. **Cài đặt các gói phụ thuộc (Dependencies):**
   \`\`\`bash
   npm install
   \`\`\`

2. **Cấu hình API Key:**
   - Tạo hoặc chỉnh sửa tệp \`.env.local\` ở thư mục gốc của dự án.
   - Điền API Key của Google Gemini vào biến môi trường:
   \`\`\`env
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

3. **Khởi chạy ứng dụng:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Ứng dụng sẽ tự động mở hoặc bạn có thể truy cập thông qua trình duyệt tại địa chỉ được hiển thị trên terminal (thường là \`http://localhost:5173\`).

## 🛠 Công nghệ sử dụng
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **AI Integration:** Google Gemini API (AI Studio)
