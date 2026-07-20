import { Character, Chapter, Badge, Ending, Option } from "../types/types";
import { getChapterScenario } from "./scenarios";

export const CHARACTERS: Character[] = [
  {
    id: "minh_cafe",
    name: "Minh",
    title: "Chủ quán Café khởi nghiệp",
    avatar: "☕",
    difficulty: 1,
    description: "Khởi nghiệp với một quán café nhỏ xinh tại góc phố. Ưu điểm là vốn đầu tư vừa phải, khách hàng trẻ trung, nhưng cạnh tranh vô cùng khốc liệt.",
    businessType: "Kinh doanh đồ uống (Dịch vụ)",
    tags: ['SERVICE', 'RETAIL'],
    strengths: "Dễ tiếp cận khách hàng, quay vòng vốn nhanh.",
    challenges: [
      "Giá nguyên liệu biến động",
      "Quán đối thủ mở sát bên",
      "Khách hàng thay đổi khẩu vị liên tục",
      "Khó giữ chân nhân viên phục vụ"
    ],
    baseStats: {
      money: 15, // 15 triệu VNĐ
      reputation: 0,
      customers: 0,
      staff: 1,
      knowledge: 0
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
    tags: ['SERVICE', 'RETAIL'],
    strengths: "Nguồn khách ổn định, nhu cầu ăn uống thiết yếu cao.",
    challenges: [
      "Giá thịt heo, gas tăng phi mã",
      "Vấn đề vệ sinh an toàn thực phẩm",
      "Đối thủ cạnh tranh giảm giá sâu"
    ],
    baseStats: {
      money: 12,
      reputation: 0,
      customers: 0,
      staff: 1,
      knowledge: 0
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
    tags: ['RETAIL'],
    strengths: "Biên lợi nhuận cao nếu bắt trúng xu hướng hot.",
    challenges: [
      "Tốc độ lỗi mốt cực nhanh",
      "Áp lực xả hàng tồn kho",
      "Sự bùng nổ của sàn thương mại điện tử"
    ],
    baseStats: {
      money: 20,
      reputation: 0,
      customers: 0,
      staff: 1,
      knowledge: 0
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
    tags: ['RETAIL', 'DIGITAL'],
    strengths: "Giá trị sản phẩm cao, nhu cầu sửa chữa lớn.",
    challenges: [
      "Vòng đời công nghệ siêu ngắn",
      "Chi phí nhập máy ban đầu lớn",
      "Cạnh tranh khốc liệt từ Apple, Samsung"
    ],
    baseStats: {
      money: 35,
      reputation: 0,
      customers: 0,
      staff: 2,
      knowledge: 0
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
    tags: ['SERVICE'],
    strengths: "Tự chủ thời gian, làm nhiều hưởng nhiều.",
    challenges: [
      "Giá xăng dầu tăng giảm thất thường",
      "Hệ thống ứng dụng tăng chiết khấu",
      "Khấu hao phương tiện và sức khỏe"
    ],
    baseStats: {
      money: 5,
      reputation: 0,
      customers: 0,
      staff: 0,
      knowledge: 0
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
    tags: ['AGRICULTURE'],
    strengths: "Sản phẩm tốt cho sức khỏe, xu hướng tiêu dùng xanh.",
    challenges: [
      "Thời tiết bão lụt, sâu bệnh hại",
      "Thương lái ép giá thu mua",
      "Bảo quản nông sản tươi ngắn ngày"
    ],
    baseStats: {
      money: 8,
      reputation: 0,
      customers: 0,
      staff: 1,
      knowledge: 0
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
    tags: ['DIGITAL', 'SERVICE'],
    strengths: "Không tốn tiền mặt bằng, chi phí vận hành siêu thấp.",
    challenges: [
      "Khách hàng ép giá, trễ thanh toán",
      "Sự trỗi dậy của AI tự động tạo code",
      "Áp lực deadline và mất cân bằng cuộc sống"
    ],
    baseStats: {
      money: 6,
      reputation: 0,
      customers: 0,
      staff: 0,
      knowledge: 0
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
    tags: ['MANUFACTURING'],
    strengths: "Sản xuất hàng loạt, hạ giá thành sản phẩm trên quy mô lớn.",
    challenges: [
      "Chi phí đầu tư máy móc lớn",
      "Quản lý tiền lương, chế độ của công nhân",
      "Tìm kiếm đơn hàng đầu ra ổn định"
    ],
    baseStats: {
      money: 60,
      reputation: 0,
      customers: 0,
      staff: 6,
      knowledge: 0
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
    tags: ['SERVICE'],
    strengths: "Thị trường luôn cần lưu thông hàng hóa liên tục.",
    challenges: [
      "Chi phí xăng dầu, cầu đường, hao mòn lớn",
      "Rủi ro tai nạn, chậm trễ giao hàng",
      "Cạnh tranh với các tập đoàn giao vận lớn"
    ],
    baseStats: {
      money: 50,
      reputation: 0,
      customers: 0,
      staff: 4,
      knowledge: 0
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
    tags: ['DIGITAL'],
    strengths: "Tiềm năng nhân rộng quy mô toàn cầu cực nhanh.",
    challenges: [
      "Tốc độ đốt tiền cực nhanh cho marketing",
      "Sự chèn ép từ các chợ ứng dụng độc quyền",
      "Bảo mật thông tin và hạ tầng đám mây"
    ],
    baseStats: {
      money: 100,
      reputation: 0,
      customers: 0,
      staff: 8,
      knowledge: 0
    }
  },
  {
    id: "tuan_realestate",
    name: "Tuấn",
    title: "Môi giới Bất động sản",
    avatar: "🏢",
    difficulty: 3,
    description: "Nhân viên môi giới cá nhân chuyên nhà đất. Thu nhập không ổn định phụ thuộc hoa hồng nhưng có thể phất lên sau 1 đêm.",
    businessType: "Dịch vụ Bất động sản",
    tags: ['SERVICE', 'RETAIL'],
    strengths: "Không cần ôm hàng, biên lợi nhuận (hoa hồng) cực lớn.",
    challenges: [
      "Thị trường đóng băng",
      "Bị cò đất lừa gạt",
      "Khách hàng thay đổi ý định phút chót"
    ],
    baseStats: { money: 10, reputation: 0, customers: 0, staff: 0, knowledge: 0 }
  },
  {
    id: "nga_spa",
    name: "Nga",
    title: "Chủ tiệm Spa & Làm đẹp",
    avatar: "💆",
    difficulty: 2,
    description: "Kinh doanh dịch vụ chăm sóc da và làm đẹp. Nhu cầu ngày càng cao nhưng đòi hỏi chất lượng tay nghề và máy móc hiện đại.",
    businessType: "Dịch vụ Chăm sóc sức khỏe & Sắc đẹp",
    tags: ['SERVICE'],
    strengths: "Biên độ lợi nhuận trên dịch vụ rất cao, khách hàng trung thành.",
    challenges: [
      "Chi phí mỹ phẩm và máy móc lớn",
      "Khó quản lý tay nghề nhân viên",
      "Nguy cơ rủi ro y tế"
    ],
    baseStats: { money: 25, reputation: 0, customers: 0, staff: 3, knowledge: 0 }
  },
  {
    id: "hai_tutor",
    name: "Hải",
    title: "Giáo viên Dạy kèm",
    avatar: "📚",
    difficulty: 1,
    description: "Dạy kèm các môn học cho học sinh phổ thông. Chỉ dùng kiến thức cá nhân nhưng sức lực có hạn.",
    businessType: "Dịch vụ Giáo dục",
    tags: ['SERVICE'],
    strengths: "Chi phí vốn bằng 0, chỉ cần kỹ năng sư phạm.",
    challenges: [
      "Giới hạn thời gian 24h/ngày",
      "Sự xuất hiện của các trung tâm lớn",
      "Áp lực thành tích từ phụ huynh"
    ],
    baseStats: { money: 5, reputation: 0, customers: 0, staff: 0, knowledge: 0 }
  },
  {
    id: "vy_baker",
    name: "Vy",
    title: "Chủ tiệm bánh ngọt",
    avatar: "🍰",
    difficulty: 2,
    description: "Mở tiệm bánh kem và bánh ngọt tự làm. Sản phẩm đẹp mắt, ngon miệng nhưng thời gian bảo quản cực ngắn.",
    businessType: "Ẩm thực & Dịch vụ",
    tags: ['RETAIL', 'SERVICE'],
    strengths: "Sự khác biệt về hương vị và thiết kế độc quyền.",
    challenges: [
      "Nguyên liệu dư thừa dễ hỏng",
      "Làm việc vào các ngày lễ Tết vất vả",
      "Cạnh tranh với chuỗi bánh công nghiệp"
    ],
    baseStats: { money: 15, reputation: 0, customers: 0, staff: 2, knowledge: 0 }
  },
  {
    id: "kien_gym",
    name: "Kiên",
    title: "Huấn luyện viên Gym",
    avatar: "🏋️",
    difficulty: 3,
    description: "Vừa làm HLV cá nhân vừa mở một phòng tập quy mô nhỏ. Đòi hỏi đam mê thể hình và vốn đầu tư thiết bị cao.",
    businessType: "Dịch vụ Thể thao",
    tags: ['SERVICE'],
    strengths: "Mô hình thu tiền gói dài hạn giúp xoay vòng vốn tốt.",
    challenges: [
      "Máy móc nhanh hao mòn",
      "Chi phí mặt bằng rất lớn",
      "Cạnh tranh với hệ thống gym 5 sao"
    ],
    baseStats: { money: 40, reputation: 0, customers: 0, staff: 2, knowledge: 0 }
  },
  {
    id: "chau_pet",
    name: "Châu",
    title: "Chủ tiệm Thú cưng",
    avatar: "🐕",
    difficulty: 3,
    description: "Kinh doanh vật nuôi, phụ kiện và dịch vụ grooming. Nhu cầu rất lớn từ giới trẻ yêu động vật.",
    businessType: "Bán lẻ & Dịch vụ Thú cưng",
    tags: ['RETAIL', 'SERVICE'],
    strengths: "Tình cảm của khách hàng với thú cưng tạo ra sức mua lớn.",
    challenges: [
      "Rủi ro dịch bệnh trên vật nuôi",
      "Đòi hỏi không gian vệ sinh sạch sẽ",
      "Xu hướng phụ kiện thay đổi nhanh"
    ],
    baseStats: { money: 30, reputation: 0, customers: 0, staff: 2, knowledge: 0 }
  },
  {
    id: "phong_garage",
    name: "Phong",
    title: "Chủ Gara Ô tô",
    avatar: "🔧",
    difficulty: 4,
    description: "Sửa chữa, bảo dưỡng và độ xe ô tô. Yêu cầu kỹ thuật cao và mặt bằng lớn.",
    businessType: "Dịch vụ Sửa chữa & Kỹ thuật",
    tags: ['SERVICE'],
    strengths: "Khách hàng sẵn sàng chi trả cao cho dịch vụ uy tín.",
    challenges: [
      "Khó tìm kiếm thợ máy giỏi",
      "Rủi ro khi đền bù phụ tùng đắt tiền",
      "Vốn ôm phụ tùng rất lớn"
    ],
    baseStats: { money: 50, reputation: 0, customers: 0, staff: 4, knowledge: 0 }
  },
  {
    id: "my_florist",
    name: "My",
    title: "Chủ tiệm Hoa tươi",
    avatar: "💐",
    difficulty: 2,
    description: "Nhập và cắm hoa nghệ thuật cho các dịp lễ, sự kiện. Sản phẩm mang tính nghệ thuật cao.",
    businessType: "Bán lẻ & Nghệ thuật",
    tags: ['RETAIL'],
    strengths: "Biên độ lợi nhuận cực lớn vào các ngày lễ (8/3, 20/10).",
    challenges: [
      "Hoa nhanh tàn, tỷ lệ hủy hàng cao",
      "Phụ thuộc lớn vào tính thời vụ",
      "Mức độ cạnh tranh cực kỳ gay gắt"
    ],
    baseStats: { money: 12, reputation: 0, customers: 0, staff: 1, knowledge: 0 }
  },
  {
    id: "dat_gamer",
    name: "Đạt",
    title: "Streamer / Tuyển thủ E-sport",
    avatar: "🎮",
    difficulty: 4,
    description: "Kinh doanh sự chú ý qua mạng Internet. Stream game và nhận donate, tài trợ.",
    businessType: "Giải trí kỹ thuật số",
    tags: ['DIGITAL', 'SERVICE'],
    strengths: "Sức lan tỏa lớn, tiềm năng thu nhập vô hạn từ internet.",
    challenges: [
      "Quy luật đào thải khắc nghiệt",
      "Phụ thuộc vào thuật toán nền tảng",
      "Áp lực tâm lý từ cộng đồng mạng"
    ],
    baseStats: { money: 10, reputation: 0, customers: 0, staff: 0, knowledge: 0 }
  },
  {
    id: "hoa_travel",
    name: "Hòa",
    title: "Đại lý Du lịch cá nhân",
    avatar: "✈️",
    difficulty: 3,
    description: "Thiết kế tour, bán vé máy bay và phòng khách sạn. Đòi hỏi kỹ năng chốt sale và mạng lưới đối tác tốt.",
    businessType: "Dịch vụ Du lịch",
    tags: ['SERVICE'],
    strengths: "Không cần bỏ vốn ôm phòng, chỉ cần làm trung gian.",
    challenges: [
      "Sự cố khách quan (dịch bệnh, thời tiết)",
      "Cạnh tranh với các nền tảng tự đặt phòng (OTA)",
      "Giải quyết khiếu nại liên tục"
    ],
    baseStats: { money: 15, reputation: 0, customers: 0, staff: 1, knowledge: 0 }
  }
];

// Helper details for building dynamic, highly tailored stories based on character attributes
export const CHARACTER_TERMS: Record<string, {
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
    monopolyProduct: "café công nghiệp đóng chai giá siêu rẻ",
    investmentOption: "mua máy pha espresso xịn của Ý"
  },
  lan_bun: {
    productName: "bát bún sườn gia truyền",
    productPlural: "bún sườn tươi",
    workforce: "phụ bếp và nhân viên bưng bê",
    competitor: "Chuỗi nhà hàng Phở Đệ Nhất độc quyền",
    monopolyProduct: "bún ăn liền sấy lạnh phủ sóng rộng",
    investmentOption: "mở rộng không gian bếp và nâng cấp bàn ghế"
  },
  huy_fashion: {
    productName: "mẫu quần áo tự thiết kế",
    productPlural: "thời trang xu hướng",
    workforce: "nhân viên bán hàng và tư vấn",
    competitor: "Thương hiệu thời trang nhanh FastFashion",
    monopolyProduct: "quần áo công nghiệp nhập lậu giá siêu rẻ",
    investmentOption: "nhập bộ sưu tập vải cao cấp từ Hàn Quốc"
  },
  an_mobile: {
    productName: "chiếc điện thoại chính hãng",
    productPlural: "điện thoại và phụ kiện",
    workforce: "thợ sửa chữa và nhân viên tư vấn",
    competitor: "Hệ thống siêu thị điện máy BigTech",
    monopolyProduct: "điện thoại xách tay dựng lại giá rẻ mạt",
    investmentOption: "nâng cấp trung tâm bảo hành kỹ thuật cao"
  },
  phuc_driver: {
    productName: "cuốc xe dịch vụ an toàn",
    productPlural: "chuyến đi chất lượng",
    workforce: "tài xế (chính bạn)",
    competitor: "Hệ thống hãng xe taxi truyền thống khổng lồ",
    monopolyProduct: "ứng dụng đa quốc gia bao tiêu toàn bộ cuốc",
    investmentOption: "bảo dưỡng toàn bộ nội thất và nâng cấp xe"
  },
  mai_farmer: {
    productName: "bó rau củ hữu cơ tươi",
    productPlural: "nông sản sạch",
    workforce: "công nhân làm vườn thời vụ",
    competitor: "Siêu thị nông sản công nghiệp FarmTech",
    monopolyProduct: "rau trồng công nghiệp phun thuốc kích phốt giá bèo",
    investmentOption: "lắp đặt hệ thống tưới tiêu tự động nhà kính"
  },
  khanh_freelancer: {
    productName: "dự án phần mềm hoàn thiện",
    productPlural: "sản phẩm kỹ thuật số",
    workforce: "cộng tác viên thiết kế và test",
    competitor: "Công ty gia công phần mềm Outsourcing Mega",
    monopolyProduct: "phần mềm quản lý có sẵn bán đại trà giá rẻ",
    investmentOption: "nâng cấp dàn máy tính và mua khóa học AI"
  },
  binh_factory: {
    productName: "đôi giày da chất lượng cao",
    productPlural: "giày dép gia công",
    workforce: "công nhân xưởng máy",
    competitor: "Nhà máy gia công nước ngoài khổng lồ",
    monopolyProduct: "giày dép nhựa đúc sẵn siêu rẻ",
    investmentOption: "nhập khẩu dây chuyền cắt dập tự động"
  },
  dung_logistics: {
    productName: "chuyến hàng vận tải an toàn",
    productPlural: "dịch vụ giao nhận",
    workforce: "tài xế xe tải và nhân viên bốc xếp",
    competitor: "Tập đoàn giao hàng Global Express",
    monopolyProduct: "dịch vụ ship siêu tốc độc quyền trên sàn TMĐT",
    investmentOption: "đầu tư thêm đội xe bán tải chạy trong thành phố"
  },
  linh_startup: {
    productName: "gói dịch vụ trên ứng dụng thông minh",
    productPlural: "tài khoản Premium",
    workforce: "lập trình viên, marketing và vận hành",
    competitor: "Siêu ứng dụng Mega App quốc tế",
    monopolyProduct: "hệ sinh thái độc quyền khóa chặt người dùng",
    investmentOption: "rót tiền chạy chiến dịch marketing phủ sóng toàn quốc"
  },
  tuan_realestate: {
    productName: "căn hộ dự án cao cấp",
    productPlural: "sản phẩm bất động sản",
    workforce: "đội ngũ cộng tác viên môi giới",
    competitor: "Tập đoàn môi giới nhà đất LandMega",
    monopolyProduct: "căn hộ giá rẻ xây dựng sai phép",
    investmentOption: "chi tiền chạy quảng cáo Facebook phủ sóng"
  },
  nga_spa: {
    productName: "liệu trình làm đẹp da",
    productPlural: "dịch vụ spa",
    workforce: "kỹ thuật viên chăm sóc da",
    competitor: "Chuỗi trung tâm thẩm mỹ viện quốc tế VIP Spa",
    monopolyProduct: "mỹ phẩm trộn giá rẻ bán phá giá",
    investmentOption: "nhập khẩu máy laser triệt lông công nghệ mới"
  },
  hai_tutor: {
    productName: "khoá học luyện thi chất lượng",
    productPlural: "giờ dạy kèm",
    workforce: "trợ giảng chấm bài",
    competitor: "Hệ thống trung tâm luyện thi lớn EduCenter",
    monopolyProduct: "khoá học video quay sẵn giá siêu rẻ",
    investmentOption: "thuê phòng học rộng hơn và mua máy chiếu"
  },
  vy_baker: {
    productName: "chiếc bánh kem thiết kế",
    productPlural: "bánh ngọt thủ công",
    workforce: "phụ bếp nhào bột và đóng gói",
    competitor: "Chuỗi bánh mì công nghiệp BreadBoss",
    monopolyProduct: "bánh kẹo đóng gói sản xuất hàng loạt",
    investmentOption: "mua lò nướng công nghiệp đa năng nhiệt độ chuẩn"
  },
  kien_gym: {
    productName: "gói tập cá nhân 1-1",
    productPlural: "gói thành viên phòng gym",
    workforce: "huấn luyện viên (PT) thời vụ",
    competitor: "Hệ thống phòng tập 5 sao MegaFit",
    monopolyProduct: "video dạy tập miễn phí trên mạng thiếu bài bản",
    investmentOption: "nâng cấp dàn máy tạ khối chuyên dụng nhập khẩu"
  },
  chau_pet: {
    productName: "gói dịch vụ tắm tỉa thú cưng",
    productPlural: "phụ kiện và đồ ăn cho chó mèo",
    workforce: "nhân viên grooming tắm tỉa",
    competitor: "Siêu thị thú cưng PetWorld khổng lồ",
    monopolyProduct: "hạt thức ăn thú cưng kém chất lượng giá rẻ bèo",
    investmentOption: "nhập lồng ấp, máy sấy thú cưng tự động"
  },
  phong_garage: {
    productName: "dịch vụ phủ ceramic bảo vệ sơn",
    productPlural: "dịch vụ sửa chữa bảo dưỡng",
    workforce: "thợ phụ máy gầm",
    competitor: "Trung tâm bảo hành ô tô chính hãng",
    monopolyProduct: "phụ tùng giả nhái giá rẻ trôi nổi",
    investmentOption: "mua cầu nâng ô tô 2 trụ loại lớn"
  },
  my_florist: {
    productName: "lẵng hoa nghệ thuật cao cấp",
    productPlural: "hoa tươi nhập khẩu",
    workforce: "thợ cắm hoa và shipper",
    competitor: "Chuỗi điện hoa toàn quốc FlowerExpress",
    monopolyProduct: "hoa sáp, hoa lụa công nghiệp giá rẻ mạt",
    investmentOption: "lắp đặt phòng lạnh bảo quản hoa tươi công suất lớn"
  },
  dat_gamer: {
    productName: "video highlight kỹ năng cao",
    productPlural: "buổi livestream triệu view",
    workforce: "người quản lý kênh và editor",
    competitor: "Công ty đào tạo idol Streamer Network",
    monopolyProduct: "nội dung rác giật tít câu view tràn lan",
    investmentOption: "nâng cấp PC cấu hình khủng và mic thu âm xịn"
  },
  hoa_travel: {
    productName: "tour du lịch trải nghiệm độc bản",
    productPlural: "gói combo du lịch",
    workforce: "nhân viên tư vấn sale tour",
    competitor: "Tập đoàn du lịch lữ hành Global Tour",
    monopolyProduct: "app đặt phòng nước ngoài chiết khấu phá giá",
    investmentOption: "thiết kế lại website đặt tour chuẩn SEO và tự động hóa"
  }
};

// Create chapters database dynamically using templates to provide 100% personalized Vietnamese scenarios
export const CHAPTERS: Chapter[] = [
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
    getScenario: (char, currentStaff) => getChapterScenario(1, char, currentStaff)
  },
  {
    id: 3,
    title: "Chương 3: Tiền tệ",
    concept: "Chức năng của Tiền tệ",
    description: "Tiền tệ không chỉ là những tờ giấy bạc, nó thực hiện các chức năng cốt lõi trong nền kinh tế thị trường. Hãy lựa chọn phương thức giao dịch để tăng tốc độ lưu thông dòng tiền.",
    getScenario: (char, currentStaff) => getChapterScenario(2, char, currentStaff)
  },
  {
    id: 4,
    title: "Chương 4: Giá trị thặng dư",
    concept: "Nguồn gốc của Giá trị thặng dư & Sức lao động",
    description: "Giá trị thặng dư là nguồn gốc tích lũy của tư bản. Làm thế nào để điều phối giờ làm việc, tiền lương và động viên sức lao động của nhân viên một cách hiệu quả?",
    getScenario: (char, currentStaff) => getChapterScenario(3, char, currentStaff)
  },
  {
    id: 5,
    title: "Chương 5: Cạnh tranh",
    concept: "Cạnh tranh trong nền Kinh tế thị trường",
    description: "Cạnh tranh là động lực thúc đẩy nền kinh tế nhưng cũng vô cùng tàn nhẫn. Một đối thủ mạnh xuất hiện ngay sát bên cạnh bạn để tranh giành khách hàng.",
    getScenario: (char, currentStaff) => getChapterScenario(4, char, currentStaff)
  },
  {
    id: 6,
    title: "Chương 6: Độc quyền",
    concept: "Sự xuất hiện của các Tổ chức Độc quyền lớn",
    description: "Các ông lớn độc quyền sở hữu tiềm lực tài chính khổng lồ có thể bóp nghẹt các cửa hàng nhỏ. Làm thế nào để sống sót trước gã khổng lồ độc quyền?",
    getScenario: (char, currentStaff) => getChapterScenario(5, char, currentStaff)
  },
  {
    id: 7,
    title: "Chương 7: Kinh tế thị trường định hướng XHCN",
    concept: "Vai trò quản lý của Nhà nước & Kinh tế định hướng XHCN",
    description: "Nền kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam gắn liền phát triển kinh tế với công bằng xã hội. Hãy tận dụng chính sách nhà nước để cất cánh.",
    getScenario: (char, currentStaff) => getChapterScenario(6, char, currentStaff)
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
