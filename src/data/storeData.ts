export interface Product {
  id: string;
  name: string;
  category: 'watch' | 'sunglasses';
  subCategory?: 'mens' | 'womens' | 'couples' | 'premium';
  brand: string;
  price: number;
  originalPrice: number;
  images: string[];
  description: string;
  specs: {
    movement?: string;
    caseMaterial?: string;
    strapMaterial?: string;
    glass?: string;
    waterResistance?: string;
    warranty?: string;
    lensType?: string;
    frameMaterial?: string;
    uvProtection?: string;
  };
  isSale?: boolean;
  saleLabel?: string;
  rating: number;
  reviewCount: number;
  featuredInHotSelling?: boolean;
  badge?: string;
}

export interface Review {
  id: string;
  author: string;
  productName: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'rolex-day-date-green-rose-gold',
    name: 'ROLEX DAY DATE GREEN ROSE GOLD (CELL MODEL)',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Rolex',
    price: 1899,
    originalPrice: 29999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_b25b9540-9045-4193-a26e-b92a397a614e.jpg?v=1787242348&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_821cb239-0c65-4b3a-bf32-2df9db602480.jpg?v=1787242348&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_b25b9540-9045-4193-a26e-b92a397a614e.jpg?v=1787242348&width=1200'
    ],
    description: 'Iconic Rolex Day-Date President styling with olive green sunburst dial and polished 18K rose gold-tone fluted bezel. Equipped with day and date apertures, presidential link bracelet, and heavy solid feel.',
    specs: {
      movement: 'High Precision Quartz / Automatic Feel',
      caseMaterial: '316L Stainless Steel Rose Gold Plated',
      strapMaterial: 'President Three-Piece Solid Links',
      glass: 'Scratch-resistant Mineral Crystal with Cyclops Lens',
      waterResistance: '30 Meters Daily Splash Proof',
      warranty: '1 Year Machine Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 14,
    featuredInHotSelling: true,
  },
  {
    id: 'rolex-oyster-perpetual-tiger-gold',
    name: 'Rolex Oyster Perpetual Tiger Gold',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Rolex',
    price: 3499,
    originalPrice: 49000,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_6ea2c291-7e23-4f03-bcbe-ebc537a9bf03.jpg?v=1787242348&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_6ea2c291-7e23-4f03-bcbe-ebc537a9bf03.jpg?v=1787242348&width=3840'
    ],
    description: 'Eye of the Tiger custom dial crafted with striking yellow gold diamond encrusted accents, black lacquer stripes, and heavy weight case. As famously worn by football icon Neymar Jr.',
    specs: {
      movement: 'Automatic Self-Winding Movement',
      caseMaterial: 'Yellow Gold Ion Plating over 316L Steel',
      strapMaterial: 'Oysterflex High-Durability Elastomer',
      glass: 'Sapphire Crystal with Anti-Reflective Coating',
      waterResistance: '50 Meters',
      warranty: '1 Year Machine Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 9,
    featuredInHotSelling: true,
  },
  {
    id: 'rolex-day-date-gold-green',
    name: 'Rolex Day Date gold green',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Rolex',
    price: 1899,
    originalPrice: 29999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_898bdf3c-cbc1-4382-bde7-989d8c4cdf8f.jpg?v=1787242348&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_898bdf3c-cbc1-4382-bde7-989d8c4cdf8f.jpg?v=1787242348&width=3840'
    ],
    description: 'Classic yellow gold finish with royal emerald green Roman numeral dial. Timeless luxury and status symbol on wrist.',
    specs: {
      movement: 'High Accuracy Japanese Quartz',
      caseMaterial: 'Gold PVD Coated Stainless Steel',
      strapMaterial: 'President Link Bracelet with Crown Clasp',
      glass: 'Hardlex Glass with Date Magnifier',
      waterResistance: '30 Meters Water Splash Proof',
      warranty: '1 Year Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 18,
    featuredInHotSelling: true,
  },
  {
    id: 'tissot-tclassic-chronograph',
    name: 'TISSOT TCLASSIC CHRONOGRAPH WATCH A WHITE DIAL ROSE GOLDTONE AND A BROWN LEATHER STRAP',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Tissot',
    price: 1999,
    originalPrice: 29000,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_f59e7403-a46d-4df4-8f50-e3ccfa118b78.jpg?v=1787818137&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_f59e7403-a46d-4df4-8f50-e3ccfa118b78.jpg?v=1787818137&width=1200'
    ],
    description: 'Elegantly proportioned Tissot T-Classic chronograph. Featuring guilloché textured white dial, rose gold hour batons, functional sub-dials, and genuine croc-embossed brown leather strap.',
    specs: {
      movement: 'Chronograph Working Stopwatch Movement',
      caseMaterial: 'Rose Gold PVD Coated 316L Stainless Steel',
      strapMaterial: 'Genuine Italian Leather with Butterfly Deployment Clasp',
      glass: 'Scratch-resistant Sapphire Crystal',
      waterResistance: '50 Meters',
      warranty: '1 Year Machine Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 12,
    featuredInHotSelling: true,
  },
  {
    id: 'hublot-skeleton-automatic',
    name: 'Hublot Skeleton Automatic',
    category: 'watch',
    subCategory: 'premium',
    brand: 'Hublot',
    price: 2099,
    originalPrice: 49999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_5f9b994a-e963-4c18-99c1-1a66b135a80d.jpg?v=1787818137&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_5f9b994a-e963-4c18-99c1-1a66b135a80d.jpg?v=1787818137&width=3840'
    ],
    description: 'Dramatic black ceramic and titanium finish skeleton openwork watch showcasing the gears, escapement, and balance wheel in live motion. Fitted with tactile ribbed silicone sport strap.',
    specs: {
      movement: 'Fully Automatic Skeleton Visible Gear Movement',
      caseMaterial: 'Matte Black Anodized Steel & Bezel Screws',
      strapMaterial: 'High-Grade Vulcanized Rubber Strap',
      glass: 'Double Anti-Reflective Coated Sapphire Crystal',
      waterResistance: '50 Meters Water Resistant',
      warranty: '1 Year Machine Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 8,
    featuredInHotSelling: true,
  },
  {
    id: 'seiko-premium-swift-movement-silver',
    name: 'SEIKO PREMIUM SWIFT MOVEMENT BACK OPEN SILVER COLOUR',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Seiko',
    price: 2299,
    originalPrice: 29999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_2f1bfabf-a6a9-479b-b496-3b3e80a172f8.jpg?v=1787818137&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_2f1bfabf-a6a9-479b-b496-3b3e80a172f8.jpg?v=1787818137&width=3840'
    ],
    description: 'Precision Japanese styling with diver bezel, luminous geometric markers, exhibition transparent caseback showing rotor movement, and solid brushed stainless steel bracelet.',
    specs: {
      movement: 'Smooth Sweeping Swift Automatic Movement',
      caseMaterial: 'Solid 316L Stainless Steel',
      strapMaterial: 'Solid Link Steel with Safety Lock Clasp',
      glass: 'Hardlex Domed Crystal',
      waterResistance: '100 Meters Water Resistant',
      warranty: '1 Year Mechanical Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 16,
    featuredInHotSelling: true,
  },
  {
    id: 'seiko-premium-swift-movement-back-open-turquoise',
    name: 'SEIKO PREMIUM SWIFT MOVEMENT BACK OPEN',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Seiko',
    price: 2499,
    originalPrice: 29999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_a49c0c9d-9396-4e80-8388-9e71a4401d23.jpg?v=1787756409&width=832',
      'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_a49c0c9d-9396-4e80-8388-9e71a4401d23.jpg?v=1787756409&width=1200'
    ],
    description: 'Spectacular turquoise Tiffany blue sunburst dial complemented by warm rose gold fluted accents and open skeleton exhibition caseback.',
    specs: {
      movement: 'Swift Sweep Automatic Mechanism',
      caseMaterial: 'Two-Tone Rose Gold & Steel',
      strapMaterial: 'Two-Tone Jubilee Solid Links',
      glass: 'Scratch Proof Sapphire Coated Glass',
      waterResistance: '50 Meters',
      warranty: '1 Year Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 21,
    featuredInHotSelling: true,
  },
  {
    id: 'tissot-day-date-lemon',
    name: 'Tissot Day Date Lemon',
    category: 'watch',
    subCategory: 'mens',
    brand: 'Tissot',
    price: 2499,
    originalPrice: 29999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/EC6C49DC-A1CC-4073-975F-7DAB827B5643.jpg?v=1787311888&width=832',
      'https://expensivechoice.in/cdn/shop/files/EC6C49DC-A1CC-4073-975F-7DAB827B5643.jpg?v=1787311888&width=1200',
      'https://expensivechoice.in/cdn/shop/files/24B3E991-40DC-4128-B561-18E0DFB7B39E.jpg?v=1787311888&width=832'
    ],
    description: 'Crisp pastel lemon-toned sunburst dial with sleek silver baton indexes and classic day-date complication. Subtle modern elegance for daily boardroom or casual wear.',
    specs: {
      movement: 'Japanese Precision Quartz Movement',
      caseMaterial: 'Mirror-Polished 316L Stainless Steel',
      strapMaterial: 'Five-Link Engineered Stainless Steel Bracelet',
      glass: 'Scratch-Proof Mineral Glass',
      waterResistance: '30 Meters Daily Water Resistance',
      warranty: '1 Year Machine Warranty'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 7,
    featuredInHotSelling: true,
  },

  // Sunglasses Collection
  {
    id: 'rayban-sunglass-d116',
    name: 'RAYBAN SUNGLASS D-116',
    category: 'sunglasses',
    brand: 'Rayban',
    price: 1399,
    originalPrice: 20000,
    images: [
      'https://expensivechoice.in/cdn/shop/files/F31485C9-B37C-4A98-A688-197D510D3A05.jpg?v=1787311625&width=832',
      'https://expensivechoice.in/cdn/shop/files/B92936BC-F042-4495-A547-E57A77CDD730.jpg?v=1787311625&width=1920'
    ],
    description: 'Classic lightweight square aviator frame with polished silver temples and gradient polarized lenses. Includes original leather case and microfiber cleaning cloth.',
    specs: {
      lensType: 'Polarized Anti-Glare UV400',
      frameMaterial: 'Ultra-lightweight Alloy Metal',
      uvProtection: '100% UVA/UVB Protection',
      warranty: '6 Months Frame Guarantee'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 15
  },
  {
    id: 'rayban-sunglass-z635',
    name: 'RAYBAN SUNGLASS Z-635',
    category: 'sunglasses',
    brand: 'Rayban',
    price: 1399,
    originalPrice: 15999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/FB2F1FC2-2C80-43F4-ACD9-15009D052A7A.jpg?v=1787792659&width=832',
      'https://expensivechoice.in/cdn/shop/files/4737F424-4237-4EFC-8ADF-176CE315C921.jpg?v=1787792659&width=1920'
    ],
    description: 'Iconic golden double bridge aviator sunglasses with gradient blue-tinted lenses. Complete luxury packaging with original leather case.',
    specs: {
      lensType: 'Gradient Blue Polycarbonate',
      frameMaterial: 'Gold-Tone High Tensile Metal',
      uvProtection: 'UV400 Total Protection',
      warranty: '6 Months Frame Guarantee'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 19
  },
  {
    id: 'gucci-sunglass-z634',
    name: 'GUCCI SUNGLASS Z-634',
    category: 'sunglasses',
    brand: 'Gucci',
    price: 1399,
    originalPrice: 29999,
    images: [
      'https://expensivechoice.in/cdn/shop/files/77AFEBC0-CDBB-4790-B956-4A3926C97954.jpg?v=1787792506&width=832',
      'https://expensivechoice.in/cdn/shop/files/2E29276B-02FE-419A-BD24-D54168BCD57A.jpg?v=1787792506&width=1920'
    ],
    description: 'Bold rectangular acetate shades with glossy black body and subtle gold Gucci branding along the temples. Complete with hard velvet presentation case.',
    specs: {
      lensType: 'Dark Charcoal Smoke High Definition',
      frameMaterial: 'Premium Handcrafted Acetate',
      uvProtection: '100% UV Protection Category 3',
      warranty: '6 Months Guarantee'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 11
  },
  {
    id: 'dior-sunglass-z633',
    name: 'DIOR SUNGLASS Z-633',
    category: 'sunglasses',
    brand: 'Dior',
    price: 1399,
    originalPrice: 20900,
    images: [
      'https://expensivechoice.in/cdn/shop/files/F886BD51-6989-4530-B0AE-F61E41A4BF92.jpg?v=1787792360&width=832',
      'https://expensivechoice.in/cdn/shop/files/D67659DC-ECD3-4E74-A529-755DE4621F11.jpg?v=1787792360&width=1920'
    ],
    description: 'Futuristic geometric frame with crystal clear optics and CD hinge detailing. The epitome of modern Parisian runway style.',
    specs: {
      lensType: 'Precision Optical Grade Lens',
      frameMaterial: 'Composite Acetate & Titanium Core',
      uvProtection: 'UV400 Certified',
      warranty: '6 Months Guarantee'
    },
    isSale: true,
    saleLabel: 'Sale',
    rating: 5,
    reviewCount: 14
  }
];

export const SHOWCASE_ITEMS = [
  {
    id: 'showcase-1',
    title: 'Rolex Day-Date Rose Gold Edition',
    subtitle: 'Crafted for the distinguished wrist',
    price: 1899,
    originalPrice: 29999,
    image: 'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_1a09a60b-396f-45b1-9242-835f7f637507.jpg?v=1787942764&width=1920',
    videoUrl: 'https://expensivechoice.in/cdn/shop/videos/c/vp/c0c4ef2167374fe9bc3979f113a01773/c0c4ef2167374fe9bc3979f113a01773.HD-1080p-2.5Mbps-92325853.mp4?v=0',
    productId: 'rolex-day-date-green-rose-gold'
  },
  {
    id: 'showcase-2',
    title: 'Patek Philippe Tourbillon Skeleton',
    subtitle: 'Swiss mechanical artistry in full display',
    price: 3499,
    originalPrice: 55000,
    image: 'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_5d1fd931-8f10-461e-b1d8-4cc888be85df.jpg?v=1787944297&width=1920',
    videoUrl: 'https://expensivechoice.in/cdn/shop/videos/c/vp/45716651b5bc483e9fb74e667a36eaa7/45716651b5bc483e9fb74e667a36eaa7.HD-1080p-3.3Mbps-92326865.mp4?v=0',
    productId: 'hublot-skeleton-automatic'
  },
  {
    id: 'showcase-3',
    title: 'Louis Vuitton Millionaires Eyewear',
    subtitle: 'Signature monogram and statement beveled front',
    price: 1399,
    originalPrice: 28999,
    image: 'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_13404091-955c-4b5c-8f43-4b3b8ff05d31.jpg?v=1787989463&width=1920',
    videoUrl: 'https://expensivechoice.in/cdn/shop/videos/c/vp/23859c2423ef416a8015952fc0e0e0f1/23859c2423ef416a8015952fc0e0e0f1.HD-720p-1.6Mbps-92325466.mp4?v=0',
    productId: 'gucci-sunglass-z634'
  },
  {
    id: 'showcase-4',
    title: 'Cartier Rimless Luxury Sunglasses',
    subtitle: 'Gradient rimless diamond-cut facets',
    price: 1399,
    originalPrice: 24999,
    image: 'https://expensivechoice.in/cdn/shop/files/rn-image_picker_lib_temp_a5cda9d9-c4bf-404e-8d18-a69a0b0b1783.jpg?v=1787989463&width=1920',
    videoUrl: 'https://expensivechoice.in/cdn/shop/videos/c/vp/26fb54a51f4a41e8b895da8d731463f1/26fb54a51f4a41e8b895da8d731463f1.HD-1080p-3.3Mbps-92328896.mp4?v=0',
    productId: 'rayban-sunglass-d116'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Anonymous',
    productName: 'Rado jubli ceramic',
    rating: 5,
    date: '12 Oct 2026',
    content: 'ओपन बॉक्स डिलीवरी चाहिए सेम यही होनी चाहिए',
    verified: true,
    image: 'https://review-images.judgeme.com/expensive-choice/1792071697__img_3497__original.jpeg?quality=80&width=480'
  },
  {
    id: 'rev-2',
    author: 'Sujit kumar',
    productName: 'Product Name : Rado Quar...',
    rating: 5,
    date: '10 Oct 2026',
    content: 'Watch bahot achhi h or mujhe bahot achhi lagi Dusri baar or bhi watch lenge',
    verified: true,
    image: 'https://review-images.judgeme.com/expensive-choice/1792069244__img_3494__original.webp?quality=80&width=480'
  },
  {
    id: 'rev-3',
    author: 'Samir shaikh',
    productName: 'ROLEX ARABIC DIAMOND...',
    rating: 5,
    date: '08 Oct 2026',
    content: 'Very nice and unique look watch. I love this watch personally 🫀',
    verified: true,
    image: 'https://review-images.judgeme.com/expensive-choice/1792068778__img_3493__original.jpeg?quality=80&width=480'
  },
  {
    id: 'rev-4',
    author: 'Pankaj pandya',
    productName: 'Rad_o silver Diastar skeleto...',
    rating: 5,
    date: '05 Oct 2026',
    content: 'Best watch and quality the look is perfect',
    verified: true,
    image: 'https://review-images.judgeme.com/expensive-choice/1792068455__img_3491__original.jpeg?quality=80&width=480'
  },
  {
    id: 'rev-5',
    author: 'Rohit Verma',
    productName: 'Tissot T-Classic Chronograph',
    rating: 5,
    date: '02 Oct 2026',
    content: 'Advance ₹99 diya tha and COD pe courier wale ne parcel time pe deliver kar diya. Quality 10/10.',
    verified: true,
    image: 'https://review-images.judgeme.com/expensive-choice/1792057797__img_3488__original.jpeg?quality=80&width=480'
  },
  {
    id: 'rev-6',
    author: 'Vikram Singh',
    productName: 'Hublot Skeleton Automatic',
    rating: 5,
    date: '28 Sep 2026',
    content: 'Video call pe live watch dekh ke order kiya tha. Exact same piece aaya. Fully satisfied!',
    verified: true,
    image: 'https://review-images.judgeme.com/expensive-choice/1792057184__img_3486__original.jpeg?quality=80&width=480'
  }
];

export const PARTNERS = [
  { name: 'ROLEX', label: 'GENÈVE', iconType: 'crown' },
  { name: 'RADO', label: 'SWITZERLAND', iconType: 'anchor' },
  { name: 'FOSSIL', label: 'AUTHENTIC', iconType: 'clean' },
  { name: 'TISSOT', label: 'SWISS WATCHES SINCE 1853', iconType: 'swiss-cross' },
  { name: 'G-SHOCK', label: 'RESIST SHOCK', iconType: 'bold' },
  { name: 'OMEGA', label: 'SWISS MADE', iconType: 'omega' },
];
