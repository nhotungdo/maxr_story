const fs = require('fs');
let content = fs.readFileSync('src/data/data.ts', 'utf8');

// Fix CHAPTERS
const chaptersReplacement = `export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Chương 1: Đối tượng và phương pháp nghiên cứu",
    concept: "Quy luật vận động khách quan của thị trường",
    description: "Bạn vừa bước vào kinh doanh. Mọi thứ thật bỡ ngỡ. Tại sao có ngày đông khách nhưng có ngày lại vắng ngắt? Phải chăng do may rủi hay có quy luật kinh tế ẩn giấu đằng sau?",
    getScenario: (char, currentStaff) => getChapterScenario(1, char, currentStaff)
  },
  {
    id: 2,
    title: "Chương 2: Hàng hóa",
    concept: "Thuộc tính của Hàng hóa & Lượng giá trị",
    description: "Hàng hóa có hai thuộc tính: Giá trị sử dụng và Giá trị. Làm thế nào để định giá sản phẩm và cân bằng giữa chất lượng sản phẩm với chi phí sản xuất?",
    getScenario: (char, currentStaff) => getChapterScenario(2, char, currentStaff)
  },
  {
    id: 3,
    title: "Chương 3: Tiền tệ",
    concept: "Chức năng của Tiền tệ",
    description: "Tiền tệ không chỉ là những tờ giấy bạc, nó thực hiện các chức năng cốt lõi trong nền kinh tế thị trường. Hãy lựa chọn phương thức giao dịch để tăng tốc độ lưu thông dòng tiền.",
    getScenario: (char, currentStaff) => getChapterScenario(3, char, currentStaff)
  },
  {
    id: 4,
    title: "Chương 4: Giá trị thặng dư",
    concept: "Nguồn gốc của Giá trị thặng dư & Sức lao động",
    description: "Giá trị thặng dư là nguồn gốc tích lũy của tư bản. Làm thế nào để điều phối giờ làm việc, tiền lương và động viên sức lao động của nhân viên một cách hiệu quả?",
    getScenario: (char, currentStaff) => getChapterScenario(4, char, currentStaff)
  },
  {
    id: 5,
    title: "Chương 5: Cạnh tranh",
    concept: "Cạnh tranh trong nền Kinh tế thị trường",
    description: "Cạnh tranh là động lực thúc đẩy nền kinh tế nhưng cũng vô cùng tàn nhẫn. Một đối thủ mạnh xuất hiện ngay sát bên cạnh bạn để tranh giành khách hàng.",
    getScenario: (char, currentStaff) => getChapterScenario(5, char, currentStaff)
  },
  {
    id: 6,
    title: "Chương 6: Độc quyền",
    concept: "Sự xuất hiện của các Tổ chức Độc quyền lớn",
    description: "Các ông lớn độc quyền sở hữu tiềm lực tài chính khổng lồ có thể bóp nghẹt các cửa hàng nhỏ. Làm thế nào để sống sót trước gã khổng lồ độc quyền?",
    getScenario: (char, currentStaff) => getChapterScenario(6, char, currentStaff)
  },
  {
    id: 7,
    title: "Chương 7: Kinh tế thị trường định hướng XHCN",
    concept: "Vai trò quản lý của Nhà nước & Kinh tế định hướng XHCN",
    description: "Nền kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam gắn liền phát triển kinh tế với công bằng xã hội. Hãy tận dụng chính sách nhà nước để cất cánh.",
    getScenario: (char, currentStaff) => getChapterScenario(7, char, currentStaff)
  }
];`;
content = content.replace(/export const CHAPTERS: Chapter\[\] = \[[\s\S]*?\];/g, chaptersReplacement);

