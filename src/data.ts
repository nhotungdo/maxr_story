import { Character, Chapter, Badge, Ending, Option } from "./types";

export const CHARACTERS: Character[] = [
  {
    id: "minh_cafe",
    name: "Minh",
    title: "Chủ quán Café khởi nghiệp",
    avatar: "☕",
    difficulty: 1,
    description: "Khởi nghiệp với một quán café nhỏ xinh tại góc phố. Ưu điểm là vốn đầu tư vừa phải, khách hàng trẻ trung, nhưng cạnh tranh vô cùng khốc liệt.",
    businessType: "Kinh doanh đồ uống (Dịch vụ)",
    strengths: "Dễ tiếp cận khách hàng, quay vòng vốn nhanh.",
    challenges: [
      "Giá nguyên liệu biến động",
      "Quán đối thủ mở sát bên",
      "Khách hàng thay đổi khẩu vị liên tục",
      "Khó giữ chân nhân viên phục vụ"
    ],
    baseStats: {
      money: 15, // 15 triệu VNĐ
      reputation: 60,
      customers: 40,
      staff: 1,
      knowledge: 10
    }
  },
  {
    id: "lan_bun",
    name: "Lan",
    title: "Chủ quán bún truyền thống",
    avatar: "🍜",
    difficulty: 1,
    description: "Kế thừa và phát triển quán bún sườn gia truyền. Món ăn ngon, quen thuộc nhưng phụ thuộc rất lớn vào giá thực phẩm tươi sống ngoài chợ.",
    businessType: "Ẩm thực bình dân",
    strengths: "Nguồn khách ổn định, nhu cầu ăn uống thiết yếu cao.",
    challenges: [
      "Giá thịt heo, gas tăng phi mã",
      "Vấn đề vệ sinh an toàn thực phẩm",
      "Đối thủ cạnh tranh giảm giá sâu"
    ],
    baseStats: {
      money: 12,
      reputation: 65,
      customers: 50,
      staff: 1,
      knowledge: 10
    }
  },
  {
    id: "huy_fashion",
    name: "Huy",
    title: "Chủ shop thời trang Trend",
    avatar: "👕",
    difficulty: 2,
    description: "Mở shop bán quần áo tự thiết kế và nhập khẩu theo xu hướng. Đòi hỏi con mắt thẩm mỹ cao nhưng rủi ro hàng tồn kho vô cùng lớn.",
    businessType: "Bán lẻ thời trang",
    strengths: "Biên lợi nhuận cao nếu bắt trúng xu hướng hot.",
    challenges: [
      "Tốc độ lỗi mốt cực nhanh",
      "Áp lực xả hàng tồn kho",
      "Sự bùng nổ của sàn thương mại điện tử"
    ],
    baseStats: {
      money: 20,
      reputation: 55,
      customers: 30,
      staff: 1,
      knowledge: 15
    }
  },
  {
    id: "an_mobile",
    name: "An",
    title: "Chủ cửa hàng Điện thoại",
    avatar: "📱",
    difficulty: 3,
    description: "Cửa hàng mua bán, sửa chữa điện thoại di động và phụ kiện. Vốn đầu tư lớn, đòi hỏi am hiểu sâu về công nghệ và đối đầu với các chuỗi lớn.",
    businessType: "Bán lẻ công nghệ",
    strengths: "Giá trị sản phẩm cao, nhu cầu sửa chữa lớn.",
    challenges: [
      "Vòng đời công nghệ siêu ngắn",
      "Chi phí nhập máy ban đầu lớn",
      "Cạnh tranh khốc liệt từ Apple, Samsung"
    ],
    baseStats: {
      money: 35,
      reputation: 50,
      customers: 25,
      staff: 2,
      knowledge: 20
    }
  },
  {
    id: "phuc_driver",
    name: "Phúc",
    title: "Tài xế công nghệ chăm chỉ",
    avatar: "🚕",
    difficulty: 2,
    description: "Mua xe trả góp để chạy dịch vụ chở khách. Bản thân vừa là chủ vừa là người lao động bán sức mình lấy thu nhập từng ngày.",
    businessType: "Dịch vụ vận chuyển",
    strengths: "Tự chủ thời gian, làm nhiều hưởng nhiều.",
    challenges: [
      "Giá xăng dầu tăng giảm thất thường",
      "Hệ thống ứng dụng tăng chiết khấu",
      "Khấu hao phương tiện và sức khỏe"
    ],
    baseStats: {
      money: 5,
      reputation: 70,
      customers: 20,
      staff: 0,
      knowledge: 10
    }
  },
  {
    id: "mai_farmer",
    name: "Mai",
    title: "Nông dân trồng rau sạch",
    avatar: "🌾",
    difficulty: 3,
    description: "Sản xuất rau củ quả hữu cơ tại quê nhà. Đối mặt với quy luật tự nhiên khắc nghiệt và điệp khúc đau đầu 'được mùa mất giá'.",
    businessType: "Sản xuất nông nghiệp",
    strengths: "Sản phẩm tốt cho sức khỏe, xu hướng tiêu dùng xanh.",
    challenges: [
      "Thời tiết bão lụt, sâu bệnh hại",
      "Thương lái ép giá thu mua",
      "Bảo quản nông sản tươi ngắn ngày"
    ],
    baseStats: {
      money: 8,
      reputation: 60,
      customers: 35,
      staff: 1,
      knowledge: 15
    }
  },
  {
    id: "khanh_freelancer",
    name: "Khánh",
    title: "Freelancer Lập trình viên",
    avatar: "💻",
    difficulty: 3,
    description: "Nhận dự án phát triển web và ứng dụng từ xa. Sử dụng chất xám, tư duy logic và kỹ năng công nghệ làm phương tiện sản xuất chính.",
    businessType: "Dịch vụ trí óc",
    strengths: "Không tốn tiền mặt bằng, chi phí vận hành siêu thấp.",
    challenges: [
      "Khách hàng ép giá, trễ thanh toán",
      "Sự trỗi dậy của AI tự động tạo code",
      "Áp lực deadline và mất cân bằng cuộc sống"
    ],
    baseStats: {
      money: 6,
      reputation: 60,
      customers: 15,
      staff: 0,
      knowledge: 25
    }
  },
  {
    id: "binh_factory",
    name: "Bình",
    title: "Chủ xưởng sản xuất giày dép",
    avatar: "🏭",
    difficulty: 4,
    description: "Quản lý một nhà xưởng cơ khí, may mặc quy mô nhỏ với hệ thống máy móc sản xuất và đội ngũ công nhân lành nghề.",
    businessType: "Sản xuất công nghiệp nhẹ",
    strengths: "Sản xuất hàng loạt, hạ giá thành sản phẩm trên quy mô lớn.",
    challenges: [
      "Chi phí đầu tư máy móc lớn",
      "Quản lý tiền lương, chế độ của công nhân",
      "Tìm kiếm đơn hàng đầu ra ổn định"
    ],
    baseStats: {
      money: 60,
      reputation: 50,
      customers: 10,
      staff: 6,
      knowledge: 20
    }
  },
  {
    id: "dung_logistics",
    name: "Dũng",
    title: "Chủ DN Logistics nhỏ",
    avatar: "🚚",
    difficulty: 4,
    description: "Sở hữu đội xe vận tải và nhà kho trung chuyển hàng hóa. Đóng vai trò là mạch máu lưu thông của nền kinh tế hàng hóa.",
    businessType: "Dịch vụ vận tải & Lưu kho",
    strengths: "Thị trường luôn cần lưu thông hàng hóa liên tục.",
    challenges: [
      "Chi phí xăng dầu, cầu đường, hao mòn lớn",
      "Rủi ro tai nạn, chậm trễ giao hàng",
      "Cạnh tranh với các tập đoàn giao vận lớn"
    ],
    baseStats: {
      money: 50,
      reputation: 55,
      customers: 12,
      staff: 4,
      knowledge: 15
    }
  },
  {
    id: "linh_startup",
    name: "Linh",
    title: "Co-Founder Tech Startup",
    avatar: "🚀",
    difficulty: 5,
    description: "Đột phá cùng dự án ứng dụng đặt lịch tiện ích thông minh. Đòi hỏi đốt tiền gọi vốn, cạnh tranh khốc liệt với các Big Tech độc quyền.",
    businessType: "Công nghệ thông tin (Startup)",
    strengths: "Tiềm năng nhân rộng quy mô toàn cầu cực nhanh.",
    challenges: [
      "Tốc độ đốt tiền cực nhanh cho marketing",
      "Sự chèn ép từ các chợ ứng dụng độc quyền",
      "Bảo mật thông tin và hạ tầng đám mây"
    ],
    baseStats: {
      money: 100,
      reputation: 40,
      customers: 8,
      staff: 8,
      knowledge: 30
    }
  }
];

