const path = {
  PUBLIC: '/',
  HOME: '',
  HOMESHOPPING: 'homeshopping',
  ALL: '*',
  LOGIN: 'login',
  PRODUCT__CATEGORY: ':category',
  BLOG: 'blog',
  OUR_SERVICE: 'our_sevice',
  FAQ: 'faq',
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: 'homeshopping/:category/:pid/:title',
  FINAL_REGISTER: 'finalregister/:status',
  RESET_PASSWORD: 'reset-password/:token',
  LOGOUT: 'logout',
  CHECKOUT: 'checkout',
  ANIMAL: 'animal',
  DETAIL_ANIMAL__CATEGORY__AID__TITLE: 'animal/:category/:aid/:title',



  //admin
  ADMIN: 'admin',
  DASHBOARD: 'dashboard',
  MANAGE_USER: 'manage-user',
  MANAGE_PRODUCT: 'manage-product',
  MANAGE_ORDER: 'manage-order',
  CREATE_PRODUCT: 'create-product',
  MANAGE_COUPON: 'manage-coupon',


  // member
  MEMBER: 'member',
  PERSONAL: 'personal',
  MY_CART: 'my-cart',
  HISTORY: 'buy-history',
  WISHLIST: 'wishlist',

};

export default path;
