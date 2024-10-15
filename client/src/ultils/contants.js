import path from './path'
import icons from './icons'


export const navigation = [
  {
    id: 1,
    value: 'HOME',
    path: `/${path.HOME}`
  },
  {
    id: 7,
    value: 'ANIMAL',
    path: `/${path.ANIMAL}`
  },
  {
    id: 2,
    value: 'SHOPPING',
    path: `/${path.HOMESHOPPING}`
  },
  {
    id: 3,
    value: 'PRODUCT',
    path: `/${path.PRODUCT}`
  },
  {
    id: 4,
    value: 'BLOGS',
    path: `/${path.BLOG}`
  },
  {
    id: 5,
    value: 'OUR_SERVICE',
    path: `/${path.OUR_SERVICE}`
  },
  {
    id: 6,
    value: 'FAQ',
    path: `/${path.FAQ}`
  },
  
]

const { FaReply, FaFileInvoice, AiOutlineProduct, IoShield, FaTty, FaGift, FaTruck, AiOutlineDashboard, FaUserGroup,BiUserPin } = icons
export const productExtraInfo = [
  {
    id: 1,
    title: 'Chất lượng',
    sub: 'Cam kết chính hãng 100%',
    icon: <IoShield />
  },
  {
    id: 2,
    title: 'Ưu đãi nhiều  ',
    sub: 'Nhiều phần quà hấp dẫn',
    icon: <FaGift />
  },
  {
    id: 3,
    title: 'Đổi trả miễn phí',
    sub: 'Đổi trả trong vòng 7 ngày',
    icon: <FaReply />
  },
  {
    id: 4,
    title: 'Giao hàng tiện lợi',
    sub: 'Nhanh chóng và miễn phí',
    icon: <FaTruck />
  },
  {
    id: 5,
    title: 'Chăm sóc khách hàng',
    sub: 'Tận tình 24/7',
    icon: <FaTty />
  }
]

export const productInfoTabs = [
  {
    id: 1,
    name: 'Description',
    content: `Technology: GSM / HSPA / LTE
              Dimensions: 144.6 x 69.2 x 7.3 mm
              Display: IPS LCD 5.15 inches
              Resolution: 1080 x 1920
              OS: Android OS, v6.0 (Marshmallow)
              Chipset: Snapdragon 820
              CPU: Quad-core
              Internal: 32GB/64GB/128GB
              Camera: 16 MP, f/2.0 - 4 MP, f/2.0
              It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.
              The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.
              The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.
              Then you learn that inside there is the latest Snapdragon 820 chipset, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?`
  },
  {
    id: 2,
    name: 'Warranty',
    content: `Warranty Information
LIMITED WARRANTIES
Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:

Frames Used In Upholstered and Leather Products
Limited Lifetime Warranty
A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
  },
  {
    id: 3,
    name: 'Delivery',
    content: `Purchasing & Delivery
Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
  },
  {
    id: 4,
    name: 'payment',
    content: `Purchasing & Delivery
Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
  }
]

export const colors = ['black', 'red', 'blue', 'gray', 'violet', 'green', 'brown']

export const sorts = [
  {
    id: 1,
    value: '-sold',
    text: 'Bán chạy'
  },
  {
    id: 2,
    value: '-title',
    text: 'A -> Z'
  },
  {
    id: 3,
    value: 'title',
    text: 'Z -> A'
  },
  {
    id: 4,
    value: '-price',
    text: 'giá tăng dần'
  },
  {
    id: 5,
    value: 'price',
    text: 'giá giảm giần'
  },
  {
    id: 6,
    value: '-createdAt',
    text: 'Mới nhất'
  },
  {
    id: 7,
    value: 'createdAt',
    text: 'Cũ nhất'
  }
]

export const voteOptions = [
  {
    id: 1,
    text: 'Rất tệ'
  },
  {
    id: 2,
    text: 'Tệ'
  },
  {
    id: 3,
    text: 'Được'
  },

  {
    id: 4,
    text: 'Tốt'
  },
  {
    id: 5,
    text: 'Xuất Sắc'
  }
]

export const adminSidebar = [
  {
    id: 1,
    type: 'SINGLE',
    text: 'Dashboard',
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={24} />
  },
  {
    id: 2,
    type: 'SINGLE',
    text: 'Manage Users',
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <FaUserGroup size={24} />
  },
  {
    id: 3,
    type: 'PARENT',
    text: 'Manage products',
    icon: <AiOutlineProduct size={24} />,
    submenu: [
      {
        text: 'Create Product ',
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`
      },
      {
        text: 'Manage Product ',
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`
      }
    ]
  },
  {
    id: 4,
    type: 'SINGLE',
    text: 'Manage Order',
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <FaFileInvoice size={24} />
  }
]

export const popupAfterLogin = [
  {
    id: 1,
    type: 'USER',
    text: 'Quản lý tài khoản',
    path: `/${path.MEMBER}`,
    icon: <BiUserPin />
  },
  {
    id: 2,
    type: 'ADMIN',
    text: 'Quản lý website',
    path: `/${path.ADMIN}`,
    icon: <AiOutlineDashboard />
  },
  {
    id: 3,
    type: 'USER',
    text: 'Đổi mật khẩu',
    path: `/${path.MEMBER}`
  }
]

export const roleUser = [
  {
    code: 2003,
    value: 'user'
  },
  {
    code: 2002,
    value: 'admin'
  },
]

export const blockUser = [
  {
    code: true,
    value: 'Blocked'
  },
  {
    code: false,
    value: 'Active'
  }
]
export const memberSidebar = [
  {
    id: 1,
    type: 'SINGLE',
    text: 'Thông tin cá nhân',
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={24} />
  },
  {
    id: 2,
    type: 'SINGLE',
    text: 'Giỏ hàng',
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <FaUserGroup size={24} />
  },
  {
    id: 3,
    type: 'SINGLE',
    text: 'Lịch sử mua hàng',
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <FaFileInvoice size={24} />
  },
   {
    id: 4,
    type: 'SINGLE',
    text: 'Sản phẩm yêu thích',
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <FaFileInvoice size={24} />
  }
];


