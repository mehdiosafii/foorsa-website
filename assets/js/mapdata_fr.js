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
                    <li>Focus éducatif:</li>
                    <p>Ingénierie, technologie, histoire chinoise, littérature.</p>
                </div>
                <div>
                    <li>Productions notables: </li>
                    <p>Machinerie, automobiles, textiles, produits alimentaires.</p>
                </div>
                <div>
                    <li>Patrimoine culturel: </li>
                    <p>Architecture Huizhou, cuisine Hui.</p>
                </div>
                <div>
                    <li>Population: </li>
                    <p>Environ 62 millions.</p>
                </div>
                <div>
                    <li>Climat: </li>
                    <p>Subtropical humide avec des saisons distinctes.</p>
                </div>
                <div>
                    <li>Attractions touristiques: </li>
                    <p>Mont Huangshan (Montagne Jaune), Villages anciens du sud de l'Anhui (Xidi et Hongcun).</p>
                </div>
    
                <div>
                    <li>Entreprises mondiales célèbres: </li>
                    <p>Hefei Meiling (appareils électroménagers), Chery Automobile.</p>
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
                <li>Focus éducatif:</li>
                <p>Études maritimes, biologie marine, médecine traditionnelle chinoise.</p>
            </div>
            <div>
                <li>Productions notables:  </li>
                <p>Électronique, machinerie, vêtements, thé (notamment Tieguanyin).</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Cultures Minnan et Hakka, Tulou du Fujian.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 39 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Climat subtropical chaud et humide.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Wuyi Mountains, Gulangyu Island, Fujian Tulou.</p>
            </div>
            <div>
                <li>Entreprises mondiales célèbres: </li>
                <p>Anta Sports (vêtements de sport), Xiamen Airlines.</p>
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
                  <li>Focus éducatif:</li>
                  <p>Études commerciales, commerce international, innovation.</p>
              </div>
              <div>
                  <li>Productions notables: </li>
                  <p>Électronique, jouets, textiles, meubles.</p>
              </div>
              <div>
                  <li>Patrimoine culturel: </li>
                  <p>Culture cantonaise, langue, cuisine.</p>
              </div>
              <div>
                  <li>Population: </li>
                  <p>Plus de 113 millions.</p>
              </div>
              <div>
                  <li>Climat: </li>
                  <p>Subtropical humide, hivers doux, étés chauds.</p>
              </div>
              <div>
                  <li>Attractions touristiques: </li>
                  <p>Tour de Canton, Île de Shamian, Complexe touristique Chimelong.</p>
              </div>
              <div>
                  <li>Entreprises mondiales célèbres: </li>
                  <p>Huawei (télécommunications), Tencent (services internet), ZTE (télécommunications).</p>
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
                <li>Focus éducatif: </li>
                <p>Géologie, archéologie, histoire de la Route de la Soie.</p>
            </div>
            <div>
                <li>Productions notables: </li>
                <p>Exploitation minière (nickel, cobalt), médecine traditionnelle chinoise, agriculture.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Route de la Soie, art bouddhiste (grottes de Mogao).</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 26 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Climat continental, semi-aride à aride.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Grottes de Mogao, Parc géologique de Zhangye Danxia.</p>
            </div>
            <div>
                <li>Entreprises mondiales célèbres: </li>
                <p>Non particulièrement connu pour des entreprises multinationales mais significatif dans le développement des énergies renouvelables.</p>
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
<li>Focus éducatif:</li>
<p>Agriculture, sciences de l’environnement, études ethniques.</p>
</div>
<div>
<li>Production notable:</li>
<p>Canne à sucre, riz, sylviculture.</p>
</div>
<div>
<li>Patrimoine culturel:</li>
<p>Culture de la minorité Zhuang, paysages karstiques.</p>
</div>
<div>
<li>Population:</li>
<p>Plus de 49 millions.</p>
</div>
<div>
<li>Climat:</li>
<p>Subtropical, fortes précipitations.</p>
</div>
<div>
<li>Attractions touristiques:</li>
<p>Montagnes Karstiques de Guilin, Rivière Li, Yangshuo.</p>
</div>
<div>
<li>Entreprises mondialement célèbres:</li>
<p>Liugong Machinery Co., Ltd. (machinerie de construction).</p>
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
            description: `
            <div>
<hr>
<ul>
<div>
<li>Focus éducatif:</li>
<p>Études ethniques, sciences de l’environnement, mines.</p>
</div>
<div>
<li>Production notable:</li>
<p>Charbon, tabac, thé.</p>
</div>
<div>
<li>Patrimoine culturel:</li>
<p>Cultures minoritaires Miao et Dong, villages traditionnels.</p>
</div>
<div>
<li>Population:</li>
<p>Plus de 34 millions.</p>
</div>
<div>
<li>Climat:</li>
<p>Humide subtropical, fortes précipitations.</p>
</div>
<div>
<li>Attractions touristiques:</li>
<p>Chute d’eau de Huangguoshu, Montagne Fanjing, Ville ancienne de Qingyan.</p>
</div>
<div>
<li>Entreprises mondialement célèbres:</li>
<p>Kweichow Moutai Co., Ltd. (alcool).</p>
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
            description: "default",
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
                <li>Focus éducatif:</li>
                <p>Sciences médicales, hydro-ingénierie, automobile.</p>
            </div>
            <div>
                <li>Productions notables: </li>
                <p>Automobile, acier, industries de haute technologie.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Arts martiaux Wudang, barrage des trois gorges.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 59 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Subtropical humide, étés chauds, hivers frais.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Tour de la Grue Jaune, Montagnes Wudang, Barrage des Trois Gorges.</p>
            </div>
            <div>
                <li>Entreprises mondiales célèbres: </li>
                <p>Corporation automobile Dongfeng Motor, Acier et fer de Wuhan (Groupe) Corp.</p>
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
                  <li>Focus éducatif:</li>
                  <p>Ingénierie, technologie, agriculture.</p>
              </div>
              <div>
                  <li>Productions notables: </li>
                  <p>Acier, produits pharmaceutiques, industries mécaniques.</p>
              </div>
              <div>
                  <li>Patrimoine culturel: </li>
                  <p>Sections de la Grande Muraille de Chine, architecture ancienne.</p>
              </div>
              <div>
                  <li>Population: </li>
                  <p>Environ 75 millions.</p>
              </div>
              <div>
                  <li>Climat: </li>
                  <p>Climat continental de mousson, étés chauds, hivers froids.</p>
              </div>
              <div>
                  <li>Attractions touristiques: </li>
                  <p>Sections de la Grande Muraille (Jinshanling, Mutianyu), Complexe montagneux de Chengde.</p>
              </div>
              <div>
                  <li>Entreprises mondiales célèbres: </li>
                  <p>Groupe sidérurgique Hebei Iron and Steel, Great Wall Motor Company.</p>
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
                  <li>Focus éducatif:</li>
                  <p>Tourisme, sciences marines, agriculture tropicale.</p>
              </div>
              <div>
                  <li>Productions notables: </li>
                  <p>Fruits tropicaux, fruits de mer, caoutchouc.</p>
              </div>
              <div>
                  <li>Patrimoine culturel: </li>
                  <p>Cultures ethniques Li et Miao.</p>
              </div>
              <div>
                  <li>Population: </li>
                  <p>Environ 9 millions.</p>
              </div>
              <div>
                  <li>Climat: </li>
                  <p>Climat tropical de mousson.</p>
              </div>
              <div>
                  <li>Attractions touristiques: </li>
                  <p>Plages de Sanya, Ville historique de Haikou, Île de Wuzhizhou.</p>
              </div>
              <div>
                  <li>Entreprises mondiales célèbres: </li>
                  <p>HGroupe HNA (conglomérat avec des intérêts dans l'aviation, l'immobilier, les services financiers, le tourisme).</p>
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
                <li>Focus éducatif:</li>
                <p>Ingénierie, agriculture, foresterie.</p>
            </div>
            <div>
                <li>Productions notables: </li>
                <p>Soja, produits laitiers, bois.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Influence russe, cultures indigènes Hezhen et Ainu.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 38 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Continental de mousson, hivers très froids.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Festival de glace de Harbin, Station de ski de Yabuli, architecture de style russe à Harbin.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues: </li>
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
                  <li>Focus éducatif:</li>
                  <p>Ingénierie, agriculture, études médiatiques.</p>
              </div>
              <div>
                  <li>Productions notables: </li>
                  <p>Riz, thé, acier, métaux non ferreux.</p>
              </div>
              <div>
                  <li>Patrimoine culturel: </li>
                  <p>Culture Huxiang, lieu de naissance de Mao Zedong.</p>
              </div>
              <div>
                  <li>Population: </li>
                  <p>Environ 68 millions.</p>
              </div>
              <div>
                  <li>Climat: </li>
                  <p>Subtropical humide, étés chauds et hivers frais.</p>
              </div>
              <div>
                  <li>Attractions touristiques: </li>
                  <p>Parc national forestier de Zhangjiajie, ancienne ville de Fenghuang.</p>
              </div>
              <div>
                  <li>Entreprises mondialement connues: </li>
                  <p> Zoomlion (machines de construction), Sany Heavy Industry.</p>
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
                <li>Focus éducatif: </li>
                <p>Ingénierie automobile, biotechnologie, agriculture.</p>
            </div>
            <div>
                <li>Notable Production: </li>
                <p>Automobiles, maïs, ginseng.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Culture coréenne, Montagne Changbai.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 27 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Continental de mousson, hivers froids, étés chauds.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Montagne Changbai, Lac du Paradis.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues: </li>
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
                  <li>Focus éducatif:</li>
                  <p>Ingénierie, commerce, textiles et éducation.</p>
              </div>
              <div>
                  <li>Productions noables: </li>
                  <p>Électronique, textiles, produits chimiques.</p>
              </div>
              <div>
                  <li>Patrimoine culturel: </li>
                  <p>Jardins classiques de Suzhou, opéra Kunqu.</p>
              </div>
              <div>
                  <li>Population: </li>
                  <p>Environ 80 millions.</p>
              </div>
              <div>
                  <li>Climat: </li>
                  <p>Subtropical humide, avec des saisons distinctes.</p>
              </div>
              <div>
                  <li>Attractions touristiques: </li>
                  <p>Jardins classiques de Suzhou, sites historiques de Nanjing.</p>
              </div>
              <div>
                  <li>Entreprises mondialement connues: </li>
                  <p>Suning.com (vente au détail), Jiangsu Hengrui Medicine.</p>
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
                <li>Focus éducatif:</li>
                <p>Science des matériaux, ingénierie, médecine traditionnelle chinoise.</p>
            </div>
            <div>
                <li>Productions notables: </li>
                <p>Porcelaine (Jingdezhen), cuivre, éléments de terres rares.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Porcelaine de Jingdezhen, site historique du soulèvement de Nanchang.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 45 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Subtropical humide, étés chauds et hivers doux.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Mont Lushan, Musées de la céramique de Jingdezhen.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues: </li>
                <p>Non connu pour ses entreprises mondiales, mais significatif pour ses contributions culturelles.</p>
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
                <li>Focus éducatif:</li>
                <p>Ingénierie, aérospatiale, études maritimes.</p>
            </div>
            <div>
                <li>Productions notables: </li>
                <p>Acier, construction navale, produits pétrochimiques.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Palais impérial de Shenyang, culture de Liaodong.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 43 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Continental de mousson, avec hivers froids et étés chauds et pluvieux.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Ville côtière de Dalian, Palais impérial de Shenyang.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues: </li>
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
            name: "Inner Mongolia Autonomous Region",
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
                <li>Focus éducatif:</li>
                <p>Sciences environnementales, études tibétaines, sciences vétérinaires.</p>
            </div>
            <div>
                <li>Productions notables: </li>
                <p>Sel, lithium, énergie solaire.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Bouddhisme tibétain, culture unique du plateau.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Environ 6 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Plateau continental, froid et semi-aride.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Lac Qinghai, Monastère de Ta'er.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues: </li>
                <p>Pas largement connu pour ses entreprises mondiales, mais important pour le secteur des énergies renouvelables en Chine.</p>
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
                  <li>Focus éducatif:</li>
                  <p>Ingénierie, littérature chinoise, biologie de la conservation.</p>
              </div>
              <div>
                  <li>Productions notables: </li>
                  <p>Machines, électronique, produits alimentaires.</p>
              </div>
              <div>
                  <li>Patrimoine culturel: </li>
                  <p>Opéra du Sichuan, cuisine épicée.</p>
              </div>
              <div>
                  <li>Population: </li>
                  <p>Plus de 83 million.</p>
              </div>
              <div>
                  <li>Climat: </li>
                  <p>Subtropical humide, avec hivers doux et étés chauds.</p>
              </div>
              <div>
                  <li>Attractions touristiques: </li>
                  <p>Vallée de Jiuzhaigou, Grand Bouddha de Leshan.</p>
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
                <li>Focus éducatif:</li>
                <p>Océanographie, ingénierie, agriculture.</p>
            </div>
            <div>
                <li>Productions notables : </li>
                <p>Électronique, machines, textiles, fruits de mer.</p>
            </div>
            <div>
                <li>Patrimoine culturel: </li>
                <p>Confucianisme, Mont Tai.</p>
            </div>
            <div>
                <li>Population: </li>
                <p>Plus de 100 millions.</p>
            </div>
            <div>
                <li>Climat: </li>
                <p>Tempéré de mousson, avec des saisons distinctes.</p>
            </div>
            <div>
                <li>Attractions touristiques: </li>
                <p>Mont Tai, Temple de Confucius à Qufu.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues: </li>
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
            description: `
            <div>
