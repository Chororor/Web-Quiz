// Bank soal. Format: [pertanyaan, [4 opsi], index jawaban benar, penjelasan]
const CATS={
kerajaan:{n:"Kerajaan Nusantara",d:"Kutai sampai Majapahit",q:[
["Kerajaan Hindu tertua di Indonesia, dibuktikan prasasti Yupa, adalah…",["Kutai","Tarumanegara","Sriwijaya","Majapahit"],0,"Kutai di Kalimantan Timur berdiri sekitar abad ke-4."],
["Siapa yang mengucapkan Sumpah Palapa?",["Hayam Wuruk","Gajah Mada","Raden Wijaya","Mpu Prapanca"],1,"Gajah Mada bersumpah menyatukan Nusantara saat diangkat menjadi Mahapatih Majapahit."],
["Pusat kerajaan maritim Sriwijaya berada di sekitar…",["Palembang","Trowulan","Demak","Banten"],0,"Sriwijaya di Sumatra Selatan berjaya sekitar abad ke-7 sampai ke-13."],
["Candi Borobudur dibangun pada masa dinasti…",["Sanjaya","Syailendra","Isyana","Warmadewa"],1,"Dinasti Syailendra membangunnya pada abad ke-8 sampai ke-9."],
["Majapahit didirikan pada 1293 oleh…",["Raden Wijaya","Ken Arok","Airlangga","Hayam Wuruk"],0,"Raden Wijaya mendirikannya setelah mengalahkan pasukan Mongol dan Jayakatwang."],
["Kitab Negarakertagama ditulis oleh…",["Mpu Tantular","Mpu Prapanca","Mpu Sindok","Mpu Kanwa"],1,"Mpu Prapanca menulisnya pada 1365 pada masa Hayam Wuruk."]]},
jajahan:{n:"Masa Penjajahan",d:"VOC, Tanam Paksa, sampai Jepang",q:[
["VOC didirikan pada tahun…",["1511","1602","1799","1830"],1,"VOC berdiri 1602 dan dibubarkan pada 1799."],
["Perang Jawa 1825–1830 dipimpin oleh…",["Pangeran Diponegoro","Tuanku Imam Bonjol","Sultan Hasanuddin","Pattimura"],0,"Diponegoro melawan Belanda dari wilayah Yogyakarta."],
["Sistem Tanam Paksa diterapkan oleh Gubernur Jenderal…",["Daendels","Raffles","Van den Bosch","Van Heutsz"],2,"Johannes van den Bosch memulainya pada 1830."],
["Jalan Raya Pos Anyer–Panarukan dibangun pada masa…",["Daendels","Raffles","Van Mook","J.P. Coen"],0,"Herman Willem Daendels memerintahkannya sekitar 1808–1811."],
["Tuanku Imam Bonjol memimpin perlawanan dalam Perang…",["Padri","Banjar","Aceh","Puputan"],0,"Perang Padri terjadi di Sumatra Barat pada 1821–1837."],
["Jepang mulai menduduki Indonesia pada tahun…",["1940","1942","1945","1947"],1,"Belanda menyerah kepada Jepang di Kalijati pada Maret 1942."]]},
merdeka:{n:"Jalan Menuju Merdeka",d:"Proklamasi sampai pengakuan kedaulatan",q:[
["Proklamasi 17 Agustus 1945 dibacakan di…",["Jl. Pegangsaan Timur 56","Lapangan Ikada","Istana Merdeka","Rengasdengklok"],0,"Teks dibacakan Soekarno di rumahnya di Jakarta."],
["Naskah Proklamasi diketik oleh…",["Sayuti Melik","Ahmad Soebardjo","Fatmawati","Sukarni"],0,"Sayuti Melik mengetiknya dari tulisan tangan Soekarno."],
["Soekarno dan Hatta dibawa golongan muda ke…",["Bandung","Rengasdengklok","Surabaya","Yogyakarta"],1,"Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945."],
["Pidato Soekarno 1 Juni 1945 dikenal sebagai lahirnya…",["Pancasila","UUD 1945","Sumpah Pemuda","Piagam Jakarta"],0,"Pidato itu disampaikan dalam sidang BPUPKI."],
["Pertempuran 10 November 1945 diperingati sebagai Hari…",["Pahlawan","Sumpah Pemuda","Kebangkitan Nasional","Pendidikan"],0,"Pertempuran besar itu terjadi di Surabaya."],
["Belanda mengakui kedaulatan Indonesia lewat KMB pada…",["17 Agustus 1945","27 Desember 1949","17 Agustus 1950","5 Juli 1959"],1,"Pengakuan kedaulatan dilakukan pada 27 Desember 1949."]]},
modern:{n:"Orde Lama sampai Reformasi",d:"1959 sampai 2004",q:[
["Peralihan ke Orde Baru ditandai dengan surat perintah…",["Supersemar","Dekrit Presiden","Maklumat X","Piagam Jakarta"],0,"Supersemar ditandatangani Soekarno pada 11 Maret 1966."],
["Soeharto menjabat presiden selama sekitar…",["22 tahun","32 tahun","15 tahun","10 tahun"],1,"Ia berkuasa dari 1967 sampai mundur pada Mei 1998."],
["Krisis moneter besar yang memicu Reformasi terjadi pada…",["1987","1993","1997","2004"],2,"Krisis dimulai Juli 1997 dan memuncak tahun berikutnya."],
["Siapa presiden RI setelah Soeharto mundur?",["B.J. Habibie","Abdurrahman Wahid","Megawati","S.B. Yudhoyono"],0,"Habibie dilantik pada 21 Mei 1998."],
["Pemilihan presiden langsung pertama di Indonesia berlangsung tahun…",["1999","2004","2009","2014"],1,"Susilo Bambang Yudhoyono menang pada pemilu itu."],
["Dekrit Presiden 5 Juli 1959 menyatakan kembali ke…",["UUD 1945","UUDS 1950","Konstitusi RIS","Piagam Jakarta"],0,"Dekrit juga membubarkan Konstituante."]]},
dunia:{n:"Sejarah Dunia",d:"Revolusi, perang, dan penemuan",q:[
["Perang Dunia II berakhir pada tahun…",["1939","1943","1945","1950"],2,"Perang berakhir pada 1945 setelah Jerman dan Jepang menyerah."],
["Revolusi Prancis meletus pada tahun…",["1689","1789","1848","1917"],1,"Penyerbuan penjara Bastille terjadi pada 14 Juli 1789."],
["Tembok Berlin runtuh pada tahun…",["1961","1975","1989","1991"],2,"Tembok dibuka pada 9 November 1989."],
["Konferensi Asia-Afrika 1955 diadakan di…",["Bandung","Jakarta","Bogor","Yogyakarta"],0,"Konferensi itu melahirkan Dasasila Bandung."],
["Mesin cetak dengan huruf bergerak di Eropa dikembangkan oleh…",["Johannes Gutenberg","Isaac Newton","Galileo Galilei","Leonardo da Vinci"],0,"Gutenberg mengembangkannya sekitar 1440-an."],
["Perang Dunia I dipicu pembunuhan…",["Franz Ferdinand","Tsar Nicholas II","Kaisar Wilhelm II","Napoleon III"],0,"Putra mahkota Austria-Hongaria itu ditembak di Sarajevo pada 1914."]]},
mix:{n:"Campuran",d:"10 soal acak dari semua topik"}};
