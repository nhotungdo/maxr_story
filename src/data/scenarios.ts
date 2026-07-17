import { Character, Option } from "../types/types";
import { CHARACTER_TERMS } from "./data";

type TemplateContext = {
  productName: string;
  productPlural: string;
  workforce: string;
  competitor: string;
  monopolyProduct: string;
  investmentOption: string;
};

type SituationTemplate = {
  intro: string;
  correct: string;
  wrong: string;
};

const chapterTemplates: Record<number, { theory: string, situations: SituationTemplate[] }> = {
  1: {
    theory: "Quy luật vận động khách quan của thị trường - Phương pháp trừu tượng hóa khoa học.",
    situations: [
      {
        intro: "Thị trường {productPlural} bỗng nhiên thay đổi xu hướng, khách hàng bắt đầu ưa chuộng {monopolyProduct} tiện lợi hơn.",
        correct: "Nhanh chóng nghiên cứu và tung ra phiên bản {productName} mới phù hợp với thị hiếu.",
        wrong: "Vẫn kiên quyết chỉ bán {productPlural} cũ và phó mặc cho may rủi."
      },
      {
        intro: "Nguồn cung nguyên liệu để tạo ra {productName} bị đứt gãy đột ngột do biến động thị trường.",
        correct: "Chủ động tìm kiếm nhà cung cấp dự phòng và tối ưu hóa quy trình làm {productPlural}.",
        wrong: "Trực tiếp cắt giảm chất lượng {productName} để tiết kiệm chi phí nguyên liệu."
      },
      {
        intro: "Khách hàng dạo này chê bai {productName} của bạn không còn hấp dẫn như trước.",
        correct: "Thu thập phản hồi tận tình và lập tức cải tiến chất lượng {productName}.",
        wrong: "Bỏ qua ý kiến khách hàng vì cho rằng họ không hiểu gì về {productPlural}."
      },
      {
        intro: "Doanh thu bán {productPlural} tháng này sụt giảm mạnh nhưng bạn chưa rõ nguyên nhân.",
        correct: "Phân tích kỹ lưỡng dữ liệu khách hàng và triển khai chiến dịch tiếp thị nhắm mục tiêu.",
        wrong: "Đổ lỗi hoàn toàn cho sự lười biếng của {workforce} và cắt giảm lương."
      },
      {
        intro: "Một trào lưu mới trên mạng xã hội khiến cách kinh doanh {productPlural} của bạn có vẻ lỗi thời.",
        correct: "Linh hoạt tạo ra {productName} phiên bản đặc biệt để bắt kịp trào lưu.",
        wrong: "Cố chấp chi một khoản tiền khổng lồ mù quáng vào quảng cáo để níu kéo hào quang."
      }
    ]
  },
  2: {
    theory: "Thuộc tính của Hàng hóa & Lượng giá trị - Giá trị sử dụng và Giá trị.",
    situations: [
      {
        intro: "Chi phí vận hành tăng cao, tạo áp lực lớn lên giá thành của {productName}.",
        correct: "Đầu tư vào chất lượng cốt lõi, nâng cao giá trị sử dụng lâu dài cho {productPlural}.",
        wrong: "Lừa dối khách hàng bằng cách giữ nguyên giá nhưng bán ra {productName} kém chất lượng."
      },
      {
        intro: "{competitor} vừa tung ra sản phẩm giá siêu rẻ nhằm đánh bật {productPlural} của bạn.",
        correct: "Giữ vững định vị thương hiệu, tập trung làm nổi bật chất lượng vượt trội của {productName}.",
        wrong: "Lao vào cuộc chiến phá giá mù quáng khiến dòng tiền kiệt quệ."
      },
      {
        intro: "Bạn muốn tăng giá bán {productName} để bù đắp chi phí nhưng sợ mất khách hàng.",
        correct: "Tăng giá nhẹ kèm theo chương trình tri ân và nâng cao trải nghiệm dịch vụ.",
        wrong: "Tăng giá sốc đột ngột mà không hề cải thiện chất lượng {productPlural}."
      },
      {
        intro: "Hàng tồn kho {productPlural} đang quá nhiều do không đáp ứng đúng nhu cầu thực tế.",
        correct: "Mở đợt xả hàng ưu đãi và tinh chỉnh lại thiết kế {productName} cho lô sau.",
        wrong: "Ép {workforce} phải bán bằng mọi giá nếu không sẽ bị trừ lương."
      },
      {
        intro: "Khách hàng đòi hỏi bao bì của {productName} phải đẹp hơn nhưng không muốn trả thêm tiền.",
        correct: "Tìm kiếm giải pháp đóng gói thông minh, tiết kiệm nhưng vẫn sang trọng.",
        wrong: "Từ chối thẳng thừng yêu cầu của khách vì sợ tốn kém chi phí."
      }
    ]
  },
  3: {
    theory: "Chức năng của Tiền tệ - Phương tiện lưu thông và thanh toán.",
    situations: [
      {
        intro: "Khách hàng mua {productPlural} ngày càng chuộng thanh toán không tiền mặt, nhưng hệ thống của bạn hay lỗi.",
        correct: "Nâng cấp ngay hệ thống thanh toán điện tử và chấp nhận chịu một chút phí giao dịch.",
        wrong: "Kiên quyết chỉ nhận tiền mặt khiến nhiều khách hàng bỏ đi."
      },
      {
        intro: "Tình trạng lạm phát làm giá cả leo thang, dòng tiền thu về từ {productPlural} đang dần mất giá.",
        correct: "Tái đầu tư dòng tiền vào việc {investmentOption} để bảo toàn giá trị.",
        wrong: "Giữ khư khư tiền mặt trong két sắt bất chấp lạm phát tăng cao."
      },
      {
        intro: "Dòng tiền lưu thông chậm do có quá nhiều đối tác mua {productPlural} đang nợ đọng.",
        correct: "Cơ cấu lại chính sách công nợ, yêu cầu thanh toán trước một phần.",
        wrong: "Tiếp tục cho nợ bừa bãi chỉ để cố giữ mối quan hệ kinh doanh ảo."
      },
      {
        intro: "Hệ thống thanh toán số bị sập đúng vào giờ cao điểm khách mua {productPlural}.",
        correct: "Bình tĩnh chuyển sang ghi nhận thủ công và xin lỗi khách hàng kèm ưu đãi nhẹ.",
        wrong: "Hoảng loạn và đuổi khách về vì không biết tính toán tiền thủ công."
      },
      {
        intro: "Bạn dư ra một khoản tiền lớn sau vụ trúng đậm {productName}.",
        correct: "Dùng tiền đó để dự phòng rủi ro và thưởng cho {workforce}.",
        wrong: "Mang toàn bộ số tiền đi đánh bạc hoặc đầu tư ảo trên mạng lưới không uy tín."
      }
    ]
  },
  4: {
    theory: "Giá trị thặng dư - Bóc lột sức lao động và tái sản xuất.",
    situations: [
      {
        intro: "Đơn đặt hàng {productPlural} tăng đột biến, {workforce} phải làm việc quá sức.",
        correct: "Đãi ngộ nhân viên xứng đáng, trả lương làm thêm giờ sòng phẳng để giữ tinh thần.",
        wrong: "Bắt ép {workforce} làm thêm giờ không lương, vắt kiệt sức lao động của họ."
      },
      {
        intro: "Bạn cần tăng năng suất làm {productName} nhưng không muốn tăng giờ làm của nhân viên.",
        correct: "Áp dụng phương pháp làm việc mới và cải tiến quy trình để tạo giá trị thặng dư tương đối.",
        wrong: "Gây áp lực tinh thần, chửi mắng {workforce} để ép họ làm việc nhanh hơn."
      },
      {
        intro: "{workforce} rục rịch đình công đòi tăng lương vì khối lượng công việc {productPlural} quá tải.",
        correct: "Lắng nghe, thương lượng hợp lý và chia sẻ một phần lợi nhuận cho họ.",
        wrong: "Sa thải toàn bộ và tuyển người mới với mức lương bèo bọt."
      },
      {
        intro: "Bạn quyết định {investmentOption} để thay thế một phần lao động chân tay.",
        correct: "Đào tạo lại {workforce} để họ sử dụng công nghệ mới hiệu quả hơn.",
        wrong: "Đuổi việc những người cũ mà không báo trước để tiết kiệm chi phí."
      },
      {
        intro: "Chi phí đào tạo {workforce} mới quá cao do tỷ lệ nghỉ việc lớn tại cơ sở làm {productPlural}.",
        correct: "Xây dựng môi trường làm việc tốt và lộ trình thăng tiến rõ ràng để giữ chân nhân tài.",
        wrong: "Bớt xén chi phí đào tạo, ép người mới làm ngay dù họ chưa biết gì."
      }
    ]
  },
  5: {
    theory: "Cạnh tranh - Động lực thúc đẩy và rủi ro.",
    situations: [
      {
        intro: "{competitor} tung chiến dịch giảm giá cực sốc 50% để giành giật khách mua {productPlural}.",
        correct: "Tìm thị trường ngách, cá nhân hóa {productName} và tạo sự khác biệt về dịch vụ.",
        wrong: "Cuống cuồng giảm giá 60% dẫn đến bán lỗ và cạn kiệt nguồn vốn."
      },
      {
        intro: "Thị trường xuất hiện đầy rẫy hàng giả, hàng nhái {productName} của bạn.",
        correct: "Đăng ký bản quyền thương hiệu và giáo dục khách hàng cách nhận biết hàng thật.",
        wrong: "Ngó lơ và tự huyễn hoặc rằng 'hữu xạ tự nhiên hương'."
      },
      {
        intro: "Một trong số {workforce} cốt cán nghỉ việc, mở cơ sở riêng bán {productPlural} đối đầu trực tiếp.",
        correct: "Tự nâng cấp bản thân, đổi mới {productName} để luôn đi trước một bước.",
        wrong: "Tìm cách phá hoại cơ sở của người đó bằng các chiêu trò bẩn."
      },
      {
        intro: "{competitor} bôi nhọ uy tín của bạn trên mạng xã hội liên quan đến chất lượng {productName}.",
        correct: "Công khai minh bạch quy trình, dùng số liệu và đánh giá thực tế của khách hàng để đáp trả.",
        wrong: "Mua bài trên mạng để bôi nhọ ngược lại đối thủ."
      },
      {
        intro: "Khu vực của bạn bỗng mọc lên quá nhiều cơ sở bán {productPlural}, làm bão hòa thị trường.",
        correct: "Liên kết với các doanh nghiệp nhỏ khác, tạo hệ sinh thái bán hàng chéo.",
        wrong: "Thu mình lại và cắt giảm mọi chi phí truyền thông để 'phòng thủ'."
      }
    ]
  },
  6: {
    theory: "Độc quyền - Sự chèn ép của các tập đoàn lớn.",
    situations: [
      {
        intro: "Một chi nhánh của {competitor} với tiềm lực khổng lồ vừa mở ngay đối diện bạn.",
        correct: "Khai thác triệt để tính bản địa và sự thân thiện mà tập đoàn lớn không có được.",
        wrong: "Hoảng sợ và treo biển đóng cửa chuyển nhượng cửa hàng ngay lập tức."
      },
      {
        intro: "Tập đoàn lớn thao túng nguồn cung, ép giá nguyên liệu làm {productName}.",
        correct: "Hợp tác chặt chẽ với các nhà cung cấp nhỏ lẻ ở địa phương để đa dạng nguồn hàng.",
        wrong: "Chấp nhận nhập nguyên liệu rác để duy trì lợi nhuận ngắn hạn."
      },
      {
        intro: "Thị trường đang tràn ngập {monopolyProduct} do các ông lớn trợ giá.",
        correct: "Tập trung phục vụ tệp khách hàng kén chọn, những người ưu tiên chất lượng {productName}.",
        wrong: "Cố gắng sản xuất hàng loạt bằng mọi giá để đối đầu trực diện với quy mô khổng lồ."
      },
      {
        intro: "Một tổ chức độc quyền đề nghị mua lại toàn bộ cơ sở {productPlural} của bạn với giá rẻ mạt.",
        correct: "Kiên quyết từ chối, tìm kiếm nguồn vốn đầu tư bên ngoài để giữ quyền tự chủ.",
        wrong: "Đồng ý bán mình ngay lập tức vì sợ bị họ chèn ép đến phá sản."
      },
      {
        intro: "Luật chơi thị trường về {productPlural} bị bóp méo do sự thao túng của các ông lớn.",
        correct: "Đổi mới sáng tạo, tạo ra một ngách {productName} hoàn toàn mới chưa bị thao túng.",
        wrong: "Bất mãn, lên mạng than thở đổ lỗi cho thời thế rồi buông xuôi."
      }
    ]
  },
  7: {
    theory: "Kinh tế thị trường định hướng XHCN - Vai trò Nhà nước.",
    situations: [
      {
        intro: "Nhà nước ban hành gói hỗ trợ vay vốn kinh doanh {productPlural} nhưng thủ tục kiểm định khắt khe.",
        correct: "Minh bạch hồ sơ, hoàn thiện pháp lý để nhận được nguồn vốn rẻ hỗ trợ phát triển.",
        wrong: "Làm giả giấy tờ doanh thu để qua mặt cơ quan xét duyệt hồ sơ vay."
      },
      {
        intro: "Quy định mới về bảo vệ môi trường buộc bạn phải thay đổi quy trình sản xuất {productName}.",
        correct: "Tuân thủ pháp luật, cải tiến quy trình xanh hóa để phát triển bền vững lâu dài.",
        wrong: "Lén lút xả thải bừa bãi và đút lót để tránh bị thanh tra."
      },
      {
        intro: "Cơ quan thuế yêu cầu minh bạch hóa toàn bộ hệ thống kế toán liên quan đến doanh thu {productPlural}.",
        correct: "Thuê kế toán chuyên nghiệp, đóng thuế đầy đủ để doanh nghiệp phát triển quang minh chính đại.",
        wrong: "Sử dụng hóa đơn ma và phần mềm lậu để trốn thuế."
      },
      {
        intro: "Chính sách bảo hiểm xã hội mới yêu cầu bạn đóng phí cao hơn cho {workforce}.",
        correct: "Chấp hành chính sách, xem đây là cách bảo đảm an sinh giúp nhân viên gắn bó hơn.",
        wrong: "Lập hợp đồng giả, trốn tránh trách nhiệm đóng bảo hiểm cho người lao động."
      },
      {
        intro: "Bạn có cơ hội tham gia chuỗi cung ứng quốc gia nếu đạt chuẩn về sản xuất {productName}.",
        correct: "Đầu tư nâng cấp tiêu chuẩn, tận dụng chính sách hỗ trợ để đưa sản phẩm vươn xa.",
        wrong: "Cho rằng thủ tục quá rườm rà nên bỏ qua cơ hội ngàn vàng này."
      }
    ]
  }
};

