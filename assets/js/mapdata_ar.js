var simplemaps_countrymap_mapdata = {
    main_settings: {
        //General settings
        // width: "900", 
        border_color: "#D1D1D1",

        //State defaults
        state_color: "#fff",
        state_url: "",
        border_size: 1,
        all_states_inactive: "no",
        all_states_zoomable: "no",

        //Location defaults

        location_border_color: "#D1D1D1",
        location_border: 2,
        location_hover_border: 2.5,
        all_locations_inactive: "no",
        all_locations_hidden: "no",

        //Label defaults
        label_color: "#000",
        label_hover_color: "#fff",
        label_size: 16,
        label_display: "all",
        label_font: "Marcher",
        label_scale: "yes",
        hide_labels: "no",
        hide_eastern_labels: "no",

        //Zoom settings
        zoom: "no",
        manual_zoom: "no",
        // back_image: "no",
        // initial_back: "no",
        // initial_zoom: "-1",
        // initial_zoom_solo: "no",
        // region_opacity: 1,
        // region_hover_opacity: 0.6,
        // zoom_out_incrementally: "no",
        // zoom_percentage: 0.99,
        // zoom_time: 0.5,

        //Popup settings
        popup_nocss: "yes",

        //Advanced settings
        div: "map",
        auto_load: "yes",
        url_new_tab: "no",
        images_directory: "default",
        fade_time: 0.1,
        // link_text: "View Website",
        popups: "detect"
    },
    state_specific: {
        CNAH: {
            name: "Anhui",
            description: `
          <div>
            <hr>
            <ul>
                <div>
                    <li>التركيز التعليمي:</li>
                    <p> الهندسة، التكنولوجيا، تاريخ الصين، الأدب.</p>
                </div>
                <div>
                    <li>الإنتاج البارز: </li>
                    <p>الآلات، السيارات، المنسوجات، المنتجات الغذائية.</p>
                </div>
                <div>
                    <li>التراث الثقافي: </li>
                    <p>العمارة الهوى، المأكولات الهوى.</p>
                </div>
                <div>
                    <li>عدد السكان: </li>
                    <p>حوالي 62 مليون نسمة.</p>
                </div>
                <div>
                    <li>الطقس: </li>
                    <p>مناخ شبه استوائي رطب مع فصول مميزة.</p>
                </div>
                <div>
                    <li>المعالم السياحية: </li>
                    <p>جبل هواشان (الجبل الأصفر)، القرى القديمة في جنوب أنهوي (سيدي وهونغكون).</p>
                </div>
                <div>
                    <li>الشركات الشهيرة عالميًا:</li>
                    <p>Hefei Meiling (الأجهزة المنزلية)، Chery Automobile</p>
                </div>
            </ul>
        </div>
      `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNBJ: {
            name: "Beijing",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNCQ: {
            name: "Chongqing",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNFJ: {
            name: "Fujian",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>الدراسات البحرية، علم الأحياء البحرية، الطب الصيني التقليدي.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p>الإلكترونيات، الآلات، الملابس، الشاي (خاصةTieguanyin).</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>ثقافات Minnan وHakka، منازل فوجيان Tulou.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 39 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ شبه استوائي دافئ ورطب.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>جبال وويى، جزيرة جولانغيو، منازل فوجيان Tulou.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>Anta Sports (الملابس الرياضية)، , Xiamen Airlines.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNGD: {
            name: "Guangdong",
            description: `
          <div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>الدراسات التجارية، التجارة الدولية، الابتكار.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p>الإلكترونيات، الألعاب، المنسوجات، الأثاث.</p>
              </div>
              <div>
                  <li>التراث الثقافي: </li>
                  <p> ثقافة الكانتونية، اللغة، المأكولات.</p>
              </div>
              <div>
                  <li>عدد السكان: </li>
                  <p>أكثر من 113 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس: </li>
                  <p>مناخ شبه استوائي رطب، شتاء معتدل، صيف حار.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p>برج كانتون، جزيرة شاميان، منتجع سياحي تشيميلونغ.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا:  </li>
                  <p>Huawei (الاتصالات)، Tencent (خدمات الإنترنت)، ZTE (الاتصالات).</p>
              </div>
          </ul>
      </div>
      
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNGS: {
            name: "Gansu",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>الجيولوجيا، علم الآثار، تاريخ طريق الحرير.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p> التعدين (النيكل، الكوبالت)، الطب الصيني التقليدي، الزراعة.</p>
            </div>
            <div>
                <li>التراث الثقافي:  </li>
                <p>طريق الحرير، الفن البوذي (كهوف موغاو).</p>
            </div>
            <div>
                <li>عدد السكان:  </li>
                <p>حوالي 26 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ قاري، شبه جاف إلى جاف.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>كهوف موغاو، منتزه تشانغيه دانشيا الجيولوجي.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>غير معروفة بشكل بارز للشركات متعددة الجنسيات ولكنها مهمة في تطوير الطاقة المتجددة.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNGX: {
            name: "Guangxi",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الزراعة، العلوم البيئية، الدراسات العرقية.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>قصب السكر، الأرز، الغابات.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>ثقافة أقلية تشوانغ، المناظر الكارستية.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 49 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ شبه استوائي، أمطار غزيرة.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>جبال كارست في قويلين، نهر لي، يانغشو.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Liugong Machinery Co., Ltd. (آلات البناء).</p>
                    </div>
                </ul>
            </div>
            `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNGZ: {
            name: "Guizhou",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHA: {
            name: "Henan",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>التاريخ، الزراعة، الطب الصيني التقليدي.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>المحاصيل الغذائية، المنسوجات، الفحم.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>معبد شاولين، العواصم القديمة (لويانغ، كايفنغ).</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 99 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ شبه استوائي رطب، أمطار موسمية.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>معبد شاولين، كهوف لونغمين، جبل يونتاي.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Zhengzhou Nissan، Henan Shuanghui Investment & Development (معالجة الأغذية).</p>
                    </div>
                </ul>
            </div>
            `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHB: {
            name: "Hubei",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>العلوم الطبية، الهندسة الهيدروليكية، السيارات.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p> السيارات، الفولاذ، الصناعات التقنية العالية.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>فنون الدفاع عن النفس في وودانغ، سد الممرات الثلاثة.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 59 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ شبه استوائي رطب، صيف حار، شتاء بارد.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>رج الرافعة الصفراء، جبال وودانغ، سد الممرات الثلاثة:</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>Dongfeng Motor Corporation، Wuhan Iron and Steel (Group) Corp.</p>
            </div>
        </ul>
    </div>
    
      
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHE: {
            name: "Hebei",
            description: `
          <div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>الهندسة، التكنولوجيا، الزراعة.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p> الفولاذ، الأدوية، الصناعات الميكانيكية.</p>
              </div>
              <div>
                  <li>التراث الثقافي: </li>
                  <p> أجزاء من سور الصين العظيم، العمارة القديمة.</p>
              </div>
              <div>
                  <li>عدد السكان: </li>
                  <p>حوالي 75 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس:</li>
                  <p>مناخ موسمي قاري، صيف حار، شتاء بارد.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p> أجزاء من سور الصين العظيم (جينشانلينغ، موتياني)، منتجع جبل تشنغده.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا: </li>
                  <p>Hebei Iron and Steel Group، Great Wall Motor Company.</p>
              </div>
          </ul>
      </div>
      
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHI: {
            name: "Hainan",
            description: `
          <div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>السياحة، العلوم البحرية، الزراعة الاستوائية.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p>الفواكه الاستوائية، المأكولات البحرية، المطاط.</p>
              </div>
              <div>
                  <li>التراث الثقافي: </li>
                  <p>ثقافات لي ومياؤو.</p>
              </div>
              <div>
                  <li>عدد السكان: </li>
                  <p>حوالي 9 ملايين نسمة.</p>
              </div>
              <div>
                  <li>الطقس:  </li>
                  <p>مناخ موسمي استوائي.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p>شواطئ سانيا، المدينة التاريخية هايكو، جزيرة ووتشي.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا: </li>
                  <p>HNA Group (مجموعة متعددة الجنسيات تهتم بالطيران، العقارات، الخدمات المالية، السياحة).</p>
              </div>
          </ul>
      </div>
      
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHK: {
            name: "Hong Kong Special Administrative Region",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHL: {
            name: "Heilongjiang",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>الهندسة، الزراعة، الغابات.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p>فول الصويا، الألبان، الخشب.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p> التأثير الروسي، ثقافات Hezhen وAinu.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 38 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ موسمي قاري، شتاء بارد جدًا.</p>
            </div>
            <div>
                <li>المعالم السياحية:  </li>
                <p>مهرجان الجليد في هاربين، منتجع يابولي للتزلج، العمارة الروسية في هاربين.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>Harbin Pharmaceutical Group, Harbin Electric Corporation.</p>
            </div>
        </ul>
    </div>
    
      `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHN: {
            name: "Hunan",
            description: `
          <div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>الهندسة، الزراعة، دراسات الإعلام.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p> الأرز، الشاي، الفولاذ، المعادن غير الحديدية.</p>
              </div>
              <div>
                  <li>التراث الثقافي:  </li>
                  <p>ثقافة Huxiang، مسقط رأس ماو تسي تونغ.</p>
              </div>
              <div>
                  <li>عدد السكان: </li>
                  <p> حوالي 68 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس:  </li>
                  <p>مناخ شبه استوائي رطب، صيف حار، شتاء بارد.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p> حديقة زانغجياجي الوطنية، مدينة فينغهوانغ القديمة.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا: </li>
                  <p>Zoomlion (آلات البناء)، Sany Heavy Industry.</p>
              </div>
          </ul>
      </div>
      
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNJL: {
            name: "Jilin",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم: </li>
                <p>هندسة السيارات، التكنولوجيا الحيوية، الزراعة.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p>السيارات، الذرة، الجنسنغ.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>الثقافة الكورية، جبل تشانغباي.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 27 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ موسمي قاري، شتاء بارد، صيف دافئ.</p>
            </div>
            <div>
                <li>المعالم السياحية:  </li>
                <p>جبل تشانغباي، بحيرة السماء.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>FAW Group (السيارات)، شركة جيلين للكيماويات الصناعية.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNJS: {
            name: "Jiangsu",
            description: `
          <div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>لهندسة، الأعمال، المنسوجات، والتعليم.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p> الإلكترونيات، المنسوجات، الكيماويات.</p>
              </div>
              <div>
                  <li>التراث الثقافي </li>
                  <p>حدائق سوتشو الكلاسيكية، أوبرا كونتشو.</p>
              </div>
              <div>
                  <li>عدد السكان: </li>
                  <p> أكثر من 80 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس: </li>
                  <p>مناخ شبه استوائي رطب، بفصول مميزة.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p>حدائق سوتشو الكلاسيكية، المواقع التاريخية في نانجينغ.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا:</li>
                  <p>Suning.com (التجزئة)، Jiangsu Hengrui Medicine.</p>
              </div>
          </ul>
      </div>
      
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNJX: {
            name: "Jiangxi",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>علوم المواد، الهندسة، الطب الصيني التقليدي.</p>
            </div>
            <div>
                <li>الإنتاج البارز:  </li>
                <p>الخزف (جينغدتشن)، النحاس، العناصر الأرضية النادرة.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>خزف جينغدتشن، موقع انتفاضة نانتشانغ التاريخي.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 45 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ شبه استوائي رطب، صيف حار، شتاء معتدل.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>جبل لوشان، متاحف خزف جينغدتشن.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا:</li>
                <p>غير معروفة عالميًا بشكل بارز ولكنها مهمة للتراث الثقافي.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNLN: {
            name: "Liaoning",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>الهندسة، الفضاء، الدراسات البحرية.</p>
            </div>
            <div>
                <li>الإنتاج البارز:  </li>
                <p>الفولاذ، بناء السفن، البتروكيماويات.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>القصر الإمبراطوري في شنيانغ، ثقافة لياودونغ.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p> حوالي 43 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ موسمي قاري، شتاء بارد، صيف حار وممطر.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>مدينة داليان الساحلية، القصر الإمبراطوري في شنيانغ.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>مجموعة أنستيل، مجموعة داليان واندا</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        // CNMO: {
        //   name: "Macao Special Administrative Region",
        //   description: "default",
        //   color: "default",
        //   hover_color: "#041228",
        //   url: "default"
        // },
        CNNM: {
            name: "Inner Mongolia Autonomous Region",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>العلوم البيئية، التعدين، الزراعة.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>الفحم، المعادن الأرضية النادرة، منتجات الألبان.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>ثقافة المغول، المراعي، المواقع التاريخية.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 24 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ قاري، شتاء بارد، صيف دافئ.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>ضريح جنكيز خان، مراعي هولونبوير.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Inner Mongolia Yili Industrial Group (منتجات الألبان).</p>
                    </div>
                </ul>
            </div>
            `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNNX: {
            name: "Ningxia Hui Autonomous Region",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNQH: {
            name: "Qinghai",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم</li>
                <p> العلوم البيئية، الدراسات التبتية، العلوم البيطرية.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p> الملح، الليثيوم، الطاقة الشمسية.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>البوذية التبتية، الثقافة الفريدة للهضبة.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 6 ملايين نسمة.</p>
            </div>
            <div>
                <li>الطقس:  </li>
                <p>مناخ قاري للهضاب، بارد وشبه جاف</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>بحيرة تشينغهاي، دير تاير.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>غير معروفة بشكل بارز للشركات العالمية ولكنها مهمة لقطاع الطاقة المتجددة في الصين.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNSC: {
            name: "Sichuan",
            description: `<div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>الهندسة، الأدب الصيني، علم الحفاظ على البيئة.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p>الآلات، الإلكترونيات، المنتجات الغذائية.</p>
              </div>
              <div>
                  <li>التراث الثقافي: </li>
                  <p> أوبرا سيتشوان، المأكولات الحارة.</p>
              </div>
              <div>
                  <li>عدد السكان: </li>
                  <p>أكثر من 83 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس:  </li>
                  <p>مناخ شبه استوائي رطب، شتاء معتدل، صيف حار.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p>وادي جيوتشايقو، تمثال بوذا العملاق في ليشان.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا: </li>
                  <p>Changhong (الإلكترونيات)، Sichuan Tengzhong Heavy Industrial Machinery.</p>
              </div>
          </ul>
      </div>
      `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNSD: {
            name: "Shandong",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم: </li>
                <p>علوم المحيطات، الهندسة، الزراعة.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p>الإلكترونيات، الآلات، المنسوجات، المأكولات البحرية.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p> الكونفوشيوسية، جبل تاي.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p> أكثر من 100 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ موسمي معتدل، بفصول مميزة.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p> جبل تاي، معبد كونفوشيوس في تشوفو.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا:</li>
                <p> Tsingtao Brewery، Hisense، Inspur.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNSH: {
            name: "Shanghai",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNSN: {
            name: "Shaanxi",
            description: `<div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>الفضاء، الطاقة، علوم المواد، علم الآثار.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p>تصنيع المعدات، الفضاء، المنسوجات.</p>
              </div>
              <div>
                  <li>التراث الثقافي: </li>
                  <p>جيش التيراكوتا، العاصمة القديمة شيان.</p>
              </div>
              <div>
                  <li>عدد السكان:  </li>
                  <p>حوالي 38 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس: </li>
                  <p>مناخ موسمي قاري، شتاء بارد، صيف حار وممطر.</p>
              </div>
              <div>
                  <li>المعالم السياحية:  </li>
                  <p>جيش التيراكوتا، سور مدينة شيان القديم.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا:  </li>
                  <p>مجموعة شنشي للسيارات القابضة، شركة شيان للطائرات الدولية.</p>
              </div>
          </ul>
      </div>
      `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNSX: {
            name: "Shanxi",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>هندسة الطاقة، الطب الصيني التقليدي، التاريخ.</p>
            </div>
            <div>
                <li>الإنتاج البارز: </li>
                <p>الفحم، الكوك، الكيماويات.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p>المدينة القديمة بينغياو، كهوف يونغانغ.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 37 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناخ موسمي قاري، شتاء بارد، صيف دافئ.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p> كهوف يونغانغ، المدينة القديمة في بينغياو.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p> مجموعة شانشي للكوك، مجموعة جيننغ القابضة.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNTJ: {
            name: "Tianjin",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNTW: {
            name: "Taiwan",
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNXJ: {
            name: "Xinjiang",
            description: ``,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNXZ: {
            name: "Tibet",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الدراسات التبتية، البوذية، الطب المرتفع.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>الزراعة، السياحة.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>قصر بوتالا، معبد جوخانغ، البوذية التبتية.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 3 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>ارتفاع عالي، بارد، جاف.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>قصر بوتالا، جبل إيفرست، بحيرة نامتسو.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Tibet Tourism Co., Ltd. (خدمات السياحة).</p>
                    </div>
                </ul>
            </div>
            `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNYN: {
            name: "Yunnan",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>التركيز على التعليم:</li>
                <p>علم النبات، علم البيئة، دراسات الأقليات العرقية.</p>
            </div>
            <div>
                <li>الإنتاج البارز:  </li>
                <p> الزهور، الشاي (خاصة Pu'er)، التبغ.</p>
            </div>
            <div>
                <li>التراث الثقافي: </li>
                <p> ثقافات الأقليات المتنوعة، الموسيقى والرقص التقليدي.</p>
            </div>
            <div>
                <li>عدد السكان: </li>
                <p>حوالي 48 مليون نسمة.</p>
            </div>
            <div>
                <li>الطقس: </li>
                <p>مناطق مناخية متنوعة، بشكل عام معتدل مع فصول جافة وممطرة.</p>
            </div>
            <div>
                <li>المعالم السياحية: </li>
                <p>غابة الحجر، مدينة دالي القديمة، مدينة ليجيانغ القديمة.</p>
            </div>
            <div>
                <li>الشركات الشهيرة عالميًا: </li>
                <p>مجموعة يونان باياو (الطب الصيني التقليدي)، شركة كونمينغ للحديد والصلب.</p>
            </div>
        </ul>
    </div>
    
          `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNZJ: {
            name: "Zhejiang",
            description: `<div>
          <hr>
          <ul>
              <div>
                  <li>التركيز على التعليم:</li>
                  <p>الاقتصاد، الفنون والحرف، الهندسة.</p>
              </div>
              <div>
                  <li>الإنتاج البارز: </li>
                  <p>المنسوجات، الآلات، المعدات الكهربائية.</p>
              </div>
              <div>
                  <li>التراث الثقافي: </li>
                  <p>الحرير، ثقافة الشاي، الطب الصيني التقليدي.</p>
              </div>
              <div>
                  <li>عدد السكان:  </li>
                  <p> أكثر من 57 مليون نسمة.</p>
              </div>
              <div>
                  <li>الطقس: </li>
                  <p>مناخ موسمي شبه استوائي، شتاء معتدل، صيف حار ورطب.</p>
              </div>
              <div>
                  <li>المعالم السياحية: </li>
                  <p>بحيرة الغرب في هانغتشو، بلدة وو زين المائية.</p>
              </div>
              <div>
                  <li>الشركات الشهيرة عالميًا: </li>
                  <p>مجموعة علي بابا (التجارة الإلكترونية)، جيلي (تصنيع السيارات)، واهاها (المشروبات).</p>
              </div>
          </ul>
      </div>
      `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNXJ: {
            name: "Xinjiang",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الدراسات العرقية، الزراعة، الموارد الطبيعية.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>القطن، الفواكه، النفط، الغاز.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>طريق الحرير، ثقافة الإيغور، الآثار القديمة.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 25 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>جاف وشبه جاف، تغيرات موسمية شديدة.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>بحيرة تيانشان (بحيرة السماء)، بحيرة كاناس، البلدة القديمة في كاشغر.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Xinjiang Goldwind Science & Technology (توربينات الرياح).</p>
                    </div>
                </ul>
            </div>
            `
        },
       
        CNTJ: {
            name: "Tianjin",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الهندسة، العلوم البحرية، التمويل.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>السيارات، الإلكترونيات، البتروكيماويات.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>العمارة الأوروبية التاريخية، الأوبرا التقليدية.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 15 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ قاري رطب متأثر بالرياح الموسمية.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>عين تيانجين، شارع الثقافة القديمة، شارع النمط الإيطالي.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Tianjin FAW Toyota Motor Co.، Tianjin Pipe Corporation (أنابيب الصلب).</p>
                    </div>
                </ul>
            </div>
            `
        },
        CNNX: {
            name: "Ningxia",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>دراسات الصحراء، الزراعة، علم المياه.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>توت القوجي (الذئب)، النبيذ، الفحم.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>ثقافة المسلمين الهوي، أجزاء من السور العظيم القديم.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 7 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>شبه جاف، قاري.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>بحيرة الرمال، صحراء شابوتو، مقابر شيشيا.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Ningxia Little Giant Machine Tool Co., Ltd. (الآلات).</p>
                    </div>
                </ul>
            </div>
            `
        },
        CNSH: {
            name: "Shanghai",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الأعمال الدولية، التمويل، الهندسة.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>التمويل، الشحن، التصنيع.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>مزيج من العمارة الحديثة والتقليدية، بوند.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 24 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ شبه استوائي رطب، صيف حار، شتاء معتدل.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>بوند، برج اللؤلؤة الشرقية، حديقة يويوان.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Shanghai Automotive Industry Corporation (SAIC)، مجموعة علي بابا.</p>
                    </div>
                </ul>
            </div>
            `
        },
        CNGZ: {
            name: "Guizhou",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الدراسات العرقية، العلوم البيئية، التعدين.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>الفحم، التبغ، الشاي.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>ثقافات مياو ودونغ، القرى التقليدية.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 34 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ شبه استوائي رطب، أمطار غزيرة.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>شلالات هوانغقوشو، جبل فانجينغ، البلدة القديمة في تشينغيان.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>Kweichow Moutai Co., Ltd. (الكحول).</p>
                    </div>
                </ul>
            </div>
            `
        },
        CNTW: {
            name: "Taiwan",
            description: `
            <div>
                <hr>
                <ul>
                    <div>
                        <li>التركيز التعليمي:</li>
                        <p>الإلكترونيات، علوم الحاسوب، الدراسات البحرية.</p>
                    </div>
                    <div>
                        <li>الإنتاج البارز:</li>
                        <p>الإلكترونيات، الآلات، البتروكيماويات.</p>
                    </div>
                    <div>
                        <li>التراث الثقافي:</li>
                        <p>ثقافات السكان الأصليين، المعابد، الأسواق الليلية.</p>
                    </div>
                    <div>
                        <li>عدد السكان:</li>
                        <p>أكثر من 23 مليون نسمة.</p>
                    </div>
                    <div>
                        <li>الطقس:</li>
                        <p>مناخ استوائي بحري، موسم الأعاصير.</p>
                    </div>
                    <div>
                        <li>المعالم السياحية:</li>
                        <p>تايبيه 101، مضيق تاروكو، بحيرة الشمس والقمر.</p>
                    </div>
                    <div>
                        <li>الشركات الشهيرة عالميًا:</li>
                        <p>شركة تصنيع أشباه الموصلات التايوانية (TSMC)، فوكسكون.</p>
                    </div>
                </ul>
            </div>
            `
        },
       
    },
    CNXJ: {
        name: "Xinjiang",
        description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>Focus éducatif:</li>
                <p>Études ethniques, agriculture, ressources naturelles.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Coton, fruits, pétrole, gaz.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Route de la soie, culture ouïghoure, ruines anciennes.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Plus de 25 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Aride et semi-aride, variations saisonnières extrêmes.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Lac Céleste, Lac Kanas, Vieille Ville de Kashgar.</p>
            </div>
            <div>
                <li>Entreprises mondialement célèbres:</li>
                <p>Xinjiang Goldwind Science & Technology (éoliennes).</p>
            </div>
        </ul>
    </div>
          `,
        color: "default",
        hover_color: "#041228",
        url: "default"
    },
    CNMH: {
        name: "Mongolie Intérieure",
        description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>Focus éducatif:</li>
                <p>Sciences environnementales, exploitation minière, agriculture.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Charbon, minéraux des terres rares, produits laitiers.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Culture mongole, prairies, sites historiques.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Plus de 24 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Continental, hivers froids, étés chauds.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Mausolée de Genghis Khan, Prairie de Hulunbuir.</p>
            </div>
            <div>
                <li>Entreprises mondialement célèbres:</li>
                <p>Inner Mongolia Yili Industrial Group (produits laitiers).</p>
            </div>
        </ul>
    </div>
          `,
        color: "default",
        hover_color: "#041228",
        url: "default"
    },
    // CNXZ: {
    //     name: "Tibet",
    //     description: `
    //     <div>
    //         <hr>
    //         <ul>
    //             <div>
    //                 <li>التركيز التعليمي:</li>
    //                 <p>الدراسات التبتية، البوذية، الطب المرتفع.</p>
    //             </div>
    //             <div>
    //                 <li>الإنتاج البارز:</li>
    //                 <p>الزراعة، السياحة.</p>
    //             </div>
    //             <div>
    //                 <li>التراث الثقافي:</li>
    //                 <p>قصر بوتالا، معبد جوخانغ، البوذية التبتية.</p>
    //             </div>
    //             <div>
    //                 <li>عدد السكان:</li>
    //                 <p>أكثر من 3 مليون نسمة.</p>
    //             </div>
    //             <div>
    //                 <li>الطقس:</li>
    //                 <p>ارتفاع عالي، بارد، جاف.</p>
    //             </div>
    //             <div>
    //                 <li>المعالم السياحية:</li>
    //                 <p>قصر بوتالا، جبل إيفرست، بحيرة نامتسو.</p>
    //             </div>
    //             <div>
    //                 <li>الشركات الشهيرة عالميًا:</li>
    //                 <p>Tibet Tourism Co., Ltd. (خدمات السياحة).</p>
    //             </div>
    //         </ul>
    //     </div>
    //     `,
    //     color: "default",
    //     hover_color: "#041228",
    //     url: "default"
    // },
    CNHA: {
        name: "Henan",
        description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>Focus éducatif:</li>
                <p>Histoire, agriculture, médecine traditionnelle chinoise.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Cultures alimentaires, textiles, charbon.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Temple Shaolin, anciennes capitales (Luoyang, Kaifeng).</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Plus de 99 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Subtropical humide, saisons de pluies.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Temple Shaolin, Grottes de Longmen, Montagne Yuntai.</p>
            </div>
            <div>
                <li>Entreprises mondialement célèbres:</li>
                <p>Zhengzhou Nissan, Henan Shuanghui Investment & Development (transformation alimentaire).</p>
            </div>
        </ul>
    </div>
          `,
        color: "default",
        hover_color: "#041228",
        url: "default"
    },
    CNTJ: {
        name: "Tianjin",
        description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>Focus éducatif:</li>
                <p>Ingénierie, sciences maritimes, finance.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Automobiles, électronique, pétrochimie.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Architecture historique européenne, opéra traditionnel.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Plus de 15 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Continental humide influencé par la mousson.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Tianjin Eye, Rue de la Culture Ancienne, Rue de Style Italien.</p>
            </div>
            <div>
                <li>Entreprises mondialement célèbres:</li>
                <p>Tianjin FAW Toyota Motor Co., Tianjin Pipe Corporation (tubes en acier).</p>
            </div>
        </ul>
    </div>
          `,
        color: "default",
        hover_color: "#041228",
        url: "default"
    },
    CNNX: {
        name: "Ningxia",
        description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>Focus éducatif:</li>
                <p>Études désertiques, agriculture, hydrologie.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Baies de goji, vin, charbon.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Culture musulmane Hui, sections anciennes de la Grande Muraille.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Plus de 7 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Semi-aride, continental.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Lac de Sable, Désert de Shapotou, Tombeaux de Xixia.</p>
            </div>
            <div>
                <li>Entreprises mondialement célèbres:</li>
                <p>Ningxia Little Giant Machine Tool Co., Ltd. (machines).</p>
            </div>
        </ul>
    </div>
          `,
        color: "default",
        hover_color: "#041228",
        url: "default"
    },



    locations: {
        "0": {
            name: "Beijing",
            lat: "39.928819",
            lng: "116.388869"
        }
    },
    labels: {
        CNAH: {
            name: "Anhui",
            parent_id: "CNAH"
        },
        CNBJ: {
            name: "Beijing ",
            parent_id: "CNBJ"
        },
        CNCQ: {
            name: "Chongqing",
            parent_id: "CNCQ"
        },
        CNFJ: {
            name: "Fujian",
            parent_id: "CNFJ"
        },
        CNGD: {
            name: "Guangdong",
            parent_id: "CNGD"
        },
        CNGS: {
            name: "Gansu",
            parent_id: "CNGS"
        },
        CNGX: {
            name: "Guangxi",
            parent_id: "CNGX"
        },
        CNGZ: {
            name: "Guizhou",
            parent_id: "CNGZ"
        },
        CNHA: {
            name: "Henan",
            parent_id: "CNHA"
        },
        CNHB: {
            name: "Hubei",
            parent_id: "CNHB"
        },
        CNHE: {
            name: "Hebei",
            parent_id: "CNHE"
        },
        CNHI: {
            name: "Hainan",
            parent_id: "CNHI"
        },
        // CNHK: {
        //   name: "Hong Kong Special Administrative Region",
        //   parent_id: "CNHK"
        // },
        CNHL: {
            name: "Heilongjiang",
            parent_id: "CNHL"
        },
        CNHN: {
            name: "Hunan",
            parent_id: "CNHN"
        },
        CNJL: {
            name: "Jilin",
            parent_id: "CNJL"
        },
        CNJS: {
            name: "Jiangsu",
            parent_id: "CNJS"
        },
        CNJX: {
            name: "Jiangxi",
            parent_id: "CNJX"
        },
        CNLN: {
            name: "Liaoning",
            parent_id: "CNLN"
        },
        // CNMO: {
        //   name: "Macao Special Administrative Region",
        //   parent_id: "CNMO"
        // },
        CNNM: {
            name: "Inner Mongolia Autonomous Region",
            parent_id: "CNNM"
        },
        CNNX: {
            name: "Ningxia",
            parent_id: "CNNX"
        },
        CNQH: {
            name: "Qinghai",
            parent_id: "CNQH"
        },
        CNSC: {
            name: "Sichuan",
            parent_id: "CNSC"
        },
        CNSD: {
            name: "Shandong",
            parent_id: "CNSD"
        },
        CNSH: {
            name: "Shanghai",
            parent_id: "CNSH"
        },
        CNSN: {
            name: "Shaanxi",
            parent_id: "CNSN"
        },
        CNSX: {
            name: "Shanxi",
            parent_id: "CNSX"
        },
        CNTJ: {
            name: "Tianjin",
            parent_id: "CNTJ"
        },
        CNTW: {
            name: "Taiwan",
            parent_id: "CNTW"
        },
        CNXJ: {
            name: "Xinjiang",
            parent_id: "CNXJ"
        },
        CNXZ: {
            name: "Tibet",
            parent_id: "CNXZ"
        },
        CNYN: {
            name: "Yunnan",
            parent_id: "CNYN"
        },
        CNZJ: {
            name: "Zhejiang",
            parent_id: "CNZJ"
        }
    },
    legend: {
        entries: []
    },
    regions: {}
};