// Helper details for building dynamic, highly tailored stories based on character attributes
const CHARACTER_TERMS: Record<string, {
  productName: string;
  productPlural: string;
  workforce: string;
  competitor: string;
  monopolyProduct: string;
  investmentOption: string;
}> = {
  minh_cafe: {
    productName: "ly café chất lượng",
    productPlural: "café ngon",
    workforce: "nhân viên pha chế và phục vụ",
    competitor: "Chuỗi café Star Coffee khổng lồ",
    monopolyProduct: "café công nghiệp trợ giá cực rẻ",
    investmentOption: "mua máy pha espresso xịn của Ý"
  },
  lan_bun: {
    productName: "bát bún sườn gia truyền",
    productPlural: "bún sườn tươi",
    workforce: "phụ bếp và nhân viên bưng bê",
    competitor: "Chuỗi nhà hàng Phở Đệ Nhất độc quyền thương hiệu",
    monopolyProduct: "bún ăn liền sấy lạnh đóng gói phủ sóng rộng",
    investmentOption: "mua nồi hầm xương điện tiết kiệm điện năng"
  },
  huy_fashion: {
    productName: "bộ quần áo thời trang tự thiết kế",
    productPlural: "quần áo thời trang",
    workforce: "nhân viên bán hàng và tư vấn viên",
    competitor: "Thương hiệu thời trang nhanh Zara-Vina độc quyền",
    monopolyProduct: "quần áo may sẵn công nghiệp giá sỉ siêu rẻ",
    investmentOption: "nhập dàn máy may chuyên dụng và vải chất lượng cao"
  },
  an_mobile: {
    productName: "chiếc điện thoại thông minh bảo hành uy tín",
    productPlural: "điện thoại di động",
    workforce: "kỹ thuật viên sửa chữa phần cứng",
    competitor: "Đại siêu thị Thế Giới Di Động độc quyền thị phần",
    monopolyProduct: "thiết bị điện tử giá gốc không bảo hành phân phối ồ ạt",
    investmentOption: "đầu tư bộ dụng cụ ép kính, sửa chip hiện đại"
  },
  phuc_driver: {
    productName: "cuốc xe di chuyển an toàn",
    productPlural: "chuyến xe chở khách",
    workforce: "bản thân bạn (cường độ lao động cao)",
    competitor: "Tập đoàn gọi xe đa quốc gia GrabGo độc quyền công nghệ",
    monopolyProduct: "dịch vụ xe tự hành và trợ giá cuốc xe ảo",
    investmentOption: "bảo dưỡng toàn bộ động cơ và lắp camera hành trình"
  },
  mai_farmer: {
    productName: "bó rau cải hữu cơ tươi ngon",
    productPlural: "rau quả sạch",
    workforce: "nh công thu hoạch và đóng gói rau quả",
    competitor: "Tập đoàn Nông nghiệp Sạch GreenMart độc quyền kênh thu mua",
    monopolyProduct: "nông sản hóa chất phun thuốc kích thích năng suất siêu lớn",
    investmentOption: "lắp đặt hệ thống tưới nhỏ giọt tự động công nghệ Israel"
  },
  khanh_freelancer: {
    productName: "sản phẩm website tối ưu mượt mà",
    productPlural: "sản phẩm phần mềm",
    workforce: "cộng tác viên thiết kế giao diện bên ngoài",
    competitor: "Tổng công ty Outsourcing FPT-Style thống lĩnh hợp đồng lớn",
    monopolyProduct: "nền tảng tạo web AI tự động giá rẻ không cần code",
    investmentOption: "nâng cấp Macbook cấu hình khủng và mua bản quyền tool"
  },
  binh_factory: {
    productName: "đôi giày da chuẩn phom bền bỉ",
    productPlural: "giày dép thời trang",
    workforce: "công nhân vận hành dây chuyền sản xuất",
    competitor: "Tổng công ty giày da xuất khẩu KingShoes độc quyền phân phối",
    monopolyProduct: "giày dép nhựa ép công nghiệp nhập lậu siêu rẻ",
    investmentOption: "mua máy dập đế giày thủy lực thế hệ mới"
  },
  dung_logistics: {
    productName: "dịch vụ giao hàng nhanh không móp méo",
    productPlural: "chuyến hàng vận tải",
    workforce: "tài xế lái xe tải và nhân viên bốc xếp",
    competitor: "Tập đoàn chuyển phát nhanh J&T-Speed độc quyền luồng vận chuyển",
    monopolyProduct: "đội ngũ vận tải tự động hóa áp dụng giá cước lỗ hủy diệt",
    investmentOption: "mua xe tải tải trọng lớn tiết kiệm nhiên liệu"
  },
  linh_startup: {
    productName: "ứng dụng kết nối dịch vụ mượt mà",
    productPlural: "sản phẩm công nghệ",
    workforce: "lập trình viên chuyên sâu Backend và App",
    competitor: "Siêu ứng dụng đa dịch vụ SuperApp độc quyền nền tảng",
    monopolyProduct: "nền tảng tích hợp cài sẵn trên hệ điều hành điện thoại",
    investmentOption: "mua máy chủ đám mây băng thông rộng chịu tải lớn"
  }
};

