
// var untuk menentukan probabilitas dalam gacha
var probabilitasGacha = probabilitas(90,9,1);
// var uang untuk ekonomi di game
var uang = 1000;
// var gem untuk ekonomi di game
var berlian = 0;
// ini var penyimpanan untuk menyimpan data hasil gacha dalam bentuk multi dimensi array
var penyimpananKarakter = [];
// ini var s untuk menyimpan data gacha dalam bentuk srting
var s ='';
// var untuk data item common
var common =    [
                // array untuk nama
                ['Arch Imp','Dark Slime', 'Bubble Slime','Dorome','Dragon Zombie'],
                // array untuk link gambar
                ['vVfyhK1','2VfXLqc','jVfyIZd','jVfB7VZ','yVfNszR']
                ];
// var untuk data item rare
var rare =      [
                // array untuk nama
                ['Apsara','Basilisk','Akaname','Alp','Alraune'],
                // array untuk link gambar
                ['PVfyC5j','aVfuewS','EVfNYk8','iVfNHaR','XVfNNRN']
                ];
// var untuk data item epic
var epic =      [
                // array untuk nama
                ['Demon','High Orc','Manticore','Mindflayer','Night Gaunt'],
                // array untuk link gambar
                ['nVfulC4','RVfuxKt','xVfN3KE','9VfMw9n','XVfMojk']       
                ];
