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
                <li>Education Focus:</li>
                <p>Engineering, technology, Chinese history, literature.</p>
            </div>
            <div>
                <li>Notable Production: </li>
                <p>Machinery, automobiles, textiles, food products.</p>
            </div>
            <div>
                <li>Cultural Heritage: </li>
                <p>Huizhou architecture, Hui cuisine.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Approx. 62 million.</p>
            </div>
            <div>
                <li>Weather: </li>
                <p>Humid subtropical with distinct seasons.</p>
            </div>
            <div>
                <li>Tourist attractions: </li>
                <p>Huangshan (Yellow Mountain), Ancient Villages in Southern Anhui (Xidi and Hongcun).</p>
            </div>
            <div>
                <li>Famous Worldwide Companies: </li>
                <p>Hefei Meiling (home appliances), Chery Automobile.</p>
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
            <li>Education Focus:</li>
            <p>Maritime studies, marine biology, traditional Chinese medicine.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Electronics, machinery, garments, tea (notably Tieguanyin).</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Minnan and Hakka cultures, Fujian Tulou.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 39 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Warm and humid subtropical climate.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Wuyi Mountains, Gulangyu Island, Fujian Tulou.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Anta Sports (sportswear), Xiamen Airlines.</p>
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
              <li>Education Focus:</li>
              <p>Business studies, international trade, innovation.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Electronics, toys, textiles, furniture.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Cantonese culture, language, cuisine.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Over 113 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Humid subtropical, mild winters, hot summers.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Canton Tower, Shamian Island, Chimelong Tourist Resort.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Huawei (telecommunications), Tencent (internet services), ZTE (telecommunications).</p>
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
            <li>Education Focus:</li>
            <p>Geology, archaeology, Silk Road history.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Mining (nickel, cobalt), traditional Chinese medicine, agriculture.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Silk Road, Buddhist art (Mogao Caves).</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 26 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Continental, semi-arid to arid climate.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Mogao Caves, Zhangye Danxia Geopark.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Not prominently known for multinational companies but significant in renewable energy development.</p>
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
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Agriculture, environmental science, ethnic studies.</p>
        </div>
        <div>
            <li>Notable Production:</li>
            <p>Sugarcane, rice, forestry.</p>
        </div>
        <div>
            <li>Cultural Heritage:</li>
            <p>Zhuang minority culture, karst landscapes.</p>
        </div>
        <div>
            <li>Population:</li>
            <p>Over 49 million.</p>
        </div>
        <div>
            <li>Weather:</li>
            <p>Subtropical, heavy rainfall.</p>
        </div>
        <div>
            <li>Tourist Attractions:</li>
            <p>Guilin's Karst Mountains, Li River, Yangshuo.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies:</li>
            <p>Liugong Machinery Co., Ltd. (construction machinery).</p>
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
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Ethnic studies, environmental science, mining.</p>
        </div>
        <div>
            <li>Notable Production:</li>
            <p>Coal, tobacco, tea.</p>
        </div>
        <div>
            <li>Cultural Heritage:</li>
            <p>Miao and Dong minority cultures, traditional villages.</p>
        </div>
        <div>
            <li>Population:</li>
            <p>Over 34 million.</p>
        </div>
        <div>
            <li>Weather:</li>
            <p>Subtropical humid, heavy rainfall.</p>
        </div>
        <div>
            <li>Tourist Attractions:</li>
            <p>Huangguoshu Waterfall, Fanjing Mountain, Qingyan Ancient Town.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies:</li>
            <p>Kweichow Moutai Co., Ltd. (alcohol).</p>
        </div>
    </ul>