// Create chapters database dynamically using templates to provide 100% personalized Vietnamese scenarios
export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Chương 1: Đối tượng và phương pháp nghiên cứu",
    concept: "Quy luật vận động khách quan của thị trường",
    description: "Bạn vừa bước vào kinh doanh. Mọi thứ thật bỡ ngỡ. Tại sao có ngày đông khách nhưng có ngày lại vắng ngắt? Phải chăng do may rủi hay có quy luật kinh tế ẩn giấu đằng sau?",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      return {
        intro: `Bạn bắt đầu mở lối kinh doanh với ${char.businessType}. Ngày đầu tiên khai trương, bạn đón nhận doanh thu khá tốt. Tuy nhiên, sang tuần tiếp theo, tình hình trồi sụt thất thường. Có những ngày bạn làm không hết việc, nhưng lại có ngày ngồi không cả buổi. Bạn tự hỏi: "Tại sao nhu cầu của thị trường đối với ${terms.productPlural} lại biến động khó lường đến thế?"`,
        question: "Dưới góc độ Kinh tế chính trị Mác - Lênin, bạn sẽ chọn phương pháp nào để nghiên cứu và tìm ra câu trả lời?",
        options: [
          {
            id: "1_A",
            text: "Coi đây là sự may rủi tự nhiên của thị trường. Cứ tiếp tục bán bình thường, hôm nào đông thì mừng, hôm nào vắng thì nghỉ ngơi tiết kiệm sức lực.",
            statsEffect: { money: -1, reputation: -5, knowledge: 5, customers: -5 },
            consequence: "Bạn phó mặc doanh nghiệp cho số phận. Sự thụ động khiến khách hàng cảm thấy dịch vụ không ổn định, lượng khách sụt giảm dần và bạn vẫn mơ hồ về thị trường.",
            marxTheory: "Học thuyết Mác - Lênin chỉ ra rằng các hiện tượng kinh tế trên thị trường luôn vận động có quy luật khách quan, không phải là sự ngẫu nhiên may rủi vô cớ."
          },
          {
            id: "1_B",
            text: "Sử dụng phương pháp trừu tượng hóa khoa học: Ghi chép dữ liệu, phân tích các biến số cốt lõi (thời tiết, ngày trong tuần, thu nhập khách hàng) để tìm ra quy luật biến động.",
            statsEffect: { money: -2, reputation: 10, knowledge: 15, customers: 15 },
            consequence: "Tuy tốn chút chi phí ghi chép quản lý, bạn nhanh chóng phát hiện ra quy luật: khách hàng của bạn tập trung mua sắm mạnh vào các ngày cuối tuần hoặc sau giờ tan tầm. Bạn chủ động chuẩn bị nguyên liệu và tối ưu giờ mở cửa.",
            marxTheory: "Phương pháp trừu tượng hóa khoa học là phương pháp chủ đạo của Kinh tế chính trị Mác-Lênin, giúp gạt bỏ các yếu tố ngẫu nhiên bên ngoài để tìm ra bản chất quy luật sâu xa bên trong."
          }
        ]
      };
    }
  },
  {
    id: 2,
    title: "Chương 2: Hàng hóa",
    concept: "Thuộc tính của Hàng hóa & Lượng giá trị",
    description: "Hàng hóa có hai thuộc tính: Giá trị sử dụng và Giá trị. Làm thế nào để định giá sản phẩm và cân bằng giữa chất lượng sản phẩm với chi phí sản xuất?",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      return {
        intro: `Chi phí nguyên liệu đầu vào tăng cao làm ảnh hưởng đến việc tạo ra từng ${terms.productName}. Bạn đứng trước áp lực phải tối ưu hóa quy trình. Một người quen khuyên bạn nên nhập nguyên liệu rẻ hơn, chất lượng kém hơn một chút để giữ biên lợi nhuận cao. Nhưng bạn biết điều đó sẽ làm giảm chất lượng của ${terms.productPlural}.`,
        question: "Bạn quyết định giải quyết bài toán thuộc tính hàng hóa này như thế nào?",
        options: [
          {
            id: "2_A",
            text: "Nâng cấp nguyên liệu chất lượng cao, thiết kế bao bì đẹp hơn (tăng Giá trị sử dụng) và chấp nhận giữ nguyên giá bán để giữ khách, giảm biên lợi nhuận ngắn hạn.",
            statsEffect: { money: -3, reputation: 15, customers: 20, knowledge: 15 },
            consequence: "Khách hàng nhận ra chất lượng vượt trội của sản phẩm. Họ rủ thêm bạn bè đến mua, lượng khách hàng tăng vọt giúp bạn bù đắp chi phí nguyên liệu nhờ quy mô bán hàng lớn.",
            marxTheory: "Giá trị sử dụng là công dụng của vật phẩm thỏa mãn nhu cầu con người. Nâng cao chất lượng chính là củng cố giá trị sử dụng, giúp hàng hóa được xã hội thừa nhận dễ dàng hơn trên thị trường."
          },
          {
            id: "2_B",
            text: "Cắt giảm chất lượng nguyên liệu đầu vào để hạ chi phí lao động xã hội cần thiết, đồng thời giảm giá bán để thu hút khách hàng bình dân bằng giá rẻ.",
            statsEffect: { money: 2, reputation: -15, customers: -10, knowledge: 10 },
            consequence: "Quán đông khách ban đầu vì giá rẻ, nhưng rất nhanh sau đó, khách hàng nhận ra chất lượng giảm sút rõ rệt. Uy tín của bạn bị ảnh hưởng nghiêm trọng, khách hàng trung thành dần rời bỏ.",
            marxTheory: "Giá trị của hàng hóa do lượng lao động xã hội cần thiết để sản xuất ra nó quyết định. Tiết kiệm chi phí bằng cách giảm chất lượng sẽ hủy hoại giá trị sử dụng, khiến người tiêu dùng quay lưng."
          }
        ]
      };
    }
  },
  {
    id: 3,
    title: "Chương 3: Tiền tệ",
    concept: "Chức năng của Tiền tệ",
    description: "Tiền tệ không chỉ là những tờ giấy bạc, nó thực hiện các chức năng cốt lõi trong nền kinh tế thị trường. Hãy lựa chọn phương thức giao dịch để tăng tốc độ lưu thông dòng tiền.",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      return {
        intro: `Trào lưu không dùng tiền mặt (Cashless) đang bùng nổ. Nhiều khách hàng đến giao dịch mua ${terms.productPlural} hỏi có quét mã QR hay chuyển khoản ví điện tử được không. Tuy nhiên, việc thiết lập hệ thống thanh toán số sẽ khiến bạn mất một chút phí duy trì cho bên thứ ba, đồng thời đôi lúc gặp lỗi mạng.`,
        question: "Bạn lựa chọn giải pháp thanh toán nào cho doanh nghiệp của mình?",
        options: [
          {
            id: "3_A",
            text: "Chỉ chấp nhận thanh toán bằng tiền mặt để bảo toàn tuyệt đối dòng tiền thu về ngay lập tức, tránh bị lỗi hệ thống và không phải chịu bất kỳ khoản phí giao dịch nào.",
            statsEffect: { money: -1, reputation: -10, customers: -15, knowledge: 5 },
            consequence: "Rất nhiều khách hàng trẻ tuổi, đặc biệt là dân văn phòng lười mang tiền mặt, cảm thấy phiền phức và bỏ sang các cửa hàng đối thủ tích hợp thanh toán linh hoạt.",
            marxTheory: "Tiền thực hiện chức năng 'phương tiện lưu thông'. Khi nền kinh tế số phát triển, hình thức tiền tệ tiến hóa để giảm thiểu chi phí và thời gian lưu thông. Từ chối thanh toán số làm cản trở quá trình trao đổi hàng hóa."
          },
          {
            id: "3_B",
            text: "Đăng ký các ví điện tử, tạo mã QR ngân hàng tiện lợi, đồng thời giảm 5% cho khách hàng thanh toán không dùng tiền mặt trong tháng đầu tiên.",
            statsEffect: { money: -1, reputation: 10, customers: 20, knowledge: 15 },
            consequence: "Thao tác thanh toán cực kỳ nhanh gọn, giảm thiểu thời gian chờ đợi. Khách hàng cảm thấy bạn rất chuyên nghiệp và hiện đại, giúp số lượng khách hàng tăng vọt rõ rệt.",
            marxTheory: "Khi tiền tệ thực hiện tốt chức năng 'phương tiện thanh toán' và 'phương tiện lưu thông' thông qua công nghệ số, nó sẽ thúc đẩy tốc độ tuần hoàn của tư bản, giúp quá trình mua bán diễn ra trơn tru và nhanh chóng."
          }
        ]
      };
    }
  },
  {
    id: 4,
    title: "Chương 4: Giá trị thặng dư",
    concept: "Nguồn gốc của Giá trị thặng dư & Sức lao động",
    description: "Giá trị thặng dư là nguồn gốc tích lũy của tư bản. Làm thế nào để điều phối giờ làm việc, tiền lương và động viên sức lao động của nhân viên một cách hiệu quả?",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      const staffText = char.baseStats.staff > 0 ? `${char.baseStats.staff} nhân viên hiện tại` : "một người trợ lý mới tuyển";
      return {
        intro: `Doanh nghiệp của bạn đang vào đợt cao điểm, khối lượng công việc tăng lên gấp đôi. ${staffText} đang bắt đầu quá tải và mệt mỏi. Bạn cần đưa ra chính sách quản lý nhân sự để duy trì hiệu suất tạo ra ${terms.productPlural} chất lượng tốt nhất.`,
        question: "Bạn lựa chọn phương án nào để điều phối sức lao động của họ?",
        options: [
          {
            id: "4_A",
            text: "Yêu cầu nhân sự làm thêm 2 giờ mỗi ngày, tăng cường độ làm việc nhưng giữ nguyên lương cứng cũ để tối đa hóa dòng tiền thặng dư thu về ngay.",
            statsEffect: { money: 6, reputation: -10, staff: Math.max(0, char.baseStats.staff - 1), customers: -5, knowledge: 15 },
            consequence: "Lợi nhuận tăng nhanh trong vài ngày đầu do chi phí nhân sự giữ nguyên. Tuy nhiên, nhân sự kiệt sức, thái độ phục vụ khách hàng trở nên cáu gắt, thậm chí có người quyết định xin nghỉ việc đột ngột.",
            marxTheory: "Đây là ví dụ điển hình về phương pháp sản xuất 'giá trị thặng dư tuyệt đối' bằng cách kéo dài ngày lao động hoặc tăng cường độ lao động. Việc bóc lột quá mức sức lao động mà không bù đắp xứng đáng sẽ dẫn đến sự hủy hoại sức lao động và sự phản kháng."
          },
          {
            id: "4_B",
            text: "Tuyển thêm cộng tác viên bán thời gian, tăng lương tăng ca (Overtime) rõ ràng theo luật và thưởng thêm dựa trên năng suất đóng góp vượt trội.",
            statsEffect: { money: -3, reputation: 15, staff: char.baseStats.staff + 1, customers: 15, knowledge: 15 },
            consequence: "Mặc dù chi phí lương tăng, nhân viên của bạn làm việc cực kỳ hào hứng và hăng say. Chất lượng phục vụ và sản phẩm đạt mức hoàn hảo, quán thu hút lượng khách đông đảo bền vững.",
            marxTheory: "Theo Mác, tăng tiền lương tương xứng và nâng cao năng suất là cách thúc đẩy sản xuất 'giá trị thặng dư tương đối'. Khi công nhân được tái sản xuất sức lao động đầy đủ, họ sẽ tự nguyện cống hiến năng suất lao động cao hơn."
          }
        ]
      };
    }
  },
  {
    id: 5,
    title: "Chương 5: Cạnh tranh",
    concept: "Cạnh tranh trong nền Kinh tế thị trường",
    description: "Cạnh tranh là động lực thúc đẩy nền kinh tế nhưng cũng vô cùng tàn nhẫn. Một đối thủ mạnh xuất hiện ngay sát bên cạnh bạn để tranh giành khách hàng.",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      return {
        intro: `Một đối thủ cạnh tranh sừng sỏ vừa mở tiệm ngay sát vách doanh nghiệp của bạn. Họ chơi bài 'phá giá' cực gắt, giảm giá 30% cho tất cả sản phẩm giống hệt ${terms.productPlural} của bạn và treo băng rôn quảng cáo rầm rộ, lôi kéo một lượng lớn khách hàng quen thuộc của bạn sang trải nghiệm thử.`,
        question: "Trước cuộc chiến khốc liệt này, bạn sẽ phản công bằng chiến thuật cạnh tranh nào?",
        options: [
          {
            id: "5_A",
            text: "Tham gia cuộc chiến dìm giá: Hạ giá bán của bạn xuống thấp hơn cả đối thủ để giữ chân khách bằng mọi giá, chấp nhận bù lỗ tài chính.",
            statsEffect: { money: -6, reputation: -5, customers: 10, knowledge: 15 },
            consequence: "Cả hai cửa hàng rơi vào vòng xoáy triệt hạ lẫn nhau. Lợi nhuận của bạn âm nặng, dòng tiền kiệt quệ, khách hàng chỉ đến vì giá rẻ chứ không hề có sự trung thành với thương hiệu của bạn.",
            marxTheory: "Cạnh tranh tự do không lành mạnh bằng cách phá giá dưới chi phí sản xuất sẽ hủy hoại toàn bộ thị trường. Mác chỉ ra cạnh tranh mù quáng dẫn đến việc tự tiêu diệt giá trị thặng dư và làm kiệt quệ tích lũy tư bản."
          },
          {
            id: "5_B",
            text: "Giữ nguyên giá bán hợp lý, tập trung nâng cấp trải nghiệm khách hàng, tung ra gói combo tiện ích kèm quà tặng độc đáo riêng biệt để khác biệt hóa.",
            statsEffect: { money: -2, reputation: 15, customers: 15, knowledge: 20 },
            consequence: "Khách hàng nhận ra dù giá của bạn có cao hơn một chút nhưng dịch vụ chu đáo, chất lượng đồng đều và có dấu ấn cá nhân độc đáo. Bạn xây dựng được tệp khách hàng trung thành vững chắc.",
            marxTheory: "Cạnh tranh trong kinh tế chính trị lành mạnh nhất là cạnh tranh bằng cách nâng cao năng suất cá biệt, cải tiến công nghệ và chất lượng dịch vụ nhằm hạ giá trị cá biệt của sản phẩm xuống thấp hơn giá trị xã hội."
          }
        ]
      };
    }
  },
  {
    id: 6,
    title: "Chương 6: Độc quyền",
    concept: "Sự xuất hiện của các Tổ chức Độc quyền lớn",
    description: "Các ông lớn độc quyền sở hữu tiềm lực tài chính khổng lồ có thể bóp nghẹt các cửa hàng nhỏ. Làm thế nào để sống sót trước gã khổng lồ độc quyền?",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      return {
        intro: `${terms.competitor} - một gã khổng lồ đa quốc gia có chi nhánh phủ khắp nơi vừa khai trương đại siêu thị ngay đầu phố. Họ cung cấp ${terms.monopolyProduct} với quy trình tự động hóa tối tân, chạy quảng cáo phủ sóng tivi, điện thoại của mọi người dân xung quanh, đe dọa nuốt chửng các doanh nghiệp nhỏ lẻ như bạn.`,
        question: "Làm thế nào để doanh nghiệp nhỏ của bạn có thể sống sót và phát triển trước sức ép của tổ chức độc quyền?",
        options: [
          {
            id: "6_A",
            text: "Vay mượn thêm vốn lớn để lao vào cuộc đua quảng cáo truyền hình, treo banner lớn ngoài đường và mở thêm chi nhánh mới nhằm đối đầu trực tiếp về quy mô.",
            statsEffect: { money: -15, reputation: 10, customers: 5, knowledge: 15 },
            consequence: "Số tiền đầu tư khổng lồ nhanh chóng tan biến mà không đem lại hiệu quả đáng kể trước bộ máy truyền thông khổng lồ của gã độc quyền. Bạn rơi vào tình trạng nợ nần chồng chất.",
            marxTheory: "Độc quyền xuất hiện từ sự tích tụ và tập trung tư bản cao độ. Các tổ chức độc quyền nắm giữ ưu thế áp đảo về quy mô kinh tế và công nghệ, việc đối đầu trực diện về quy mô luôn mang lại thất bại cho tư bản nhỏ lẻ."
          },
          {
            id: "6_B",
            text: "Tìm kiếm thị trường ngách: Thay đổi thiết kế, hướng đến phân khúc sản phẩm thủ công tinh tế, mang tính cá nhân hóa sâu sắc mà dây chuyền công nghiệp độc quyền không thể làm được.",
            statsEffect: { money: -3, reputation: 15, customers: 15, knowledge: 20 },
            consequence: "Các ông lớn công nghiệp chỉ sản xuất hàng loạt đại trà. Khi bạn tập trung vào sản phẩm thủ công tinh xảo, kể câu chuyện thương hiệu đầy cảm xúc, tệp khách hàng cao cấp tìm đến bạn ngày một đông.",
            marxTheory: "Trong giai đoạn độc quyền, quy luật giá trị thặng dư biểu hiện thành quy luật lợi nhuận độc quyền cao. Tuy nhiên, thị trường ngách cá nhân hóa là nơi quy luật giá trị tự do vẫn bảo vệ các nhà sản xuất nhỏ năng động."
          }
        ]
      };
    }
  },
  {
    id: 7,
    title: "Chương 7: Kinh tế thị trường định hướng XHCN",
    concept: "Vai trò quản lý của Nhà nước & Kinh tế định hướng XHCN",
    description: "Nền kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam gắn liền phát triển kinh tế với công bằng xã hội. Hãy tận dụng chính sách nhà nước để cất cánh.",
    getScenario: (char) => {
      const terms = CHARACTER_TERMS[char.id] || CHARACTER_TERMS.minh_cafe;
      return {
        intro: `Chính phủ vừa ban hành gói chính sách hỗ trợ phát triển bền vững cho các doanh nghiệp vừa và nhỏ, bao gồm ưu đãi lãi suất vay vốn 3% cho chuyển đổi số và hoàn thuế VAT cho mô hình đạt chuẩn xanh, thân thiện môi trường. Tuy nhiên, điều này đòi hỏi bạn phải kê khai minh bạch toàn bộ tài chính và đóng bảo hiểm xã hội đầy đủ cho toàn bộ lao động của mình.`,
        question: "Bạn quyết định đón nhận chính sách vĩ mô này như thế nào?",
        options: [
          {
            id: "7_A",
            text: "Lập hồ sơ giả để nhận ưu đãi thuế nhưng tìm cách lách luật: khai khống số liệu chuyển đổi số, tiếp tục trốn đóng bảo hiểm cho nhân sự để giữ lại nhiều lợi nhuận nhất.",
            statsEffect: { money: 8, reputation: -25, staff: Math.max(0, char.baseStats.staff - 2), customers: -15, knowledge: 10 },
            consequence: "Bạn kiếm được một khoản tiền gian lận ngắn hạn. Tuy nhiên, thanh tra nhà nước phát hiện sai phạm nghiêm trọng. Doanh nghiệp bị phạt tiền nặng, thu hồi giấy phép ưu đãi, bị bêu tên công khai khiến khách hàng tẩy chay.",
            marxTheory: "Nhà nước đóng vai trò điều tiết, sửa chữa các thất bại của thị trường và đảm bảo công bằng xã hội. Sự phát triển chụp giật, bất chấp luật pháp sẽ bị đào thải bởi công cụ pháp lý mạnh mẽ của Nhà nước."
          },
          {
            id: "7_B",
            text: "Nghiêm túc đầu tư số hóa hệ thống bán hàng, đăng ký bảo hiểm đầy đủ cho lao động, cam kết sử dụng bao bì tái chế bảo vệ môi trường để đạt chứng chỉ Doanh nghiệp Xanh.",
            statsEffect: { money: -2, reputation: 25, staff: char.baseStats.staff + 1, customers: 20, knowledge: 25 },
            consequence: "Bạn nhận được khoản hỗ trợ vay vốn lớn của Nhà nước để nâng cấp ${terms.investmentOption}. Người tiêu dùng Việt Nam vô cùng yêu mến và ưu tiên lựa chọn Doanh nghiệp Xanh có trách nhiệm xã hội.",
            marxTheory: "Kinh tế thị trường định hướng xã hội chủ nghĩa thực hiện sự kết hợp hài hòa giữa lợi ích kinh tế cá nhân với lợi ích xã hội dưới sự quản lý của Nhà nước Pháp quyền XHCN, thúc đẩy sự thịnh vượng bền vững cho toàn dân."
          }
        ]
      };
    }
  }
];

