import { Character, Option, IndustryTag } from "../types/types";
import { CHARACTER_TERMS } from "./data";

type TemplateContext = {
  productName: string;
  productPlural: string;
  workforce: string;
  competitor: string;
  monopolyProduct: string;
  investmentOption: string;
};

export type ScenarioNode = {
  id: string;
  tags: IndustryTag[]; // Mảng rỗng = áp dụng cho mọi ngành
  intro: string;
  question: string;
  correct: string;
  wrong: string;
  nextCorrectId?: string;
  nextWrongId?: string;
  requiresStaff?: boolean; // Nếu true, chỉ hiện ra nếu số lượng nhân viên > 0
  isWrongViolation?: boolean; // Đánh dấu lựa chọn sai là vi phạm (game over)
};

// Hàm nội suy
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

// Xáo trộn mảng
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export const chapterTrees: Record<number, { theory: string, rootNodes: ScenarioNode[], subNodes: Record<string, ScenarioNode> }> = {
  1: {
    theory: "Quy luật vận động khách quan của thị trường - Phương pháp trừu tượng hóa khoa học.",
    rootNodes: [
      {
        id: "c1_root_1",
        tags: [],
        intro: "Thị trường {productPlural} bỗng nhiên thay đổi xu hướng, khách hàng bắt đầu ưa chuộng {monopolyProduct} tiện lợi hơn.",
        question: "Đứng trước sự thay đổi của quy luật cung cầu khách quan, bạn sẽ ứng phó như thế nào?",
        correct: "Nhanh chóng nghiên cứu và tung ra phiên bản {productName} mới phù hợp với thị hiếu.",
        wrong: "Vẫn kiên quyết chỉ bán {productPlural} cũ và phó mặc cho may rủi.",
        nextCorrectId: "c1_sub_1_correct",
        nextWrongId: "c1_sub_1_wrong"
      },
      {
        id: "c1_root_env",
        tags: ["MANUFACTURING", "AGRICULTURE"],
        intro: "Cơ quan môi trường siết chặt quy định xả thải trong quá trình sản xuất {productPlural}.",
        question: "Quy định của Nhà nước là khách quan. Bạn sẽ tuân thủ quy luật này ra sao?",
        correct: "Nâng cấp hệ thống xử lý chất thải theo đúng quy chuẩn xanh.",
        wrong: "Cố tình lén lút xả thải ra sông để tiết kiệm chi phí vận hành.",
        nextCorrectId: "c1_env_sub_c",
        nextWrongId: "c1_env_sub_w"
      },
      {
        id: "c1_root_service",
        tags: ["SERVICE", "RETAIL"],
        intro: "Khách hàng dạo này phàn nàn thái độ phục vụ khi mua {productPlural} không còn thân thiện như trước.",
        question: "Thị hiếu khách hàng đang thay đổi. Bạn sẽ phân tích nguyên nhân khách quan này như thế nào?",
        correct: "Lắng nghe, tổ chức buổi đào tạo lại kỹ năng mềm cho {workforce}.",
        wrong: "Cho rằng khách hàng quá khó tính và lờ đi mọi lời chê bai.",
        nextCorrectId: "c1_srv_sub_c",
        nextWrongId: "c1_srv_sub_w"
      }
    ],
    subNodes: {
      "c1_sub_1_correct": {
        id: "c1_sub_1_correct",
        tags: [],
        intro: "Hậu quả: Phiên bản {productName} mới bán rất chạy nhưng dây chuyền đang bị quá tải.",
        question: "Cung không đủ cầu. Bạn sẽ giải quyết bài toán năng suất như thế nào?",
        correct: "Tái đầu tư lợi nhuận để mở rộng quy mô, tối ưu năng suất làm {productPlural}.",
        wrong: "Bắt ép {workforce} tăng ca liên tục 16 tiếng/ngày không có ngày nghỉ."
      },
      "c1_sub_1_wrong": {
        id: "c1_sub_1_wrong",
        tags: [],
        intro: "Hậu quả: Hàng tồn kho {productPlural} cũ ứ đọng, doanh thu lao dốc không phanh.",
        question: "Sản phẩm không phù hợp thị hiếu đã làm gián đoạn quá trình tái sản xuất. Bạn sẽ làm gì?",
        correct: "Chấp nhận bán cắt lỗ thu hồi vốn và gấp rút thay đổi theo xu hướng mới.",
        wrong: "Tiếp tục vay mượn thêm tiền để đổ vào quảng cáo cho sản phẩm lỗi thời."
      },
      "c1_env_sub_c": {
        id: "c1_env_sub_c",
        tags: ["MANUFACTURING", "AGRICULTURE"],
        intro: "Hệ thống xanh hoạt động tốt, nhưng chi phí vận hành cao làm giảm biên lợi nhuận.",
        question: "Chi phí cá biệt tăng lên. Bạn sẽ làm gì để bù đắp giá trị hao phí này?",
        correct: "Tận dụng yếu tố 'sản xuất xanh' làm chiến dịch marketing để bán giá cao hơn.",
        wrong: "Cắt giảm lương của {workforce} để bù đắp chi phí môi trường."
      },
      "c1_env_sub_w": {
        id: "c1_env_sub_w",
        tags: ["MANUFACTURING", "AGRICULTURE"],
        intro: "Bị thanh tra môi trường bắt quả tang, doanh nghiệp đối mặt án phạt nặng và tẩy chay.",
        question: "Hành động chống lại quy luật khách quan đã mang lại hậu quả. Bước tiếp theo của bạn là gì?",
        correct: "Đứng ra xin lỗi công khai, nộp phạt và cam kết khắc phục triệt để.",
        wrong: "Dùng tiền hối lộ báo chí để bưng bít thông tin.",
        isWrongViolation: true
      },
      "c1_srv_sub_c": {
        id: "c1_srv_sub_c",
        tags: ["SERVICE", "RETAIL"],
        intro: "Sau đào tạo, chất lượng dịch vụ tăng rõ rệt, khách hàng quay lại đông đúc.",
        question: "Lượng cầu đang tăng mạnh nhờ dịch vụ tốt. Bạn sẽ nắm bắt cơ hội này ra sao?",
        correct: "Tạo chính sách thưởng nóng để khích lệ tinh thần {workforce}.",
        wrong: "Tranh thủ tăng giá vô tội vạ để thu lời nhanh."
      },
      "c1_srv_sub_w": {
        id: "c1_srv_sub_w",
        tags: ["SERVICE", "RETAIL"],
        intro: "Tin đồn xấu lan rộng trên mạng xã hội, cửa hàng vắng hoe.",
        question: "Khủng hoảng niềm tin khiến hàng hóa (dịch vụ) không thể tiêu thụ. Bạn phải làm gì?",
        correct: "Đăng lời xin lỗi chân thành và tặng voucher trải nghiệm lại cho khách hàng.",
        wrong: "Thuê đội quân mạng (seeder) vào cãi nhau tay đôi với khách hàng."
      }
    }
  },
  2: {
    theory: "Thuộc tính của Hàng hóa & Lượng giá trị - Giá trị sử dụng và Giá trị.",
    rootNodes: [
      {
        id: "c2_root_1",
        tags: [],
        intro: "Chi phí vận hành tăng cao, tạo áp lực lớn lên giá thành của {productName}.",
        question: "Bạn sẽ ưu tiên giữ vững Giá trị sử dụng của sản phẩm hay tìm cách cắt xén để giảm Lượng giá trị?",
        correct: "Đầu tư vào chất lượng cốt lõi, nâng cao giá trị sử dụng lâu dài cho {productPlural}.",
        wrong: "Lừa dối khách hàng bằng cách giữ nguyên giá nhưng bán ra {productName} kém chất lượng.",
        nextCorrectId: "c2_sub_1_c",
        nextWrongId: "c2_sub_1_w"
      }
    ],
    subNodes: {
      "c2_sub_1_c": {
        id: "c2_sub_1_c",
        tags: [],
        intro: "Chất lượng {productName} tăng giúp định vị thương hiệu cao cấp hơn, nhưng một lượng khách cũ bỏ đi vì giá cao.",
        question: "Giá trị hàng hóa tăng lên kéo theo mức giá thay đổi. Bạn sẽ định hướng lại tệp khách hàng ra sao?",
        correct: "Chấp nhận tái định vị tệp khách hàng trung lưu, chăm sóc họ kỹ hơn.",
        wrong: "Giảm giá lại ngay lập tức khiến định vị thương hiệu trở nên hỗn loạn."
      },
      "c2_sub_1_w": {
        id: "c2_sub_1_w",
        tags: [],
        intro: "Khách hàng phát hiện {productName} bị rút ruột, làn sóng tẩy chay nổ ra.",
        question: "Giá trị sử dụng của hàng hóa bị đánh tráo khiến thị trường phản ứng dữ dội. Bạn phải làm gì?",
        correct: "Thu hồi toàn bộ sản phẩm lỗi và đền bù thỏa đáng cho người tiêu dùng.",
        wrong: "Đổ lỗi cho lỗi khách quan của đơn vị vận chuyển."
      }
    }
  },
  3: {
    theory: "Chức năng của Tiền tệ - Phương tiện lưu thông và thanh toán.",
    rootNodes: [
      {
        id: "c3_root_1",
        tags: [],
        intro: "Khách hàng mua {productPlural} ngày càng chuộng thanh toán điện tử, nhưng hệ thống hiện tại thường xuyên lỗi mạng.",
        question: "Tiền tệ thực hiện chức năng phương tiện lưu thông và thanh toán. Bạn sẽ giải quyết bài toán giao dịch này ra sao?",
        correct: "Nâng cấp ngay hệ thống thanh toán điện tử và chấp nhận chịu một chút phí giao dịch.",
        wrong: "Kiên quyết chỉ nhận tiền mặt khiến nhiều khách hàng bỏ đi vì không mang theo tiền.",
        nextCorrectId: "c3_sub_1_c",
        nextWrongId: "c3_sub_1_w"
      }
    ],
    subNodes: {
      "c3_sub_1_c": {
        id: "c3_sub_1_c",
        tags: [],
        intro: "Hệ thống điện tử hoạt động trơn tru, tốc độ lưu thông dòng tiền nhanh hơn giúp doanh thu tăng vọt.",
        question: "Dòng tiền lưu thông thuận lợi, bạn sẽ dùng công cụ nào để giữ tiền tiếp tục quay lại hệ thống?",
        correct: "Tích hợp thêm hệ thống thẻ thành viên tích điểm để giữ chân khách dài hạn.",
        wrong: "Bí mật thu thêm phụ phí thanh toán thẻ của khách mà không thông báo trước."
      },
      "c3_sub_1_w": {
        id: "c3_sub_1_w",
        tags: [],
        intro: "Vì chỉ nhận tiền mặt, một lượng tiền giả lớn đã bị lén lút đưa vào két sắt cửa hàng.",
        question: "Đồng tiền giấy chỉ là ký hiệu của giá trị. Bạn sẽ xử lý rủi ro tiền giả này như thế nào?",
        correct: "Trình báo cơ quan chức năng và trang bị máy soi tiền giả ngay lập tức.",
        wrong: "Lén lút tuồn số tiền giả đó thối lại cho những khách hàng khác.",
        isWrongViolation: true
      }
    }
  },
  4: {
    theory: "Giá trị thặng dư - Bóc lột sức lao động và tái sản xuất.",
    rootNodes: [
      {
        id: "c4_root_1",
        tags: [],
        requiresStaff: true,
        intro: "Đơn đặt hàng {productPlural} tăng đột biến, {workforce} phải làm việc quá sức.",
        question: "Bạn sẽ khai thác Giá trị thặng dư thông qua việc tái sản xuất sức lao động hay bóc lột tuyệt đối?",
        correct: "Đãi ngộ nhân viên xứng đáng, trả lương làm thêm giờ sòng phẳng để giữ tinh thần.",
        wrong: "Bắt ép {workforce} làm thêm giờ không lương, vắt kiệt sức lao động của họ.",
        nextCorrectId: "c4_sub_1_c",
        nextWrongId: "c4_sub_1_w"
      },
      {
        id: "c4_root_nostaff",
        tags: [],
        requiresStaff: false,
        intro: "Vì bạn tự làm một mình, khi đơn đặt hàng {productPlural} tăng vọt, bạn phải làm việc 16 tiếng một ngày đến kiệt sức.",
        question: "Là người lao động tự do, bạn sẽ gia tăng giá trị thặng dư bằng phương pháp nào để không hủy hoại sức khỏe?",
        correct: "Đầu tư mua máy móc hiện đại hoặc phần mềm để tăng năng suất (Giá trị thặng dư tương đối).",
        wrong: "Tiếp tục thức trắng đêm cày cuốc, vắt kiệt sức lao động của chính mình (Giá trị thặng dư tuyệt đối).",
        nextCorrectId: "c4_sub_ns_c",
        nextWrongId: "c4_sub_ns_w"
      }
    ],
    subNodes: {
      "c4_sub_1_c": {
        id: "c4_sub_1_c",
        tags: [],
        requiresStaff: true,
        intro: "Nhân viên phấn khởi làm việc, nhưng chi phí biến đổi (tiền lương) đội lên rất cao làm giảm biên lợi nhuận.",
        question: "Để giảm thời gian lao động tất yếu, bạn sẽ áp dụng biện pháp sản xuất giá trị thặng dư tương đối nào?",
        correct: "Cải tiến công cụ lao động, áp dụng quy trình mới để tăng năng suất tương đối bù đắp chi phí.",
        wrong: "Bắt đầu cắt xén bữa ăn giữa ca của nhân viên để lấy lại phần tiền lương đã trả."
      },
      "c4_sub_1_w": {
        id: "c4_sub_1_w",
        tags: [],
        requiresStaff: true,
        intro: "{workforce} kiệt sức, bất mãn và rủ nhau đình công tập thể đúng lúc cao điểm.",
        question: "Mâu thuẫn lợi ích gay gắt giữa người sử dụng lao động và người lao động đã bùng phát. Bạn sẽ xử lý thế nào?",
        correct: "Xin lỗi, chấp nhận yêu sách hợp lý của công nhân và cải thiện ngay môi trường làm việc.",
        wrong: "Gọi giang hồ đến đe dọa ép công nhân phải trở lại làm việc.",
        isWrongViolation: true
      },
      "c4_sub_ns_c": {
        id: "c4_sub_ns_c",
        tags: [],
        requiresStaff: false,
        intro: "Công cụ mới giúp bạn làm ra nhiều {productPlural} hơn trong thời gian ngắn, nhưng tiền đầu tư khá cao.",
        question: "Để tối ưu hóa chi phí cấu tạo hữu cơ tư bản, bạn sẽ làm gì?",
        correct: "Nhận thêm nhiều đơn hàng đa dạng để khai thác tối đa công suất máy móc/phần mềm.",
        wrong: "Tắt máy/phần mềm để đắp chiếu vì xót tiền điện."
      },
      "c4_sub_ns_w": {
        id: "c4_sub_ns_w",
        tags: [],
        requiresStaff: false,
        intro: "Làm việc quá sức khiến bạn đổ bệnh, phải đóng cửa nghỉ ngơi dài ngày.",
        question: "Sức lao động - loại hàng hóa đặc biệt của chính bạn đã bị hao mòn nghiêm trọng. Bạn cần làm gì?",
        correct: "Nghỉ ngơi tĩnh dưỡng hoàn toàn, sau đó vay mượn thêm vốn để duy trì cửa hàng.",
        wrong: "Uống thuốc giảm đau cực mạnh để ráng làm tiếp vì sợ mất khách."
      }
    }
  },
  5: {
    theory: "Cạnh tranh - Động lực thúc đẩy và rủi ro.",
    rootNodes: [
      {
        id: "c5_root_1",
        tags: [],
        intro: "{competitor} tung chiến dịch giảm giá cực sốc 50% để giành giật khách mua {productPlural}.",
        question: "Đối diện với quy luật cạnh tranh khốc liệt, chiến lược tồn tại của bạn là gì?",
        correct: "Tìm thị trường ngách, cá nhân hóa {productName} và tạo sự khác biệt về dịch vụ.",
        wrong: "Cuống cuồng giảm giá 60% dẫn đến bán lỗ và cạn kiệt nguồn vốn.",
        nextCorrectId: "c5_sub_1_c",
        nextWrongId: "c5_sub_1_w"
      }
    ],
    subNodes: {
      "c5_sub_1_c": {
        id: "c5_sub_1_c",
        tags: [],
        intro: "Thị trường ngách thành công, tệp khách hàng trung thành ngày một tăng.",
        question: "Nhờ cạnh tranh bằng chất lượng, bạn đã có lợi thế. Làm sao để bảo vệ lợi thế này trước đối thủ bắt chước?",
        correct: "Đăng ký bảo hộ thương hiệu độc quyền và tập trung sâu hơn vào trải nghiệm khách hàng.",
        wrong: "Thấy có tiền liền vội vàng mở rộng đa ngành sang các lĩnh vực mình không hề am hiểu."
      },
      "c5_sub_1_w": {
        id: "c5_sub_1_w",
        tags: [],
        intro: "Giảm giá sốc khiến dòng tiền đứt gãy, không đủ tiền trả lương cho {workforce}.",
        question: "Cạnh tranh không lành mạnh đã phá vỡ cấu trúc tái sản xuất của bạn. Bước đi cứu vãn là gì?",
        correct: "Gấp rút vay vốn ngân hàng, ngừng ngay việc giảm giá và tái cơ cấu lại danh mục {productPlural}.",
        wrong: "Trốn nợ, ôm toàn bộ số tiền còn lại bỏ trốn.",
        isWrongViolation: true
      }
    }
  },
  6: {
    theory: "Độc quyền - Sự chèn ép của các tập đoàn lớn.",
    rootNodes: [
      {
        id: "c6_root_1",
        tags: [],
        intro: "Một chi nhánh của {competitor} với tiềm lực tư bản khổng lồ vừa mở ngay đối diện bạn.",
        question: "Trước sức mạnh áp đảo của tổ chức độc quyền, cửa hàng nhỏ lẻ của bạn sẽ phản ứng ra sao?",
        correct: "Khai thác triệt để tính bản địa và sự thân thiện mà tập đoàn lớn không có được.",
        wrong: "Hoảng sợ và treo biển đóng cửa chuyển nhượng cửa hàng ngay lập tức.",
        nextCorrectId: "c6_sub_1_c",
        nextWrongId: "c6_sub_1_w"
      }
    ],
    subNodes: {
      "c6_sub_1_c": {
        id: "c6_sub_1_c",
        tags: [],
        intro: "Chiến thuật linh hoạt hiệu quả, cửa hàng vẫn sống khỏe dù tổ chức độc quyền chèn ép.",
        question: "Tuy sống sót nhưng rủi ro vẫn còn. Để đối phó dài hạn với độc quyền, bạn sẽ làm gì?",
        correct: "Liên kết với các hộ kinh doanh nhỏ khác tạo thành một cộng đồng hỗ trợ nhau (liên minh phi độc quyền).",
        wrong: "Chủ quan khinh địch, bắt đầu lười biếng và giảm chất lượng {productName}."
      },
      "c6_sub_1_w": {
        id: "c6_sub_1_w",
        tags: [],
        intro: "Bạn bán vội cửa hàng với giá rẻ bèo, mất trắng cơ nghiệp bao năm do bị nhà tư bản lớn thâu tóm.",
        question: "Sự thâu tóm tàn khốc của tập đoàn độc quyền đã đánh gục bạn. Hãy chọn bước đi vớt vát cuối cùng.",
        correct: "Rút kinh nghiệm sâu sắc, cầm số vốn ít ỏi đi học nghề và chuẩn bị làm lại từ đầu.",
        wrong: "Chìm trong rượu chè, cờ bạc vì quá tuyệt vọng."
      }
    }
  },
  7: {
    theory: "Kinh tế thị trường định hướng XHCN - Vai trò Nhà nước.",
    rootNodes: [
      {
        id: "c7_root_1",
        tags: [],
        intro: "Cơ quan thuế yêu cầu minh bạch hóa toàn bộ hệ thống kế toán liên quan đến doanh thu {productPlural}.",
        question: "Trong nền kinh tế thị trường định hướng XHCN, Nhà nước quản lý bằng pháp luật. Bạn sẽ làm gì?",
        correct: "Thuê kế toán chuyên nghiệp, đóng thuế đầy đủ để doanh nghiệp phát triển quang minh chính đại.",
        wrong: "Sử dụng hóa đơn ma và phần mềm lậu để trốn thuế.",
        nextCorrectId: "c7_sub_1_c",
        nextWrongId: "c7_sub_1_w"
      }
    ],
    subNodes: {
      "c7_sub_1_c": {
        id: "c7_sub_1_c",
        tags: [],
        intro: "Hồ sơ minh bạch giúp bạn nhận được chứng nhận Doanh nghiệp uy tín, dễ dàng vay vốn ưu đãi từ các ngân hàng thương mại Nhà nước.",
        question: "Nhà nước hỗ trợ vốn cho doanh nghiệp làm ăn chân chính. Bạn sẽ sử dụng nguồn vốn này ra sao?",
        correct: "Dùng gói vốn ưu đãi đó để nâng cấp công nghệ, vươn ra thị trường lớn hơn.",
        wrong: "Dùng vốn vay sai mục đích, đem tiền đi đầu cơ bất động sản rủi ro cao."
      },
      "c7_sub_1_w": {
        id: "c7_sub_1_w",
        tags: [],
        intro: "Bị cơ quan điều tra phát hiện trốn thuế, bạn đối mặt với nguy cơ khởi tố hình sự theo pháp luật Nhà nước.",
        question: "Sự can thiệp của pháp luật nhằm đảm bảo công bằng xã hội. Bạn sẽ đối mặt với sai lầm của mình thế nào?",
        correct: "Thành khẩn khai báo, nộp phạt truy thu thuế và hợp tác với cơ quan điều tra.",
        wrong: "Tiếp tục tiêu hủy tài liệu chứng cứ hòng chối tội.",
        isWrongViolation: true
      }
    }
  }
};