</div>
`,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNHA: {
            name: "Henan",
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>History, agriculture, traditional Chinese medicine.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Food crops, textiles, coal.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Shaolin Temple, ancient capitals (Luoyang, Kaifeng).</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 99 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Humid subtropical, seasonal rains.</p>
        </div>
        <div>
            <li>Tourist Attractions: </li>
            <p>Shaolin Temple, Longmen Grottoes, Yuntai Mountain.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Zhengzhou Nissan, Henan Shuanghui Investment & Development (food processing).</p>
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
            <li>Education Focus:</li>
            <p>Medical sciences, hydroengineering, automotive.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Automotive, steel, high-tech industries.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Wudang martial arts, Three Gorges Dam.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 59 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Humid subtropical, hot summers, cool winters.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Yellow Crane Tower, Wudang Mountains, Three Gorges Dam.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Dongfeng Motor Corporation, Wuhan Iron and Steel (Group) Corp.</p>
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
              <li>Education Focus:</li>
              <p>Engineering, technology, agriculture.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Steel, pharmaceuticals, mechanical industries.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Great Wall of China sections, ancient architecture.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Approx. 75 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Continental monsoon climate, hot summers, cold winters.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Great Wall sections (Jinshanling, Mutianyu), Chengde Mountain Resort.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Hebei Iron and Steel Group, Great Wall Motor Company.</p>
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
              <li>Education Focus:</li>
              <p>Tourism, marine sciences, tropical agriculture.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Tropical fruits, seafood, rubber.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Li and Miao ethnic cultures.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Approx. 9 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Tropical monsoon climate.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Sanya's beaches, Haikou historic city, Wuzhizhou Island.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>HNA Group (conglomerate with interests in aviation, real estate, financial services, tourism).</p>
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
            <li>Education Focus:</li>
            <p>Engineering, agriculture, forestry.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Soybeans, dairy, timber.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Russian influence, indigenous Hezhen and Ainu cultures.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 38 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Continental monsoon climate, very cold winters.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Harbin Ice Festival, Yabuli Ski Resort, Russian-style architecture in Harbin.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
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
              <li>Education Focus:</li>
              <p>Engineering, agriculture, media studies.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Rice, tea, steel, non-ferrous metals.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Huxiang culture, birthplace of Mao Zedong.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Approx. 68 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Humid subtropical, with hot summers and cool winters.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Zhangjiajie National Forest Park, Fenghuang Ancient Town.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Zoomlion (construction machinery), Sany Heavy Industry.</p>
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
            <li>Education Focus:</li>
            <p>Automotive engineering, biotechnology, agriculture.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Automobiles, maize, ginseng.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Korean culture, Changbai Mountain.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 27 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Continental monsoon climate, cold winters, and warm summers.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Changbai Mountain, Heaven Lake.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>FAW Group (automobiles), Jilin Chemical Industrial Company.</p>
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
              <li>Education Focus:</li>
              <p>Engineering, business, textiles, and education.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Electronics, textiles, chemicals.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Classical gardens of Suzhou, Kunqu opera.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Over 80 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Humid subtropical, with distinct seasons.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Classical Gardens of Suzhou, Nanjing’s historical sites.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Suning.com (retail), Jiangsu Hengrui Medicine.</p>
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
            <li>Education Focus:</li>
            <p>Materials science, engineering, traditional Chinese medicine.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Porcelain (Jingdezhen), copper, rare earth elements.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Jingdezhen porcelain, Nanchang Uprising historical site.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 45 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Humid subtropical, with hot summers and mild winters.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Mount Lushan, Jingdezhen Ceramic Museums.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Not known for global companies but significant for its cultural contributions.</p>
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
            <li>Education Focus:</li>
            <p>Engineering, aerospace, maritime studies.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Steel, shipbuilding, petrochemicals.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Shenyang Imperial Palace, Liaodong culture.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 43 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Continental monsoon climate, with cold winters and hot, rainy summers.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Dalian coastal city, Shenyang Imperial Palace.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Ansteel Group, Dalian Wanda Group.</p>
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
            name: "Inner Mongolia",
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Environmental science, mining, agriculture.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Coal, rare earth minerals, dairy.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Mongolian culture, grasslands, historic sites.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 24 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Continental, cold winters, warm summers.</p>
        </div>
        <div>
            <li>Tourist Attractions: </li>
            <p>Genghis Khan Mausoleum, Hulunbuir Grassland.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Inner Mongolia Yili Industrial Group (dairy products).</p>
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
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Desert studies, agriculture, hydrology.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Wolfberries (goji berries), wine, coal.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Hui Muslim culture, ancient Great Wall sections.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 7 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Semi-arid, continental.</p>
        </div>
        <div>
            <li>Tourist Attractions: </li>
            <p>Sand Lake, Shapotou Desert, Xixia Tombs.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Ningxia Little Giant Machine Tool Co., Ltd. (machinery).</p>
        </div>
    </ul>
</div>
`,
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
            <li>Education Focus:</li>
            <p>Environmental science, Tibetan studies, veterinary science.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Salt, lithium, solar power.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Tibetan Buddhism, unique plateau culture.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 6 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Plateau continental climate, cold and semi-arid.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Qinghai Lake, Ta'er Monastery.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Not widely known for global companies but important for China's renewable energy sector.</p>
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
              <li>Education Focus:</li>
              <p>Engineering, Chinese literature, conservation biology.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Machinery, electronics, food products.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Sichuan opera, spicy cuisine.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Over 83 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Humid subtropical climate, with mild winters and hot summers.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Jiuzhaigou Valley, Leshan Giant Buddha.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Changhong (electronics), Sichuan Tengzhong Heavy Industrial Machinery.</p>
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
            <li>Education Focus:</li>
            <p>Oceanography, engineering, agriculture.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Electronics, machinery, textiles, seafood.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Confucianism, Mount Tai.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 100 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Temperate monsoon climate, with distinct seasons.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Mount Tai, Confucius Temple in Qufu.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Tsingtao Brewery, Hisense, Inspur.</p>
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
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>International business, finance, engineering.</p>
        </div>
        <div>
            <li>Notable Production:</li>
            <p>Finance, shipping, manufacturing.</p>
        </div>
        <div>
            <li>Cultural Heritage:</li>
            <p>Blend of modern and traditional architecture, Bund.</p>
        </div>
        <div>
            <li>Population:</li>
            <p>Over 24 million.</p>
        </div>
        <div>
            <li>Weather:</li>
            <p>Humid subtropical, hot summers, mild winters.</p>
        </div>
        <div>
            <li>Tourist Attractions:</li>
            <p>The Bund, Oriental Pearl Tower, Yuyuan Garden.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies:</li>
            <p>Shanghai Automotive Industry Corporation (SAIC), Alibaba Group.</p>
        </div>
    </ul>
