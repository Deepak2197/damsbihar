import Invite from "../view/CustomQbank/Invite";

export const API_ENDPOINTS = {
  // Podcast Section START

  PODCAST: {
    DATA: `/v2_data_model/get_podcast_data`,
    BOOKMARKED: `/v2_data_model/bookmarked_podcast`,
    FRONT_PAGE: `/v2_data_model/podcast_front_page`,
    AUTHOR_CHANNEL: `/v2_data_model/get_podcast_author_channel_list`,
  },

  // Help and Support START

  HELP_AND_SUPPORT: {
    STUDENT_QUERY: `/v2_data_model/StudentQueryQproblem`,
    ALL_STUDENT_QUERIES: `/v2_data_model/get_all_student_queries1`,
    PROBLEM_TYPES: `/v2_data_model/get_all_student_problem_type`,
    MESSAGE_LIST: `/v2_data_model/showMsglist`,
    SEND_MESSAGE: `/v2_data_model/send_meassage`,
    DYNAMIC_USER_FIELDS: `/v2_data_model/dyanamic_user_fields_list`,
    SUPPORT_CATEGORY: `/v2_data_model/get_help_support_Category`,
    SUPPORT_CATEGORY_WEB: `/v2_data_model/get_help_and_support_by_category_web`,
  },

  // Contact Us START
  CONTACT_US: {
    QUERY: `/v2_data_model/query`,
    CORPORATE_OFFICE: `/v2_data_model/get_footer_corporate_office`,
  },

  // News And Article START
  NEWS_AND_ARTICLES: {
    LIKE_AND_BOOKMARK_STATUS: `/v2_data_model/update_like_bookmark_status`,
    GET_ARTICLE_BY_TAG_ID: `v2_data_model/get_article_by_tag_id`,
    GET_ARTICLES_NEW: `/v2_data_model/get_articles_list_new`,
    TAG_LIST: `/v2_data_model/get_tags_list`,
    CAT_LIST: `/v2_data_model/get_cat_list`,
    GET_ARTICLE_DETAIL: `/v2_data_model/get_articles_detail`,
  },

  // Franchise START
  FRANCHISE: {
    GET_STATES: `/v2_data_model/states`,
    GET_CITIES: `/v2_data_model/cities`,
    FRANCHISE_APPLY: `/v2_data_model/franchise_apply`,
  },

  FIND_CENTER: {
    FIND_CENTER: `/v2_data_model/find_center`,
    FIND_STATE: `/v2_data_model/find_state`,
    FIND_CITY: `/v2_data_model/find_city`,
  },

  // Career START
  CAREER: {
    //   QUERY:`/v2_data_model/career_query`,
    QUERY: `/v2_data_model/query`,
    ADD_CRM_LEAD: `/admin_api_model/add_crm_lead`,
  },

  // My Address START
  MY_ADDRESS: {
    GET_ADDRESS: `/v2_data_model/getAddress`,
    ADD_NEW_ADDRESS: `/v2_data_model/user_cart/UserCartAddress/addNewAddress`,
    SET_DEFAULT_ADDRESS: `/v2_data_model/setDefaultAddress`,
    EDIT_ADDRESS: `/v2_data_model/editAddress`,
    DELETE_ADDRESS: `/v2_data_model/deleteAddress`,
  },

  // My Order START
  My_ORDER: {
    OLDER_HISTORY: `/v2_data_model/order_history`,
    GET_INVOICE_DISPLAYS: `/v2_data_model/get_invoice_displays`,
    GET_ADDRESS: `/v2_data_model/getAddress`,
  },

  // My Attendace START
  My_ATTENDANCE: {
    GET_USER_ATTENDANCE: `/v2_data_model/get_users_attendance_new`,
  },

  // Join-Affiliate START
  JOIN_AFFILIATE: {
    AFFILIATE_ROLE: `/v2_data_model/affiliateRole`,
    SIGNUP_AFFILIATE: `/v2_data_model/signup_affiliate`,
    DASHBOARD_AFFILIATE: `/v2_data_model/affiliate_dashboard`,
    MY_STUDENT_COUNT: `/v2_data_model/my_student_count`,
    MY_ACCOUNT: `/v2_data_model/my_account`,
    GET_PROFILE_INFO: `/v2_data_model/get_profile_info`,
  },

  // Refer User Detaile START
  REFER_USER_DETIALS: {
    REFER_USER_LIST: `/v2_data_model/referral_user_list`,
  },

  // refer&earn START
  REFER_EARN: {
    REFER_EARN_CONTENT_LIST: `/v2_data_model/referral_earn_content_list`,
    COURSE_LIST: `/v2_data_model/referral_earn_course_list`,
    USER_DETAILS: `/v2_data_model/send_referral_earn_user_detail`,
  },

  // Wallet START
  WALLET: {
    USER_CASH_REFOUND: `/v2_data_model/user_cash_refund`,
  },

  // My-payment
  MY_PAYMENT: {
    PARTIAL_STUDENT_LIST: `v2_data_model/partial_student_lists`,
    COMPLETE_TRANSACTION_CART: `v2_data_model/complete_transaction_cart`,
    PAYMENT_REQUEST_EXP_CHECKED: `/v2_data_model/paymentrequest_exp_checked`,
    GERNATE_PAYTM_SHECKSUM_SUM: `/v2_data_model/generate_paytm_checksum_new`,
    GET_USER_CBT_REG: `/v2_data_model/get_user_cbt_reg`,
  },

  //Bookmark START
  BOOKMARK: {
    MY_BOOKMARKS: `/v2_data_model/my_bookmarks`,
    BOOKMARK_CATEGORY_LIST: `/v2_data_model/bookmark_category_list`,
  },

  // MY Study START
  MY_STUDY: {
    GET_LIST_OF_MY_PLANE_COURSES: `/v2_data_model/get_list_of_my_plan_courses`,
    GET_PLANE_CHILD_COURSE: `v2_data_model/get_plan_child_course`,
    GET_COURSE_SCHEDULAR_DATA: `/v2_data_model/getCourseSchedularData`,
  },

  // DOCTOR LOUNGE START
  DOCTOR_LOUNGE: {
    PODCAST_CATEGORY_LIST: `/v2_data_model/podcast_category_list`,
    ADD_UPDATE_LIKE: `v2_data_model/add_update_like`,
    ADDUPDATE_VIDEO_COMMENT: `v2_data_model/podcast_addupdate_video_comment`,
    UPDATE_VIDEO_COMMENT: `v2_data_model/podcast_update_video_comment`,
    DELETE_VIDEO_COMMENT: `v2_data_model/podcast_delete_video_comment`,
    PODCAST_VIDEO_LISTV2: `/v2_data_model/podcast_video_listv2`,
  },

  // CBT START
  CBT: {
    GET_CBT_LIST: `/v2_data_model/get_cbt_list`,
    GET_CBT_CAT_LIST: `/v2_data_model/get_cbt_cat_list`,
    GET_CBT_CITY: `/v2_data_model/get_cbt_city`,
    GET_CBT_USER: `/v2_data_model/get_cbt_user`,
    CLEAR_DATA: `/v2_data_model/clearCart`,
    ADD_COURSE_TO_CART: `v2_data_model/addCourseToCart`,
  },

  //EVENT START
  EVENT: {
    GET_ALL_EVENTS: `/v2_data_model/get_all_events`,
    GET_EVENT_DETAILE: `/v2_data_model/get_event_detaile`,
    ADD_REVIEW_TO_EVENT: `/v2_data_model/add_review_to_events`,
    GET_EVENT_WIZE_CENTER: `/v2_data_model/get_event_wise_center`,
  },

  //MEDIMART START
  MEDIMART: {
    GET_ECOMM_CATEGORY_LIST: `/v2_data_model/get_ecomm_category_list`,
    GET_ECOMM_SEE_ALL_DETAIL: `/v2_data_model/get_ecomm_see_all_detail`,
    GET_ECOMM_SUBCATEGORY_LIST: `/v2_data_model/get_ecomm_subcategory_list`,
    GET_ECOMM_PRODUCT_DETAILE: `/v2_data_model/get_ecomm_product_detail`,
    GET_USER_CART_DATA: `/v2_data_model/getUserCartData`,
    ADD_BOOK_TO_CART: `/v2_data_model/add_book_to_cart`,
    GET_ECOMM_SUB_SUBCATEGORY_LIST: `/v2_data_model/get_ecomm_sub_subcategory_list`,
  },

  //add cart

  ADD_TO_CART: {
    APPLY_CART_COUPON: `/v2_data_model/applyCartCoupon`,
    GET_ADDRESS: `/v2_data_model/getAddress`,
    CALCULATE_GST: `/v2_data_model/calculateGst`,
    GET_PAYMENT_GATEWAY: `/v2_data_model/getPaymentGateway`,
    INITIALIZE_COURSE_TRANSECTION_CART: `/v2_data_model/initializeCourseTransactionCart`,
    GET_SHIPPING_CHARGE: `/v2_data_model/get_shipping_charge`,
    APPLY_WALLET_REFOUND_CART: `v2_data_model/apply_wallet_refund_cart`,
    GET_USER_REWARD: `v2_data_model/get_user_rewards`,
    REMOVE_COURSE_FROM_CART: `/v2_data_model/removeCourseFromCart`,
    GET_COUPON_LIST: `/v2_data_model/get_coupon_list`,
    GET_RZP_KEY: `rzp_live_6iSc6G3qM2aeDy`,
  },

  // Before Login
  HOMEPAGE_INDEX: {
    WEB_VIDEO: `/v2_data_model/get_web_video`,
    HOMESCREEN_MYPLANE_V2: `/v2_data_model/get_homescreen_myplan_v2`,
    GET_BANNER: `/v2_data_model/get_banner`,
    GET_DYNAMICWEBDATA: `/v2_data_model/getDynamicWebData`,
    GET_HOME_NEWS_AI_NEWSARTICLE_V2: `/v2_data_model/getHomeNewAiNewsArticalsv2`,
    FIND_STATE: `v2_data_model/find_state`,
    FIND_CITY: `v2_data_model/find_city`,
    FIND_CENTER: `/v2_data_model/find_center`,
    TOPPER_ZONE_LIST_BY_ID: `/v2_data_model/topper_zone_list_by_id`,
    APP_SENT_LINK: `/v2_data_model/App_sent_link`,
    GET_ALL_WEBNEWS: `/v2_data_model/get_all_webnews`,
    PODCAST_HOME_LIST_NEW: `/v2_data_model/podcast_home_list_new`,
    GET_FACUTIES: `/v2_data_model/getFaculties`,
  },

  // LOGIN
  LOGIN: {
    LOGIN_AUTHENTICATION: `v2_data_model/login_authentication_v6`,
    USER_FORGOTPIN: `/v2_data_model/userforgotpin`,
    USER_PIN_STATUS: `/v2_data_model/user_pin_status`,
    LOGIN_BY_PIN: `/v2_data_model/login_authentication_bypin`,
    RESET_PIN: `/v2_data_model/user_resetpin`,
    STUDENT_VERIFY_STATUS: `v2_data_model/student_verify_status`,
  },

  // NEW REGISTRATION
  NEW_REGISRATION: {
    USER_PROGRESS_BARSTATUS: `/v2_data_model/getUserProgressBarstatus`,
    CONTACT_REGISTRATION_V4: `/v2_data_model/contact_registration_v4`,
    STUDENT_COURSE_STREAM: `/v2_data_model/student_course_stream`,
    CONTACT_REGISTRATION_COMPLETED_V4: `/v2_data_model/contact_registration_completed_v4`,
    STATE_LIST_SEARCH: `v2_data_model/stateListSearch`,
    GET_ACADEMICYEAR_YEAR: `/v2_data_model/getAcademicyear`,
    COLLEGE_LIST: `v2_data_model/collegeList`,
    ABROADCOLLEGELIST: `v2_data_model/AbroadcollegeList`,
  },

  //AFTER LOGIN HOMEPAGE
  COURSEACESS_HOMEPAGE: {
    GET_HOMESCREEN_TAB: `/v2_data_model/GetHomeScreenTab`,
    GET_HOMESCREEN_CATEGORYDATA: `/v2_data_model/get_homescreen_categorydata`,
    GET_DAILY_CASESE_LIST: `/v2_data_model/getDailyCasesList`,
    GET_PLANE_BY_CATEGORY_ID: `/v2_data_model/get_all_plan_by_category_id`,
    DAILY_CASES_ALL: `/v2_data_model/getDailyCasesAll`,
  },

  //TEST SERIES
  TEST_SERIES: {
    GET_TESTSERIES: `/v2_data_model/get_testseries`,
  },

  //CUSTOM QBANK
  CUSTOM_QBANK: {
    CUSTOM_QBANK_HISTORY: `v2_data_model/get_custom_qbank_history`,
    BOOKMARK_LIST: `v2_data_model/bookmark_list`,
    SUBJECT_V2: `/v2_data_model/get_qbank_subject_v2`,
    CREATE_QBANK_NEW: `/v2_data_model/create_qbank_new`,
    ATTEMPT_COMBINE: `v2_data_model/get_custom_qbank_attempts_combined`,
    INVITE_CUSTOM_QBANK: `/v2_data_model/get_invited_custom_qbank`,
    QBANK_COURSE: `/v2_data_model/get_qbankcourse`,
    COURSE_TYPES_TEST: `/v2_data_model/test_series_course_type_test`,
  },

  //COURSE_CATEGORY
  COURSE_CATEGORY: {
    SUB_CATEGORY: `v2_data_model/course_sub_category`,
    COURSES_BY_CAT_WEB: `/v2_data_model/get_all_live_courses_by_cat?web`,
    GET_COURSE_DETAIL: `v2_data_model/get_course_detail`,
  },

  //PROFILE

  PROFILE: {
    PROFILE_UPDATE: `/v2_data_model/student_profile_update`,
    PROFILE_CHANGE: `/v2_data_model/student_profile_changes`,
    PROFILE_INFO: `/v2_data_model/getuser_profile_info`,
    PROFILE_IMAGE: `/v2_data_model/upload_profile_image`,
    PROFILE_IMAGE_UPDATE: `/v2_data_model/user_profile_image_update`,
    USER_PROFILE_UPDATE_REQUEST: `/v2_data_model/userprofileUpdateRequest`,
    USER_UPDATEPIN: `/v2_data_model/user_updatePin`,
  },

  //DAILYCASES
  DAILYCASES: {
    GETDAILYCASESBYID: `/v2_data_model/getDailyCasesById`,
    CASE_LIKE_BOOKMARK_STATUS: `/v2_data_model/update_daily_cases_like_bookmark_status`,
    ADD_COMMENT_DAILY_CASES: `/v2_data_model/add_comment_daily_cases`,
    COMMENT_PIN_STATUS: `/v2_data_model/update_comment_pin_status`,
    DELETE_COMMENT_DAILYCASE: `/v2_data_model/delete_comment_dailycase`,
    UPDATE_COMMENT_DAILY_CASES: `/v2_data_model/update_comment_daily_cases`,
  },

  //HEADER
  HEADER: {
    GET_CITY: `v2_data_model/get_cities`,
  },
};