/**
 * Lấy hoặc sinh kịch bản cho một node cụ thể (dành cho nhánh phụ)
 */
export function getSpecificScenario(chapterId: number, scenarioId: string, char: Character) {
  const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
  const baseMoney = char.baseStats.money;
  const cost = Math.max(1, Math.floor(baseMoney * 0.1));
  const profit = Math.max(2, Math.floor(baseMoney * 0.2));
  const loss = Math.max(2, Math.floor(baseMoney * 0.15));

  const chap = chapterTrees[chapterId];
  let node = chap.subNodes[scenarioId];
  if (!node) {
    // Fallback if not found
    node = chap.rootNodes[0];
  }

  const intro = interpolate(node.intro, terms);
  const question = interpolate(node.question, terms);
  const cDecStr = interpolate(node.correct, terms);
  const wDecStr = interpolate(node.wrong, terms);

  const correctOpt: Option = {
    id: `${scenarioId}_correct`,
    text: `${cDecStr} (Tốn ${cost} vốn)`,
    statsEffect: { money: profit, reputation: 10, customers: 10, knowledge: 8 },
    consequence: "Lựa chọn tốt! Hệ quả tích cực đã xảy ra.",
    marxTheory: chap.theory,
    nextScenarioId: node.nextCorrectId
  };

  const wrongOpt: Option = {
    id: `${scenarioId}_wrong`,
    text: `${wDecStr} (Tốn ${cost} vốn)`,
    statsEffect: { money: -loss, reputation: -10, customers: -5, knowledge: 0 },
    consequence: "Sai lầm nghiêm trọng! Bạn tiếp tục gặp rắc rối.",
    marxTheory: chap.theory,
    nextScenarioId: node.nextWrongId,
    isViolation: node.isWrongViolation
  };

  return {
    id: node.id,
    intro,
    question: question,
    options: shuffleArray([correctOpt, wrongOpt])
  };
}