</div>
`,
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
              <li>Education Focus:</li>
              <p>Aerospace, energy, materials science, archaeology.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Equipment manufacturing, aerospace, textiles.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Terracotta Army, ancient capital Xi'an.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Approx. 38 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Continental monsoon climate, with cold winters and hot, rainy summers.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>Terracotta Army, Ancient City Wall of Xi'an.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Shaanxi Automobile Holding Group, Xi'an Aircraft International Corporation.</p>
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
            <li>Education Focus:</li>
            <p>Energy engineering, traditional Chinese medicine, history.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Coal, coke, chemicals.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Ancient city of Pingyao, Yungang Grottoes.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 37 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Continental monsoon climate, with cold winters and warm summers.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Yungang Grottoes, Ancient City of Pingyao.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Shanxi Coking Coal Group, Jinneng Holding Group.</p>
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
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Engineering, marine science, finance.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Automobiles, electronics, petrochemicals.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Historical European architecture, traditional opera.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 15 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Monsoon-influenced humid continental.</p>
        </div>
        <div>
            <li>Tourist Attractions: </li>
            <p>Tianjin Eye, Ancient Culture Street, Italian Style Street.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Tianjin FAW Toyota Motor Co., Tianjin Pipe Corporation (steel pipes).</p>
        </div>
    </ul>
</div>
`,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNTW: {
            name: "Taiwan",
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Electronics, computer science, maritime studies.</p>
        </div>
        <div>
            <li>Notable Production:</li>
            <p>Electronics, machinery, petrochemicals.</p>
        </div>
        <div>
            <li>Cultural Heritage:</li>
            <p>Indigenous cultures, temples, night markets.</p>
        </div>
        <div>
            <li>Population:</li>
            <p>Over 23 million.</p>
        </div>
        <div>
            <li>Weather:</li>
            <p>Marine tropical, typhoon season.</p>
        </div>
        <div>
            <li>Tourist Attractions:</li>
            <p>Taipei 101, Taroko Gorge, Sun Moon Lake.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies:</li>
            <p>Taiwan Semiconductor Manufacturing Company (TSMC), Foxconn.</p>
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
            description: `<div>
   <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Ethnic studies, agriculture, natural resources.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Cotton, fruits, oil, gas.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Silk Road, Uighur culture, ancient ruins.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 25 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Arid and semi-arid, extreme seasonal variations.</p>
        </div>
        <div>
            <li>Tourist Attractions: </li>
            <p>Heavenly Lake, Kanas Lake, Kashgar Old Town.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Xinjiang Goldwind Science & Technology (wind turbines).</p>
        </div>
    </ul>
</div>
`,
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNXZ: {
            name: "Tibet",
            description: `<div>
    <hr>
    <ul>
        <div>
            <li>Education Focus:</li>
            <p>Tibetan studies, Buddhism, high-altitude medicine.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Agriculture, tourism.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Potala Palace, Jokhang Temple, Tibetan Buddhism.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Over 3 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>High-altitude, cold, dry.</p>
        </div>
        <div>
            <li>Tourist Attractions: </li>
            <p>Potala Palace, Mount Everest, Namtso Lake.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Tibet Tourism Co., Ltd. (tourism services).</p>
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
            <li>Education Focus:</li>
            <p>Botany, ecology, ethnic minority studies.</p>
        </div>
        <div>
            <li>Notable Production: </li>
            <p>Flowers, tea (notably Pu'er), tobacco.</p>
        </div>
        <div>
            <li>Cultural Heritage: </li>
            <p>Diverse ethnic cultures, traditional music and dance.</p>
        </div>
        <div>
            <li>Population: </li>
            <p>Approx. 48 million.</p>
        </div>
        <div>
            <li>Weather: </li>
            <p>Varied climate zones, generally mild with dry and rainy seasons.</p>
        </div>
        <div>
            <li>Tourist attractions: </li>
            <p>Stone Forest, Dali Ancient Town, Lijiang Old Town.</p>
        </div>
        <div>
            <li>Famous Worldwide Companies: </li>
            <p>Yunnan Baiyao Group (traditional Chinese medicine), Kunming Iron and Steel Holding Co., Ltd.</p>
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
              <li>Education Focus:</li>
              <p>Economics, arts and crafts, engineering.</p>
          </div>
          <div>
              <li>Notable Production: </li>
              <p>Textiles, machinery, electrical equipment.</p>
          </div>
          <div>
              <li>Cultural Heritage: </li>
              <p>Silk, tea culture, traditional Chinese medicine.</p>
          </div>
          <div>
              <li>Population: </li>
              <p>Over 57 million.</p>
          </div>
          <div>
              <li>Weather: </li>
              <p>Subtropical monsoon climate, with mild winters and hot, humid summers.</p>
          </div>
          <div>
              <li>Tourist attractions: </li>
              <p>West Lake in Hangzhou, Wuzhen Water Town.</p>
          </div>
          <div>
              <li>Famous Worldwide Companies: </li>
              <p>Alibaba Group (e-commerce), Geely (automobile manufacturing), Wahaha (beverages).</p>
          </div>
      </ul>
  </div>
  `,
            color: "default",
            hover_color: "#041228",
            url: "default"
        }
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
