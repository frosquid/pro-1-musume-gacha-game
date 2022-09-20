var probability = [];
for(j=1; j<=100;j++){
    if(j <= 75){
        probability.push(1);
    }
    else if(j<=95){
        probability.push(2);
    }
    else{
        probability.push(3);
    }
}

var common =    [
                ['Arch Imp','Dark Slime', 'Bubble Slime','Dorome','Dragon Zombie'],
                ['vVfyhK1','2VfXLqc','jVfyIZd','jVfB7VZ','yVfNszR']
                ];
var rare =      [
                ['Apsara','Basilisk','Akaname','Alp','Alraune'],
                ['PVfyC5j','aVfuewS','EVfNYk8','iVfNHaR','XVfNNRN']
                ];
var epic =      [
                ['Demon','High Orc','Manticore','Mindflayer','Night Gaunt'],
                ['nVfulC4','RVfuxKt','xVfN3KE','9VfMw9n','XVfMojk']
                ];
var storage = [[],[],[],[]];
var s ='';

var money = 1000;
var gem = 0;
document.getElementById('money').innerHTML = barUpdate(money,gem);
function letGacha(type){
    if(type == 'once'){
        gacha();
        
    }
    else if (gem >= 5 && type == '10x'){
            gem-=5;
            for(i=1;i<=10;i++){
                gacha();
            }
        
    }
    else if (gem >= 10){
            gem-=10;
            a = Math.floor(money / 10);
            for(i=1;i<=a;i++){
                gacha();
            }
        }
    else{
        document.getElementById('hasil').innerHTML = `<p>Not Enough Gem!</p>`;
    }
}


function gacha(){
    var indexProb = Math.floor(Math.random() * probability.length);
    var getProb = probability[indexProb];
    if(getProb == 1 && money >= 10){
        money-=10;
        var indexQua = Math.floor(Math.random() * common[0].length);
        var name = common[0][indexQua];
        var img = common[1][indexQua];
        document.getElementById('hasil').innerHTML = rewardNotif(name,img,'Common');
        if(!storage[0].includes(name)){
            storage[0].push(name);
            storage[1].push(img);
            storage[2].push('Common');
            storage[3].push(1);
        }
        else{
            var a = storage[0].indexOf(name);
            
            storage[3][a]++;
        }
   
    }
    else if(getProb == 2 && money >= 10){
        money-=10;
        var indexQua = Math.floor(Math.random() * rare[0].length);
        var name = rare[0][indexQua];
        var img = rare[1][indexQua];
        document.getElementById('hasil').innerHTML = rewardNotif(name,img,'Rare');
        if(!storage[0].includes(name)){
            storage[0].push(name);
            storage[1].push(img);
            storage[2].push('Rare');
            storage[3].push(1);
        }
        else{
            var a = storage[0].indexOf(name);
        
            storage[3][a]++;
        }
    }
    else if(getProb == 3 && money >= 10){
        money-=10;
        var indexQua = Math.floor(Math.random() * epic[0].length);
        var name = epic[0][indexQua];
        var img = epic[1][indexQua];
        document.getElementById('hasil').innerHTML = rewardNotif(name,img,'Epic');
        if(!storage[0].includes(name)){
            storage[0].push(name);
            storage[1].push(img);
            storage[2].push('Epic');
            storage[3].push(1);
        }
        else{
            var a = storage[0].indexOf(name);
        
            storage[3][a]++;
        }
    }
    else{
        document.getElementById('hasil').innerHTML = `<p>Not Enough Money!</p>`;
    }
    invenList();

}
function sell(f,n){
    var indexH = storage[0].indexOf(n);
    if (f == 'Common'){
        storage[3][indexH]--;
        money+=5;
        if(storage[3][indexH]<= 0){
            storage[0].splice(indexH,1);
            storage[1].splice(indexH,1);
            storage[2].splice(indexH,1);
            storage[3].splice(indexH,1);
        }
        
    }
    else if (f == 'Rare'){
        storage[3][indexH]--;
        money+=10;
        if(storage[3][indexH]<= 0){
            storage[0].splice(indexH,1);
            storage[1].splice(indexH,1);
            storage[2].splice(indexH,1);
            storage[3].splice(indexH,1);
        }
    }
    else{
        storage[3][indexH]--;
        money+=100;
        if(storage[3][indexH]<= 0){
            storage[0].splice(indexH,1);
            storage[1].splice(indexH,1);
            storage[2].splice(indexH,1);
            storage[3].splice(indexH,1);
            gem+=3;
        }
    }
    invenList();
}
function sellAll(f,n){
    var indexH = storage[0].indexOf(n);
    if (f == 'Common'){
        money+= (5 * storage[3][indexH]) ;
        storage[0].splice(indexH,1);
        storage[1].splice(indexH,1);
        storage[2].splice(indexH,1);
        storage[3].splice(indexH,1);
        
    }
    else if (f == 'Rare'){
        money+= (10 * storage[3][indexH]) ;
        storage[0].splice(indexH,1);
        storage[1].splice(indexH,1);
        storage[2].splice(indexH,1);
        storage[3].splice(indexH,1);
    }
    else{
        money+= (100 * storage[3][indexH]) ;
        gem+=(3*storage[3][indexH]);
        storage[0].splice(indexH,1);
        storage[1].splice(indexH,1);
        storage[2].splice(indexH,1);
        storage[3].splice(indexH,1);
        
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
    for(k=0;k<storage[0].length;k++){
        s +=`            
        <div class="${storage[2][k]} card">
            <img src="https://cutt.ly/${storage[1][k]}" alt="">
            <p>${storage[0][k]}</p>
            <p>${storage[2][k]}</p>
            <p style="font-size:12px;opacity:0.7;">Amount  ${storage[3][k]}</p>
            ${priceGemCost(storage[2][k])}
        </div>`
        ;
    }
    document.getElementById('inven').innerHTML = s;
    document.getElementById('money').innerHTML =  barUpdate(money,gem);
}
function rewardNotif(name,img,rarity){
    return`<img src="https://cutt.ly/${img}" alt=""> <p>You got <span>${name}</span>, ${rarity} Quality!</p>`
}
function barUpdate(money,gem){
    return `<p><i class="fa-solid fa-coins"></i> ${money} <i class="fa-solid fa-gem"></i> ${gem}</p>`;
}
function priceGemCost(type){
    if (type == 'Epic'){
        return `            <div onclick="sell('${storage[2][k]}','${storage[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${price('sell',storage[2][k])}
                              +<i class="fa-solid fa-gem"></i> ${3}
                            </div>
                            <div onclick="sellAll('${storage[2][k]}','${storage[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${storage[3][k]*price('sell',storage[2][k])}
                             +<i class="fa-solid fa-gem"></i> ${storage[3][k]*3}
                            </div>`
    }
    else{
        return `            <div onclick="sell('${storage[2][k]}','${storage[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${price('sell',storage[2][k])}
                            </div>
                            <div onclick="sellAll('${storage[2][k]}','${storage[0][k]}')" class="sell">
                            +<i class="fa-solid fa-coins"></i> ${storage[3][k]*price('sell',storage[2][k])}
                            </div>`
    }
}