/**
 * Lấy tình huống gốc (root) cho chương dựa trên tag
 */
export function getChapterScenario(chapterId: number, char: Character, currentStaff: number, history: any[] = []) {
  const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
  const charTags = char.tags || [];

  const chap = chapterTrees[chapterId];
  
  // Lọc các root nodes phù hợp với tag của nhân vật và số lượng nhân sự
  let validNodes = chap.rootNodes.filter(node => {
    if (node.requiresStaff === true && currentStaff <= 0) return false;
    if (node.requiresStaff === false && currentStaff > 0) return false;
    if (node.tags.length > 0 && !node.tags.some(tag => charTags.includes(tag))) return false;
    
    // Kiểm tra lịch sử để không lặp lại
    const question = interpolate(node.question, terms);
    if (history.some(h => h.scenario === question)) return false;
    
    return true;
  });

  // Fallback nếu tất cả đều đã chơi
  if (validNodes.length === 0) {
    validNodes = chap.rootNodes.filter(node => {
      if (node.requiresStaff === true && currentStaff <= 0) return false;
      if (node.requiresStaff === false && currentStaff > 0) return false;
      if (node.tags.length > 0 && !node.tags.some(tag => charTags.includes(tag))) return false;
      return true;
    });
  }

  // Chọn ngẫu nhiên 1 node hợp lệ
  const node = validNodes.length > 0 
    ? validNodes[Math.floor(Math.random() * validNodes.length)]
    : chap.rootNodes[0]; // fallback

  const baseMoney = char.baseStats.money;
  const cost = Math.max(1, Math.floor(baseMoney * 0.1));
  const profit = Math.max(2, Math.floor(baseMoney * 0.2));
  const loss = Math.max(2, Math.floor(baseMoney * 0.15));

  const intro = interpolate(node.intro, terms);
  const question = interpolate(node.question, terms);
  const cDecStr = interpolate(node.correct, terms);
  const wDecStr = interpolate(node.wrong, terms);

  const correctOpt: Option = {
    id: `${node.id}_correct`,
    text: `${cDecStr} (Tốn ${cost} vốn)`,
    statsEffect: { money: profit, reputation: 10, customers: 10, knowledge: 8 },
    consequence: "Quyết định sáng suốt! Bạn đã vượt qua bước đầu tiên.",
    marxTheory: chap.theory,
    nextScenarioId: node.nextCorrectId
  };

  const wrongOpt: Option = {
    id: `${node.id}_wrong`,
    text: `${wDecStr} (Tốn ${cost} vốn)`,
    statsEffect: { money: -loss, reputation: -10, customers: -5, knowledge: 0 },
    consequence: "Sai lầm! Mọi thứ bắt đầu tồi tệ hơn.",
    marxTheory: chap.theory,
    nextScenarioId: node.nextWrongId
  };

  return {
    id: node.id,
    intro,
    question: question,
    options: shuffleArray([correctOpt, wrongOpt])
  };
}