<hr>
<ul>
<div>
<li>Focus éducatif:</li>
<p>Commerce international, finance, ingénierie.</p>
</div>
<div>
<li>Production notable:</li>
<p>Finance, transport maritime, fabrication.</p>
</div>
<div>
<li>Patrimoine culturel:</li>
<p>Mélange d’architecture moderne et traditionnelle, Bund.</p>
</div>
<div>
<li>Population:</li>
<p>Plus de 24 millions.</p>
</div>
<div>
<li>Climat:</li>
<p>Subtropical humide, étés chauds, hivers doux.</p>
</div>
<div>
<li>Attractions touristiques:</li>
<p>Le Bund, Tour de la Perle Orientale, Jardin Yuyuan.</p>
</div>
<div>
<li>Entreprises mondialement célèbres:</li>
<p>Shanghai Automotive Industry Corporation (SAIC), Groupe Alibaba.</p>
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
                  <li>Focus éducatif:</li>
                  <p>Aérospatiale, énergie, science des matériaux, archéologie.</p>
              </div>
              <div>
                  <li>Production notable:</li>
                  <p>Fabrication d'équipements, aérospatiale, textiles.</p>
              </div>
              <div>
                  <li>Patrimoine culturel:</li>
                  <p>Armée de terre cuite, ancienne capitale Xi'an.</p>
              </div>
              <div>
                  <li>Population:</li>
                  <p>Environ 38 millions.</p>
              </div>
              <div>
                  <li>Climat:</li>
                  <p>Continental de mousson, avec hivers froids et étés chauds et pluvieux.</p>
              </div>
              <div>
                  <li>Attractions touristiques:</li>
                  <p>Armée de terre cuite, Muraille ancienne de Xi'an.</p>
              </div>
              <div>
                  <li>Entreprises mondialement connues:</li>
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
                <li>Focus sur l'éducation:</li>
                <p>Ingénierie énergétique, médecine traditionnelle chinoise, histoire.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Charbon, coke, produits chimiques.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Ville ancienne de Pingyao, grottes de Yungang.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Environ 37 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Continental de mousson, avec hivers froids et étés chauds.</p>
            </div>
            <div>`,
            name: "Shanxi",
            description: `
          <div>
        <hr>
        <ul>
            <div>
                <li>Focus éducatif:</li>
                <p>Ingénierie énergétique, médecine traditionnelle chinoise, histoire.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Charbon, coke, produits chimiques.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Ville ancienne de Pingyao, grottes de Yungang.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Environ 37 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Continental de mousson, avec hivers froids et étés chauds.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Grottes de Yungang, Ville ancienne de Pingyao.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues:</li>
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
            description: "default",
            color: "default",
            hover_color: "#041228",
            url: "default"
        },
        CNTW: {
            name: "Taiwan",
            description: `
              <div>
    <hr>
    <ul>
      <div>
        <li>Focus éducatif:</li>
        <p>Électronique, informatique, études maritimes.</p>
      </div>
      <div>
        <li>Production notable:</li>
        <p>Électronique, machinerie, produits pétrochimiques.</p>
      </div>
      <div>
        <li>Patrimoine culturel:</li>
        <p>Cultures indigènes, temples, marchés nocturnes.</p>
      </div>
      <div>
        <li>Population:</li>
        <p>Plus de 23 millions.</p>
      </div>
      <div>
        <li>Climat:</li>
        <p>Tropical marin, saison des typhons.</p>
      </div>
      <div>
        <li>Attractions touristiques:</li>
        <p>Taipei 101, Gorge de Taroko, Lac du Soleil et de la Lune.</p>
      </div>
      <div>
        <li>Entreprises mondialement célèbres:</li>
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
        CNXZ: {
            name: "Tibet",
            description: `
            <div>
          <hr>
          <ul>
              <div>
                  <li>Focus éducatif:</li>
                  <p>Études tibétaines, bouddhisme, médecine en haute altitude.</p>
              </div>
              <div>
                  <li>Production notable:</li>
                  <p>Agriculture, tourisme.</p>
              </div>
              <div>
                  <li>Patrimoine culturel:</li>
                  <p>Palais du Potala, Temple Jokhang, bouddhisme tibétain.</p>
              </div>
              <div>
                  <li>Population:</li>
                  <p>Plus de 3 millions.</p>
              </div>
              <div>
                  <li>Climat:</li>
                  <p>Haute altitude, froid, sec.</p>
              </div>
              <div>
                  <li>Attractions touristiques:</li>
                  <p>Palais du Potala, Mont Everest, Lac Namtso.</p>
              </div>
              <div>
                  <li>Entreprises mondialement célèbres:</li>
                  <p>Tibet Tourism Co., Ltd. (services touristiques).</p>
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
                <li>Focus éducatif:</li>
                <p>Botanique, écologie, études des minorités ethniques.</p>
            </div>
            <div>
                <li>Production notable:</li>
                <p>Fleurs, thé (notamment Pu'er), tabac.</p>
            </div>
            <div>
                <li>Patrimoine culturel:</li>
                <p>Cultures ethniques diverses, musique et danse traditionnelles.</p>
            </div>
            <div>
                <li>Population:</li>
                <p>Environ 48 millions.</p>
            </div>
            <div>
                <li>Climat:</li>
                <p>Zones climatiques variées, généralement doux avec saisons sèches et pluvieuses.</p>
            </div>
            <div>
                <li>Attractions touristiques:</li>
                <p>Forêt de pierre, Ville ancienne de Dali, Vieille ville de Lijiang.</p>
            </div>
            <div>
                <li>Entreprises mondialement connues:</li>
                <p>Yunnan Baiyao Group (médecine traditionnelle chinoise), Kunming Iron and Steel Holding Co., Ltd.</p>
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
                  <li>Focus éducatif:</li>
                  <p>Économie, arts et artisanat, ingénierie.</p>
              </div>
              <div>
                  <li>Production notable:</li>
                  <p>Textiles, machines, équipements électriques.</p>
              </div>
              <div>
                  <li>Patrimoine culturel:</li>
                  <p>Soie, culture du thé, médecine traditionnelle chinoise.</p>
              </div>
              <div>
                  <li>Population:</li>
                  <p>Plus de 57 millions.</p>
              </div>
              <div>
                  <li>Climat:</li>
                  <p>Climat de mousson subtropical, avec hivers doux et étés chauds et humides.</p>
              </div>
              <div>
                  <li>Attractions touristiques:</li>
                  <p>Lac de l'Ouest à Hangzhou, Ville d'eau de Wuzhen.</p>
              </div>
              <div>
                  <li>Entreprises mondialement connues:</li>
                  <p>Alibaba Group (commerce électronique), Geely (fabrication automobile), Wahaha (boissons).</p>
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
