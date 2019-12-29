
function run() {
    for (i = 0; i < 1000; i++) {
        setTimeout(function () { test() }, i * 1000)//设置运行时间3s，共一千次
    }
}

function changePageTable(new_page_num) {//更新页表
    $("#pagetable").html("")//清空显示的旧页表
    arr = page_arr[new_page_num];
    for (i = 0; i < arr.length; i++) {
        var tableobj = document.getElementById("pagetable");//
        var trobj = document.createElement("tr");

        var tdobj = document.createElement("td");
        tdobj.innerHTML = i;
        trobj.appendChild(tdobj);

        var tdobj = document.createElement("td");
        tdobj.innerHTML = arr[i];
        trobj.appendChild(tdobj);

        tableobj.appendChild(trobj);
    }
}
function OnlychangeColor(element, indexnum, color = 'orange') {//修改各单元颜色
    var rows = document.getElementById(element).rows;
    rows[indexnum].style.background = color;
}
function setMemoryBackground() {//设定内存初始状态
    console.log('setMemoryBackground')
    for (var i = 0; i < 20; i++) {
        if (mem_default_color[i]) {
            OnlychangeColor('memory', i, color = '#C0C0C0')
        } else {
            OnlychangeColor('memory', i, color = 'white')
        }
    }
}



function changeColor(element, indexnum, color = 'orange') {//设置单选中颜色
    var rows = document.getElementById(element).rows
    for (var i = 0; i < rows.length; i++)rows[i].style.background = 'white'//清空旧颜色
    rows[indexnum].style.background = color;
}

function updateAddress(s, p, w) {//更新输出
    str1 = "段号:" + s + "页号:" + p + "页内地址：" + w
    document.getElementById('address').innerText = str1//更新逻辑地址
    str1 = page_arr[s][p]*4*1024 + w
    document.getElementById('real_address').innerText = str1//更新物理地址
}



function updatePageTableAddress(num) {
    document.getElementById('page_table_address').innerText = page_address[num]
}

count = 0
i = 0
function find(s, p, w) {
    count++;
    updateAddress(s, p, w)
    changePageTable(s)
    updatePageTableAddress(s)
    //内存修改
    setMemoryBackground()
    OnlychangeColor('memory', page_arr[s][p])
    var temp = findFastTable(page_arr[s][p])
    if (temp == -1) {//快表中没有命中
        changeColor('segtable', s)//选中段表项
        changeColor('pagetable', p)//选中页表项

        updateFastTable(page_arr[s][p], count)
        changeColor('fasttable', findFastTable(page_arr[s][p]), 'blue')
    } else {//快表命中
        changeColor('segtable', s, 'white')
        changeColor('pagetable', p, 'white')
        document.getElementById('lru' + temp).innerHTML = count
        changeColor('fasttable', temp, 'green')
    }
}



function test() {//运行一次
    s = Math.floor(Math.random() * 4);//段表
    p = Math.floor(Math.random() * page_arr[s].length);//页表
    w = Math.floor((Math.random() * 1024));//页内偏移

    console.log(s + ' ' + p + ' ' + w + ' ');//输出将访问的段表、页表和页内偏移
    find(s, p, w)
}


function updateFastTable(num, time) {

    var arrtime = new Array();
    if (document.getElementById('LRU').checked) {//执行LRU算法
        console.log('ok')
        for (i = 0; i < 4; i++)
            arrtime[i] = document.getElementById('lru' + i).innerHTML;
    }
    else {//执行FIFO算法
        for (i = 0; i < 4; i++) {
            arrtime[i] = document.getElementById('fasttime' + i).innerHTML;//
        }
    }

    //寻找最小值索引
    var minn = Infinity;//无穷大
    for (j = 0; j < 4; j++) {
        if (parseInt(arrtime[j]) < minn) {
            minnindex = j;
            minn = parseInt(arrtime[j]);
        }
    }
    //快表更新信息
    document.getElementById('fastindex' + minnindex).innerHTML = num
    document.getElementById('fasttime' + minnindex).innerHTML = time
    document.getElementById('lru' + minnindex).innerHTML = time
}


function findFastTable(address) {
    for (i = 0; i < 4; i++) {
        if (document.getElementById('fastindex' + i).innerHTML == address) return i;//快表索引
    }
    return -1;
}

