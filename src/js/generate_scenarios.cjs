const fs = require('fs');

const chaptersData = {
  1: {
    theory: "Quy luật vận động khách quan của thị trường - Phương pháp trừu tượng hóa khoa học.",
    situations: [
      "Tình hình kinh doanh biến động thất thường, khách hàng lúc đông lúc vắng.",
      "Xu hướng tiêu dùng thay đổi, sản phẩm cũ bắt đầu lỗi thời.",
      "Nhận được một núi dữ liệu báo cáo nhưng không biết bắt đầu từ đâu.",
      "Nhiều người khuyên bạn nên kinh doanh theo cảm tính và 'tâm linh'.",
      "Mô hình sao chép từ đối thủ không hiệu quả với bạn."
    ]
  },
  2: {
    theory: "Thuộc tính của Hàng hóa & Lượng giá trị - Giá trị sử dụng và Giá trị.",
    situations: [
      "Chi phí nguyên liệu tăng cao, áp lực phải giảm chất lượng để giữ giá.",
      "Sản phẩm tồn kho nhiều do thiết kế không đáp ứng được nhu cầu thực tế.",
      "Đối thủ ra mắt sản phẩm giá siêu rẻ nhưng chất lượng kém.",
      "Bạn muốn tăng giá bán nhưng sợ mất khách hàng.",
      "Khách hàng đòi hỏi bao bì đẹp hơn nhưng không muốn trả thêm tiền."
    ]
  },
  3: {
    theory: "Chức năng của Tiền tệ - Phương tiện lưu thông và thanh toán.",
    situations: [
      "Khách hàng ngày càng ưa chuộng thanh toán không tiền mặt, nhưng phí quẹt thẻ cao.",
      "Tình trạng lạm phát làm giá cả leo thang, tiền mặt mất giá.",
      "Dòng tiền lưu thông chậm do khách hàng nợ đọng nhiều.",
      "Hệ thống thanh toán số gặp sự cố bảo trì trong giờ cao điểm.",
      "Khách hàng nước ngoài muốn thanh toán bằng ngoại tệ hoặc tiền số."
    ]
  },
  4: {
    theory: "Giá trị thặng dư - Bóc lột sức lao động và tái sản xuất.",
    situations: [
      "Đơn hàng tăng đột biến, nhân viên phải làm việc quá sức.",
      "Cần tăng năng suất nhưng không muốn tăng giờ làm của nhân viên.",
      "Nhân viên đình công đòi tăng lương và cải thiện môi trường làm việc.",
      "Áp dụng máy móc mới khiến một số nhân viên lo sợ mất việc.",
      "Chi phí đào tạo nhân viên mới quá cao do tỷ lệ nghỉ việc lớn."
    ]
  },
  5: {
    theory: "Cạnh tranh - Động lực thúc đẩy và rủi ro.",
    situations: [
      "Đối thủ sát vách tung chiến dịch giảm giá sốc 50%.",
      "Thị trường xuất hiện hàng giả, hàng nhái sản phẩm của bạn.",
      "Một nhân viên cũ tách ra mở công ty riêng và giành mất khách.",
      "Đối thủ bôi nhọ uy tín của bạn trên mạng xã hội.",
      "Có quá nhiều cửa hàng mới mở làm bão hòa thị trường."
    ]
  },
  6: {
    theory: "Độc quyền - Sự chèn ép của các tập đoàn lớn.",
    situations: [
      "Một siêu tập đoàn đa quốc gia mở chi nhánh ngay đối diện bạn.",
      "Tập đoàn lớn độc quyền nguồn cung nguyên liệu và ép giá bạn.",
      "Nền tảng thương mại điện tử lớn tự ý đẩy sản phẩm của họ lên top.",
      "Tổ chức độc quyền đề nghị mua lại doanh nghiệp của bạn với giá rẻ mạt.",
      "Luật chơi thị trường bị thay đổi do sự thao túng của các ông lớn."
    ]
  },
  7: {
    theory: "Kinh tế thị trường định hướng XHCN - Vai trò Nhà nước.",
    situations: [
      "Nhà nước ban hành gói hỗ trợ vay vốn nhưng thủ tục kiểm định khắt khe.",
      "Quy định mới về bảo vệ môi trường buộc bạn phải thay đổi quy trình sản xuất.",
      "Cơ quan thuế yêu cầu minh bạch hóa toàn bộ hệ thống kế toán.",
      "Chính sách bảo hiểm xã hội mới yêu cầu đóng phí cao hơn cho nhân viên.",
      "Cơ hội tham gia chuỗi cung ứng quốc gia nếu đạt chuẩn lao động an toàn."
    ]
  }
};

const correctDecisions = [
  "Nghiên cứu kỹ lưỡng, áp dụng công nghệ và tối ưu quy trình cốt lõi.",
  "Đầu tư vào chất lượng cốt lõi, nâng cao giá trị sử dụng lâu dài.",
  "Chấp nhận đổi mới, áp dụng phương thức hiện đại và minh bạch tài chính.",
  "Đãi ngộ nhân viên xứng đáng, tạo động lực sản xuất giá trị thặng dư tương đối.",
  "Tìm thị trường ngách, cá nhân hóa sản phẩm và tạo sự khác biệt.",
  "Liên kết với các doanh nghiệp nhỏ khác, tạo sức mạnh tập thể.",
  "Tuân thủ pháp luật, tận dụng chính sách hỗ trợ để phát triển bền vững."
];

