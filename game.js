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

var money = 100;
document.getElementById('money').innerHTML = `<p>Money : ${money}</p>`;
function pencet(){
    var indexProb = Math.floor(Math.random() * probability.length);
    var getProb = probability[indexProb];
    if(getProb == 1 && money >= 1){
        money--;
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
    else if(getProb == 2 && money >= 1){
        money--;
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
    else if(getProb == 3 && money >= 1){
        money--;
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
        money+=.5;
        if(storage[3][indexH]<= 0){
            storage[0].splice(indexH,1);
            storage[1].splice(indexH,1);
            storage[2].splice(indexH,1);
            storage[3].splice(indexH,1);
        }
        
    }
    else if (f == 'Rare'){
        storage[3][indexH]--;
        money+=1;
        if(storage[3][indexH]<= 0){
            storage[0].splice(indexH,1);
            storage[1].splice(indexH,1);
            storage[2].splice(indexH,1);
            storage[3].splice(indexH,1);
        }
    }
    else{
        storage[3][indexH]--;
        money+=10;
        if(storage[3][indexH]<= 0){
            storage[0].splice(indexH,1);
            storage[1].splice(indexH,1);
            storage[2].splice(indexH,1);
            storage[3].splice(indexH,1);
        }
    }
    invenList();
}
function sellAll(f,n){
    var indexH = storage[0].indexOf(n);
    if (f == 'Common'){
        money+= (.5 * storage[3][indexH]) ;
        storage[0].splice(indexH,1);
        storage[1].splice(indexH,1);
        storage[2].splice(indexH,1);
        storage[3].splice(indexH,1);
        
    }
    else if (f == 'Rare'){
        money+= (1 * storage[3][indexH]) ;
        storage[0].splice(indexH,1);
        storage[1].splice(indexH,1);
        storage[2].splice(indexH,1);
        storage[3].splice(indexH,1);
    }
    else{
        money+= (10 * storage[3][indexH]) ;
        storage[0].splice(indexH,1);
        storage[1].splice(indexH,1);
        storage[2].splice(indexH,1);
        storage[3].splice(indexH,1);
    }
    invenList();

}
function invenList(){
    
    s = '';
    for(k=0;k<storage[0].length;k++){
        s +=`            
        <div class="${storage[2][k]} card">
            <img src="https://cutt.ly/${storage[1][k]}" alt="">
            <p>${storage[0][k]}</p>
            <p>${storage[2][k]}</p>
            <p>Amount : ${storage[3][k]}</p>
            <div onclick="sell('${storage[2][k]}','${storage[0][k]}')" class="sell">
                Sell
            </div>
            <div onclick="sellAll('${storage[2][k]}','${storage[0][k]}')" class="sell">
                Sell All
            </div>
        </div>`
        ;
    }
    document.getElementById('inven').innerHTML = s;
    document.getElementById('money').innerHTML = `<p>Money : ${money}</p>`;
}
function rewardNotif(name,img,rarity){
    return`<img src="https://cutt.ly/${img}" alt=""> <p>you get <span>${name}</span>, ${rarity} Quality!</p>`
}