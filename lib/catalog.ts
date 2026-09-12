export const collections={
 automations:{label:'الأتمتة',single:'أتمتة',fields:[['name','اسم الأتمتة'],['keyword','الكلمات المفتاحية (بفاصلة)'],['postId','معرّف المنشور (اختياري)'],['reply','الرسالة الخاصة'],['publicReply','الرد العلني (اختياري)']]},
 contacts:{label:'العملاء',single:'عميل',fields:[['name','الاسم'],['email','البريد الإلكتروني'],['phone','رقم الهاتف'],['tags','الوسوم'],['notes','ملاحظات']]},
 products:{label:'المنتجات',single:'منتج',fields:[['name','اسم المنتج'],['description','الوصف'],['price','السعر'],['currency','العملة'],['url','رابط الشراء'],['stock','المخزون']]},
 services:{label:'الخدمات',single:'خدمة',fields:[['name','اسم الخدمة'],['duration','المدة بالدقائق'],['price','السعر'],['currency','العملة'],['staff','الموظف'],['startHour','بداية الدوام (0–23)'],['endHour','نهاية الدوام (1–24)']]},
 knowledge:{label:'قاعدة المعرفة',single:'معلومة',fields:[['name','العنوان'],['content','المحتوى المعتمد']]},
 orders:{label:'الطلبات',single:'طلب',fields:[['name','اسم العميل'],['phone','الهاتف'],['address','العنوان'],['items','تفاصيل المنتجات'],['total','الإجمالي'],['currency','العملة'],['status','الحالة']]},
 links:{label:'روابط الحملات',single:'رابط',fields:[['name','اسم الحملة'],['url','الرابط المستهدف']]},
 templates:{label:'قوالبي',single:'قالب',fields:[['name','اسم القالب'],['keyword','الكلمات المفتاحية'],['reply','الرسالة'],['category','النشاط']]}
} as const;
export type Kind=keyof typeof collections;
export const templates=[
 {name:'عرض السعر',category:'متاجر',keyword:'السعر,بكم,قديش,كم',reply:'أهلًا! يسعدنا اهتمامك. أي منتج تريد معرفة تفاصيله؟'},
 {name:'حجز استشارة',category:'خدمات',keyword:'حجز,موعد,استشارة',reply:'أهلًا بك! ما الخدمة التي ترغب بحجز موعد لها؟'},
 {name:'تحميل الدليل',category:'صناع محتوى',keyword:'دليل,كتاب,ارسل',reply:'شكرًا لاهتمامك بالدليل. رد بكلمة نعم وسنرسل لك التفاصيل.'},
 {name:'اختيار العطر',category:'عطور',keyword:'عطر,عطور',reply:'أهلًا! هل تبحث عن عطر رجالي أم نسائي؟'},
 {name:'تفاصيل العقار',category:'عقارات',keyword:'تفاصيل,شقة,عقار',reply:'أهلًا! هل تبحث عن شراء أم إيجار؟ وفي أي منطقة؟'},
 {name:'قائمة الطعام',category:'مطاعم',keyword:'منيو,قائمة,طلب',reply:'أهلًا وسهلًا! هل ترغب بالتوصيل أم زيارة المطعم؟'}
];
export const integrationSpecs=[
 {id:'instagram',name:'Instagram',description:'التعليقات والرسائل والقصص',keys:['META_APP_ID','META_APP_SECRET','META_VERIFY_TOKEN','META_API_VERSION','ENCRYPTION_KEY'],status:'implemented'},
 {id:'whop',name:'Whop',description:'اشتراكات المنصة وإشعارات المدفوعات',keys:['WHOP_API_KEY','WHOP_WEBHOOK_SECRET','WHOP_PLAN_STARTER'],status:'implemented'},
 {id:'ai',name:'AI',description:'صياغة الردود وتوليد الأتمتة من المعرفة',keys:['AI_API_KEY','AI_MODEL'],status:'implemented'},
 {id:'email',name:'Email',description:'استعادة كلمة المرور ورسائل الخدمة',keys:['RESEND_API_KEY','EMAIL_FROM'],status:'implemented'},
 {id:'whatsapp',name:'WhatsApp',description:'يتطلب تطبيق Meta ورقم أعمال معتمدًا',keys:[],status:'not_implemented'},
 {id:'messenger',name:'Messenger',description:'ربط صفحات Facebook',keys:[],status:'not_implemented'},
 {id:'telegram',name:'Telegram',description:'محادثات بوت تيليغرام',keys:[],status:'not_implemented'},
 {id:'calendar',name:'Google Calendar',description:'مزامنة المواعيد عبر OAuth',keys:[],status:'not_implemented'},
 {id:'commerce',name:'Shopify / WooCommerce',description:'مزامنة الكتالوج والطلبات',keys:[],status:'not_implemented'},
 {id:'sheets',name:'Google Sheets',description:'تصدير CSV متاح، المزامنة غير مفعلة',keys:[],status:'not_implemented'}
];