const wrongDecisions = [
  "Cắt giảm chất lượng, lừa dối khách hàng để tối đa hóa lợi nhuận nhanh.",
  "Lao vào cuộc chiến phá giá mù quáng khiến dòng tiền kiệt quệ.",
  "Phó mặc cho may rủi, không quan tâm đến sự thay đổi của thị trường.",
  "Bắt ép nhân viên làm thêm giờ không lương, bóc lột sức lao động.",
  "Trốn thuế, làm giả hồ sơ để nhận tiền hỗ trợ sai mục đích.",
  "Nghe theo lời khuyên cảm tính, đầu tư bừa bãi không tính toán.",
  "Từ chối cập nhật công nghệ, bảo thủ với phương thức kinh doanh cũ.",
  "Vay nặng lãi để mở rộng quy mô ảo mà không có nền tảng.",
  "Đóng cửa nghỉ bán mỗi khi gặp khó khăn nhỏ.",
  "Mua bài bôi nhọ đối thủ thay vì cải thiện sản phẩm của mình."
];

let output = `import { Character, Option } from "./types";\nimport { CHARACTER_TERMS } from "./data";\n\n`;
output += `function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}\n\n`;

output += `export function getChapterScenario(chapterId: number, char: Character) {
  const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
  const baseMoney = char.baseStats.money;
  const cost = Math.max(1, Math.floor(baseMoney * 0.1));
  const profit = Math.max(2, Math.floor(baseMoney * 0.2));
  const loss = Math.max(2, Math.floor(baseMoney * 0.15));

  const scenariosData: Record<number, any[]> = {\n`;

for (let i = 1; i <= 7; i++) {
  output += `    ${i}: [\n`;
  for (let j = 0; j < 5; j++) {
    const sit = chaptersData[i].situations[j];
    
    const cDec = correctDecisions[Math.floor(Math.random() * correctDecisions.length)];
    let wDecs = [...wrongDecisions];
    for(let k = wDecs.length - 1; k > 0; k--){
        const l = Math.floor(Math.random() * (k + 1));
        [wDecs[k], wDecs[l]] = [wDecs[l], wDecs[k]];
    }
    
    output += `      {
        intro: \`${sit} Bạn phải quyết định bước đi tiếp theo cho \${terms.productPlural} của mình.\`,
        question: "Bạn sẽ đưa ra quyết định gì?",
        options: shuffleArray([
          {
            id: "${i}_${j}_correct",
            text: \`Quyết định: ${cDec} (Tốn \${cost} vốn)\`,
            statsEffect: { money: profit, reputation: 10, customers: 10, knowledge: 10 },
            consequence: "Quyết định sáng suốt! Khách hàng đánh giá cao và doanh thu tăng trưởng.",
            marxTheory: "${chaptersData[i].theory}"
          },
          {
            id: "${i}_${j}_w1",
            text: \`Quyết định: ${wDecs[0]} (Tốn \${cost} vốn)\`,
            statsEffect: { money: -loss, reputation: -10, customers: -5, knowledge: 5 },
            consequence: "Sai lầm! Khách hàng quay lưng và bạn bị tổn thất tài chính nặng nề.",
            marxTheory: "${chaptersData[i].theory}"
          },
          {
            id: "${i}_${j}_w2",
            text: \`Quyết định: ${wDecs[1]} (Tốn \${cost} vốn)\`,
            statsEffect: { money: -loss, reputation: -5, customers: -10, knowledge: 2 },
            consequence: "Lựa chọn tồi tệ! Uy tín giảm sút nghiêm trọng.",
            marxTheory: "${chaptersData[i].theory}"
          },
          {
            id: "${i}_${j}_w3",
            text: \`Quyết định: ${wDecs[2]} (Tốn \${cost} vốn)\`,
            statsEffect: { money: -loss, reputation: -10, customers: -10, knowledge: 0 },
            consequence: "Không hiệu quả! Bạn lãng phí nguồn lực vô ích.",
            marxTheory: "${chaptersData[i].theory}"
          },
          {
            id: "${i}_${j}_w4",
            text: \`Quyết định: ${wDecs[3]} (Tốn \${cost} vốn)\`,
            statsEffect: { money: -loss, reputation: -5, customers: -5, knowledge: 5 },
            consequence: "Thiếu tầm nhìn! Doanh nghiệp rơi vào khủng hoảng.",
            marxTheory: "${chaptersData[i].theory}"
          }
        ])
      },\n`;
  }
  output += `    ],\n`;
}

output += `  };

  const situations = scenariosData[chapterId];
  const randomSituation = situations[Math.floor(Math.random() * situations.length)];
  return randomSituation;
}
`;

fs.writeFileSync('src/scenarios.ts', output);
console.log('Generated src/scenarios.ts');