export const BADGES: Badge[] = [
  {
    id: "commodities_expert",
    name: "Chuyên gia Hàng hóa",
    description: "Am hiểu tường tận hai thuộc tính Giá trị sử dụng và Giá trị.",
    icon: "📦",
    unlockedAtKnowledge: 20
  },
  {
    id: "surplus_master",
    name: "Bậc thầy Giá trị thặng dư",
    description: "Biết cách quản trị sức lao động và tiền lương khoa học.",
    icon: "📈",
    unlockedAtKnowledge: 40
  },
  {
    id: "competition_conqueror",
    name: "Kẻ Chinh phục Cạnh tranh",
    description: "Khẳng định vị thế doanh nghiệp bằng chiến thuật khác biệt hóa.",
    icon: "⚔️",
    unlockedAtKnowledge: 60
  },
  {
    id: "social_responsibility",
    name: "Doanh nhân Trách nhiệm Xã hội",
    description: "Kết hợp hài hòa lợi ích kinh tế tư nhân với mục tiêu xã hội.",
    icon: "🤝",
    unlockedAtKnowledge: 80
  },
  {
    id: "marx_scholar",
    name: "Học giả Mác lỗi lạc",
    description: "Đạt điểm số tri thức Kinh tế chính trị Mác - Lênin tối đa.",
    icon: "🎓",
    unlockedAtKnowledge: 100
  }
];

export const ENDINGS: Ending[] = [
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
  }
];

export function determineEnding(stats: { money: number; reputation: number; knowledge: number }): Ending {
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
}
