// 필터 스크롤
function $(el) {
    return  document.querySelector(el);
}

function slid() {
 // input value
 var sv=$("#slid").value;
 // filter contenar width minus perent width divide input max range value multi input value
 var pw=(($("#filters").clientWidth-$("#contenar").clientWidth)/50)*sv;
 $("#filters").style="right:"+pw+"px";
 
 // the width of the cerlc
 var cer=$("#cerlc").offsetWidth;
 // cerlc perent width minus the cerlc width divide input max range multi input value
 var iw=(($("#slid").clientWidth-cer)/50)*sv;
 $("#cerlc").style="left:"+iw+"px";
}



