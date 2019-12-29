//init.js文件
//初始化界面
var page_address = new Array(81920, 86016, 90112, 94208)//初始化页表所在地址
var page_arr = new Array()//初始化页表内容
page_arr[0] = new Array(0, 4, 8);
page_arr[1] = new Array(2, 18, 11, 19);
page_arr[2] = new Array(1, 16, 5, 7, 14);
page_arr[3] = new Array(6, 10, 12, 15);


for (i = 0; i < 20; i++) {
    var tableobj = document.getElementById("memory");
    var trobj = document.createElement("tr");
    var tdobj = document.createElement("td");
    tdobj.innerHTML = i;
    trobj.appendChild(tdobj);
    tableobj.appendChild(trobj);
}

//初始化快表
for (i = 0; i < 4; i++) {//设定快表内容
    var tableobj = document.getElementById("fasttable");
    var trobj = document.createElement("tr");

    var tdobj = document.createElement("td");
    tdobj.id = "fastindex" + i;
    tdobj.innerHTML = -1;
    trobj.appendChild(tdobj);

    var tdobj = document.createElement("td");
    tdobj.id = "fasttime" + i;
    tdobj.innerHTML = -1;
    trobj.appendChild(tdobj);

    var tdobj = document.createElement("td");
    tdobj.id = "lru" + i;
    tdobj.innerHTML = -1;
    trobj.appendChild(tdobj);

    tableobj.appendChild(trobj);
}

// var arr1 = new Array(3, 4, 5, 4);
// var startarr = new Array(100, 200, 300, 400);
//初始化段表
for (i = 0; i < 4; i++) {
    var tableobj = document.getElementById("segtable");
    var trobj = document.createElement("tr");

    var tdobj = document.createElement("td");
    tdobj.innerHTML = i;
    trobj.appendChild(tdobj);

    var tdobj = document.createElement("td");
    tdobj.innerHTML = page_arr[i].length//arr1[i];
    trobj.appendChild(tdobj);

    var tdobj = document.createElement("td");
    // tdobj.innerHTML = startarr[i];
    tdobj.innerHTML = page_address[i];
    trobj.appendChild(tdobj);

    tableobj.appendChild(trobj);//将trobj压入段表
}

//3,17,9,13
//16,17,18,19
var mem_default_color = new Array(//初始化内存占用情况
    1, 1, 1, 0, 1,
    1, 1, 1, 1, 0,
    1, 1, 1, 0, 1,
    1, 1, 0, 1, 1
)