function interpolate(text: string, terms: TemplateContext): string {
  let result = text;
  result = result.replace(/{productName}/g, terms.productName);
  result = result.replace(/{productPlural}/g, terms.productPlural);
  result = result.replace(/{workforce}/g, terms.workforce);
  result = result.replace(/{competitor}/g, terms.competitor);
  result = result.replace(/{monopolyProduct}/g, terms.monopolyProduct);
  result = result.replace(/{investmentOption}/g, terms.investmentOption);
  return result;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function getChapterScenario(chapterId: number, char: Character) {
  const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
  const baseMoney = char.baseStats.money;
  const cost = Math.max(1, Math.floor(baseMoney * 0.1));
  const profit = Math.max(2, Math.floor(baseMoney * 0.2));
  const loss = Math.max(2, Math.floor(baseMoney * 0.15));

  const chap = chapterTemplates[chapterId];
  // Chọn ngẫu nhiên 1 trong 5 tình huống của chương
  const template = chap.situations[Math.floor(Math.random() * chap.situations.length)];
  
  const intro = interpolate(template.intro, terms);
  const cDecStr = interpolate(template.correct, terms);
  const wDecStr = interpolate(template.wrong, terms);

  // Tạo random ID để React render lại nếu cần, hoặc dùng timestamp
  const randomSuffix = Math.floor(Math.random() * 100000);

  const correctOpt: Option = {
    id: `${chapterId}_correct_${randomSuffix}`,
    text: `${cDecStr} (Tốn ${cost} vốn)`,
    statsEffect: { money: profit, reputation: 10, customers: 10, knowledge: 10 },
    consequence: "Quyết định sáng suốt! Khách hàng đánh giá cao và doanh thu tăng trưởng.",
    marxTheory: chap.theory
  };

  const wrongOpt: Option = {
    id: `${chapterId}_wrong_${randomSuffix}`,
    text: `${wDecStr} (Tốn ${cost} vốn)`,
    statsEffect: { money: -loss, reputation: -10, customers: -5, knowledge: 5 },
    consequence: "Sai lầm! Khách hàng quay lưng và bạn bị tổn thất tài chính nặng nề.",
    marxTheory: chap.theory
  };

  return {
    intro,
    question: "Bạn sẽ đưa ra quyết định gì?",
    options: shuffleArray([correctOpt, wrongOpt])
  };
}