// Fix ENDINGS
const endingsReplacement = `export const ENDINGS: Ending[] = [
  {
    id: "ending_a_sustainable",
    title: "Ending A – Doanh nghiệp phát triển bền vững",
    description: "Doanh nghiệp của bạn đã vượt qua tất cả các thử thách thị trường đầy ngoạn mục! Nhờ nâng cao năng suất cá biệt và không ngừng cải tiến chất lượng sản phẩm (giá trị sử dụng), bạn đã xây dựng được một thương hiệu uy tín vững vàng, được khách hàng trao gửi trọn vẹn niềm tin. Đây chính là minh chứng rõ nét cho việc ứng dụng khoa học quy luật giá trị vào thực tế.",
    bgGradient: "from-green-500/20 via-emerald-600/20 to-teal-700/20",
    illustration: "🏆"
  },
  {
    id: "ending_b_bankrupt",
    title: "Ending B – Phá sản và bài học xương máu",
    description: "Thật đáng tiếc, doanh nghiệp của bạn đã cạn kiệt nguồn lực tài chính trước sự khốc liệt của thị trường tự do. Việc quản lý chi phí lao động xã hội kém hiệu quả, tham gia vào các cuộc chiến phá giá mù quáng, hoặc bóc lột quá mức sức lao động của nhân viên đã dẫn tới kết quả thất bại hôm nay. Hãy xem đây là một bài học đắt giá về sự vận hành không khoan nhượng của quy luật cạnh tranh.",
    bgGradient: "from-red-500/20 via-rose-600/20 to-neutral-800/20",
    illustration: "💸"
  },
  {
    id: "ending_c_monopoly_chain",
    title: "Ending C – Trở thành chuỗi cửa hàng hùng mạnh",
    description: "Tuyệt vời! Từ một cửa hàng nhỏ ban đầu, bạn đã thực hiện thành công quá trình tích tụ và tập trung tư bản để vươn mình trở thành một chuỗi thương hiệu lớn mạnh! Bằng cách mở rộng quy mô sản xuất, tối ưu hóa công nghệ hiện đại và chiếm lĩnh phân khúc thị trường chất lượng cao, bạn giờ đây nắm giữ lợi thế cạnh tranh tuyệt đối.",
    bgGradient: "from-blue-500/20 via-indigo-600/20 to-violet-700/20",
    illustration: "🏢"
  },
  {
    id: "ending_d_socialist_oriented",
    title: "Ending D – Doanh nghiệp phát triển cùng cộng đồng",
    description: "Xin chúc mừng thành tựu cao quý nhất! Bạn không chỉ làm giàu cho bản thân mà còn kết hợp hoàn hảo giữa lợi ích kinh tế với trách nhiệm xã hội. Bằng cách tận dụng tuyệt vời các chính sách hỗ trợ phát triển xanh của Nhà nước trong nền kinh tế thị trường định hướng XHCN, chăm lo đầy đủ đời sống vật chất và tinh thần cho người lao động, doanh nghiệp của bạn đã trở thành ngọn hải đăng sáng ngời vì cộng đồng xã hội phồn vinh!",
    bgGradient: "from-amber-500/20 via-orange-600/20 to-yellow-600/20",
    illustration: "🤝"
  },
  {
    id: "ending_e_jail",
    title: "Ending E – Vòng lao lý và Đổ vỡ",
    description: "Bạn đã vi phạm nghiêm trọng pháp luật và đạo đức kinh doanh. Lợi nhuận không thể đánh đổi bằng việc chà đạp lên quy luật khách quan và lợi ích cộng đồng. Cơ quan chức năng đã vào cuộc, doanh nghiệp của bạn bị đình chỉ và bạn đối mặt với các hình phạt thích đáng. Đây là dấu chấm hết cho một sự nghiệp bất chính!",
    bgGradient: "from-gray-700/50 via-gray-900/50 to-black/50",
    illustration: "🚔"
  }
];`;
content = content.replace(/export const ENDINGS: Ending\[\] = \[[\s\S]*?\];/g, endingsReplacement);

// Fix determineEnding
const detEndingReplacement = `export function determineEnding(stats: { money: number; reputation: number; knowledge: number }, isViolation: boolean = false): Ending {
  if (isViolation) {
    return ENDINGS[4]; // Ending E - Vòng lao lý
  }
  if (stats.money <= 0) {
    return ENDINGS[1]; // Phá sản
  }
  if (stats.reputation >= 85 && stats.knowledge >= 70) {
    return ENDINGS[3]; // Doanh nghiệp phát triển cùng cộng đồng (Ending D)
  }
  if (stats.money >= 40 && stats.reputation >= 70) {
    return ENDINGS[2]; // Trở thành chuỗi cửa hàng hùng mạnh (Ending C)
  }
  return ENDINGS[0]; // Doanh nghiệp phát triển bền vững (Ending A)
}`;
content = content.replace(/export function determineEnding\([\s\S]*?}\n/g, detEndingReplacement + '\n');

fs.writeFileSync('src/data/data.ts', content);