// fungsi unt mencetak probability
function probabilitas(){
    // var array untuk menyimpan probability
    var array = [];
    // mengulang sebanyak jumlah array dalam argumen
    for(var i=0;i<=arguments.length;i++){
        // mengulang sebanyak angka yang ada dalam 1 array spesifik di argumen
        for(var j=1;j<=arguments[i];j++){
            // menambah array kedalam var array
            array.push(i+1)
        }
    }
    //  mengembalikan nilai 
    return array
}
// perintah untuk menyetak value uang ke dalam html 
document.getElementById('money').innerHTML = barUpdate(uang,berlian);
//fungsi untuk mulai gacha
function mulaiGacha(type){
    // jika gacha 1x
    if (type == '1x'){
        // panggil funsi gacha
            gacha();
    }
    // jika berlian diatas 10 dan gacha 10x
    else if (berlian >= 5 && type == '10x'){
        // kurangi 5 berlian
            berlian-=5;
            // ulang sampain 10x
            for(i=1;i<=10;i++){
                // panggil fungsi gacha
                gacha();
            }
        
    }
    // jika berlian diatas 10
    else if (berlian >= 10){
        // kurangi 10 berlian
            berlian-=10;
            // uang di bagi 10
            a = Math.floor(uang / 10);
            // mengulang sampai hasil dari uang di bagi 10
            for(i=1;i<=a;i++){
                // panggil fungsi gacha
                gacha();
            }
        }
        // jika berlian 0
    else{
        // mencetak hasil jika berlian 0
        document.getElementById('hasil').innerHTML = `<p>Not Enough Gem!</p>`;
    }
}
// fungsi mengatur data yang berjenis array
function aturData(perintah,data){
    // jika perintahnya tambah
        if(perintah == 'tambah'){
                // jika data lapisan 1 tidak ada
                if(data[0] == undefined){
                    // ulang sampai panjang argumen
                    for(var i=0;i<arguments.length-2;i++){
                        // menambah lapisan ke data
                        data.push([arguments[i+2]])
                    }
                    console.log('buat data layer baru');
                }
                // jika lapis data pertama panjangnya lebih kecil dari panjang argumen dan panjang argumen lebih kecil dari panjang seluruh layer di data
                else if(data[0].length <= arguments.length && arguments.length-2 <= data.length){
                    // ulang sampai panjang argumen dikurang 2
                    for(var i=0;i<arguments.length-2;i++){
                        // menambah data ke lapisan yang sudah ada secara berurut
                        data[i].push(arguments[i+2])
                    }
                }
                // jika panjang argumen lebih besar dari panjang seluruh layer di data
                else{
                    // ulang sampai panjang argumen dikurang 2
                    for(var i=0;i<arguments.length-2;i++){
                        // jika panjang seluruh layer di data kurang dari pengulangan nilai i
                        if(i < data.length){
                            // tambah data ke layer yang sudah ada secara berurut
                            data[i].push(arguments[i+2])
                        }
                        // jika panjang seluruh layer di data lebih dari pengulangan nilai i
                        else{
                            // tambah data ke layer baru secara berurut
                            data.push([arguments[i+2]])
                        }
                    }
            }
        }
        // jika perintahnya hapus
        else if(perintah == 'hapus'){
            // ulang sampai panjang seluru layer di data
            for(var i=0;i<data.length;i++){
                // hapus data di dalaem layer secara berurut
                data[i].splice(arguments[2],1)
            }
        }
        // jika salah perintah
        else{
            // console
            console.log('Salah Memasukan Perintah')
        }

}
// fungsi mencetak hasil gacha kedalam data berupa array
function cetakHasilGacha(kelangkaan,harga,dataKelangkaan){
    // uang di kurang harga
    uang-=harga;
    // var menentukan kuliatas gacha 
    var menentukanQualitasGacha = Math.floor(Math.random() * dataKelangkaan[0].length);

    var nama = dataKelangkaan[0][menentukanQualitasGacha];
    var gambar = dataKelangkaan[1][menentukanQualitasGacha];
    document.getElementById('hasil').innerHTML = rewardNotif(nama,gambar,kelangkaan);
    if(penyimpananKarakter[1] == undefined){
        console.log('iasa');
        console.log(nama+gambar+kelangkaan);
        aturData('tambah',penyimpananKarakter,nama,gambar,kelangkaan,1)
        console.log(penyimpananKarakter);
    }
    else if(!penyimpananKarakter[0].includes(nama)){
        console.log('asasi');
        aturData('tambah',penyimpananKarakter,nama,gambar,kelangkaan,1)
        console.log(penyimpananKarakter);
    }
    else{
        var a = penyimpananKarakter[0].indexOf(nama);
        penyimpananKarakter[3][a]++;
    }
}
function gacha(){
    var jangkauanProbabilitas = Math.floor(Math.random() * probabilitasGacha.length);
    var hasilProbabilitas = probabilitasGacha[jangkauanProbabilitas];
    if(hasilProbabilitas == 1 && uang >= 10){
        cetakHasilGacha('Common',10,common)
    }
    else if(hasilProbabilitas == 2 && uang >= 10){
        cetakHasilGacha('Rare',10,rare)
    }
    else if(hasilProbabilitas == 3 && uang >= 10){
        cetakHasilGacha('Epic',10,epic)
    }
    else{
        document.getElementById('hasil').innerHTML = `<p>Not Enough uang!</p>`;
    }
    invenList();

}
function sell(f,n){
    var indexH = penyimpananKarakter[0].indexOf(n);
    console.log(indexH);
    if (f == 'Common'){
        penyimpananKarakter[3][indexH]--;
        uang+=5;
        if(penyimpananKarakter[3][indexH]<= 0){
            aturData('hapus',penyimpananKarakter,indexH)
        }
        
    }
    else if (f == 'Rare'){
        penyimpananKarakter[3][indexH]--;
        uang+=10;
        if(penyimpananKarakter[3][indexH]<= 0){
            aturData('hapus',penyimpananKarakter,indexH)
        }
    }
    else{
        penyimpananKarakter[3][indexH]--;
        uang+=100;
        if(penyimpananKarakter[3][indexH]<= 0){
            aturData('hapus',penyimpananKarakter,indexH);
            berlian+=3;
        }
    }
    invenList();
}
function sellAll(f,n){
    var indexH = penyimpananKarakter[0].indexOf(n);
    if (f == 'Common'){
        uang+= (5 * penyimpananKarakter[3][indexH]) ;
        aturData('hapus',penyimpananKarakter,indexH);
    }
    else if (f == 'Rare'){
        uang+= (10 * penyimpananKarakter[3][indexH]) ;
        aturData('hapus',penyimpananKarakter,indexH);
    }
    else{
        uang+= (100 * penyimpananKarakter[3][indexH]) ;
        berlian+=(3*penyimpananKarakter[3][indexH]);
        aturData('hapus',penyimpananKarakter,indexH);
    }
    invenList();

}
function price(type,rarity){
    if(type == 'sell'){
        if(rarity == 'Common'){
            return 5;
        }
        if(rarity == 'Rare'){
            return 10;
        }
        else{
            return 100;
        }
    }
    else{
        if(rarity == 'Common'){
            return 10;
        }
        if(rarity == 'Rare'){
            return 10;
        }
        else{
            return 10;
        }
    }
}
function invenList(){
    
    s = '';
    for(k=0;k<penyimpananKarakter[0].length;k++){
        s +=`            
        <div class="${penyimpananKarakter[2][k]} card">
            <img src="https://cutt.ly/${penyimpananKarakter[1][k]}" alt="">
            <p>${penyimpananKarakter[0][k]}</p>
            <p>${penyimpananKarakter[2][k]}</p>
            <p style="font-size:12px;opacity:0.7;">Amount  ${penyimpananKarakter[3][k]}</p>
            ${priceGemCost(penyimpananKarakter[2][k])}
        </div>`
        ;
    }
    document.getElementById('inven').innerHTML = s;
    document.getElementById('money').innerHTML = barUpdate(uang,berlian);
}
function rewardNotif(name,img,rarity){
    return`<img src="https://cutt.ly/${img}" alt=""> <p>You got <span>${name}</span>, ${rarity} Quality!</p>`
}
function barUpdate(uang,berlian){
    return `<p><i class="fa-solid fa-coins"></i> ${uang} <i class="fa-solid fa-gem"></i> ${berlian}</p>`;
}
function priceGemCost(type){
    if (type == 'Epic'){
        return `            <div onclick="sell('${penyimpananKarakter[2][k]}','${penyimpananKarakter[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${price('sell',penyimpananKarakter[2][k])}
                              +<i class="fa-solid fa-gem"></i> ${3}
                            </div>
                            <div onclick="sellAll('${penyimpananKarakter[2][k]}','${penyimpananKarakter[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${penyimpananKarakter[3][k]*price('sell',penyimpananKarakter[2][k])}
                             +<i class="fa-solid fa-gem"></i> ${penyimpananKarakter[3][k]*3}
                            </div>`
    }
    else{
        return `            <div onclick="sell('${penyimpananKarakter[2][k]}','${penyimpananKarakter[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${price('sell',penyimpananKarakter[2][k])}
                            </div>
                            <div onclick="sellAll('${penyimpananKarakter[2][k]}','${penyimpananKarakter[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${penyimpananKarakter[3][k]*price('sell',penyimpananKarakter[2][k])}
                            </div>`
    }
}