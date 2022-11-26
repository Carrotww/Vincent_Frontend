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

// // 슬라이드 내 이미지 관련=======================================================
const galleryItem = document.querySelectorAll(".gallery-item");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

var idx_src_arr = {};
var current_idx = 0;


//clicking on image item
galleryItem.forEach((item, i) => {
  idx_src_arr[i] = item.children[0].src;
  item.addEventListener("click", function(){
    current_idx = i;
    // console.log(item.children[0].src);
    overlay.classList.add("show");
    modal.classList.add("show");
    modal.children[0].src=item.children[0].src;
  });
})

//close button
close.addEventListener("click", function(){
    overlay.classList.remove("show");
    modal.classList.remove("show");
})

let show_modal = (src_str) => {
  modal.children[0].src = src_str;
}

//next
next.addEventListener('click', function(){
  // console.log("next");
  //showSlide(slideIdx++);
  if(current_idx == galleryItem.length - 1){
    current_idx = 0;
  }
  else{
    current_idx = current_idx + 1;
  }
  show_modal(idx_src_arr[current_idx]);
})
//back
prev.addEventListener('click', function(){
  if(current_idx == 0){
    current_idx = galleryItem.length - 1;
  }
  else{
    current_idx = current_idx - 1;
  }
  show_modal(idx_src_arr[current_idx]);
})


let slideIdx = 0;
let showSlide = (idx) => {
  console.log(idx)
  
  if (idx >= galleryItem.length){
    slideIdx = 0;
  }
  if(idx < 0){
    slideIdx = galleryItem.length-1;}
  
  // console.log(galleryItem[slideIdx].children[0].src);
  modal.children[0].src=galleryItem[slideIdx].children[0].src;
}
next
next.addEventListener('click', function(){
  // console.log("next");
  showSlide(slideIdx++);
})
//back
prev.addEventListener('click', function(){
  // console.log("prev");
  showSlide(slideIdx--);
})


//  업로드 영역 모달창 시작====================================


var modals = document.getElementsByClassName("btn-modal");// 모달창 띄우는 자바스크립트 시작
 
var btns = document.getElementsByClassName("modal-btn"); // Modal을 띄우는 클래스 이름을 가져옵니다.

var spanes = document.getElementsByClassName("modal-close");  // Modal을 닫는 close 클래스를 가져옵니다.
var funcs = [];


function Modal(num) {  // Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
    return function () {
        // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
        btns[num].onclick = function () {
            modals[num].style.display = "block";
            console.log(num);
        };

        // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
        spanes[num].onclick = function () {
            modals[num].style.display = "none";
        };
    };
}

// 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
for (var i = 0; i < btns.length; i++) {
    funcs[i] = Modal(i);
}

// 원하는 Modal 수만큼 funcs 함수를 호출합니다.
for (var j = 0; j < btns.length; j++) {
    funcs[j]();
}

// Modal 영역 밖을 클릭하면 Modal을 닫습니다.
window.onclick = function (event) {
    if (event.target.className == "btn-modal") {
        event.target.style.display = "none";
    }
};



/* 이미지 업로드 모달창에 이미지 미리보기 */
// function setThumbnail(event) {
//   var reader = new FileReader();

//   reader.onload = function(event) {
//     var img = document.createElement("img");
//     img.setAttribute("src", event.target.result);
//     document.querySelector("div#image_container").appendChild(img);
//   };

//   reader.readAsDataURL(event.target.files[0]);
// }


// 이쁜 이미지 업로드창
function showPreviewImg(event) {
  if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
  }
}



function showPreviewFilter(event) {

  if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-2-preview");
      preview.src = src;
      preview.style.display = "block";
  }
}




/* 필터 업로드 모달창에 이미지 미리보기 */
// function readURL(input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();
//     reader.onload = function(e) {
//       document.getElementById('preview').src = e.target.result;
//     };
//     reader.readAsDataURL(input.files[0]);
//   } else {
//     document.getElementById('preview').src = "";
//   }
// }