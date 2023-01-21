post_list()


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

  
  if (idx >= galleryItem.length){
    slideIdx = 0;
  }
  if(idx < 0){
    slideIdx = galleryItem.length-1;}
  

  modal.children[0].src=galleryItem[slideIdx].children[0].src;
}
next
next.addEventListener('click', function(){

  showSlide(slideIdx++);
})
//back
prev.addEventListener('click', function(){

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


// 이미지 업로드창
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


// 모든 게시글 목록 출력
async function post_list() {

  const response = await fetch('http://127.0.0.1:8000/main/', {
      method:'GET'
  }).then(response => {return response.json()})
  var posts = document.getElementById("table"); 
  
  for (i = 0; i < response['results'].length; i++) {

    const image = response['results'][i]['post_image'];
    const new_image = `<div class='table_item'>
          <img src='${image}'>
          </div>`;

    posts.insertAdjacentHTML("beforeend",new_image)
   
  }
}


var server = "http://127.0.0.1:8000"

window.onload = ()=>{
    filter_list()
}

function move_page(page) {
    window.location.href = page
}

// 모든 필터 목록 출력
async function filter_list() {
    const response = await fetch('http://127.0.0.1:8000/filter/?sort=modal', {
        method:'GET'
    })
    .then(response => {
        return response.json();
    }).then(data => {
        return data
    });

    var filters = document.getElementById("cards"); 

    for (i = 0; i < response['results'].length; i++) {
        const filter_pk = response['results'][i]['pk'];

        var filter_info = document.createElement("div");
        filter_info.className = "card";
        filters.appendChild(filter_info);

        var img_frame = document.createElement("div"); 
        img_frame.className = "card_img_frame";

        var filter_image = document.createElement("img"); 
        filter_image.className = "card_img";
        filter_image.src = response['results'][i]['filter_image']; 
        filter_image.alt = response['results'][i]['pk'];
        filter_image.id = response['results'][i]['pk']; 
        filter_image.setAttribute("onclick", "filter_pick("+filter_pk+")"); 
        
        filter_info.appendChild(img_frame);
        img_frame.appendChild(filter_image);

        const filter_name = document.createElement("div");
        filter_name.className = "card_title"; 
        filter_name.innerText = response['results'][i]['filter_name'];
        filter_name.setAttribute("onclick", "filter_pick("+filter_pk+")"); 
        filter_info.appendChild(filter_name);
    }
    
    // 새로운 필터 추가 버튼 생성
    var add_filter_label = document.createElement("label");
    add_filter_label.htmlFor = "user_filter";
    filters.appendChild(add_filter_label);

    var add_filter_div = document.createElement("div");
    add_filter_div.className = "add_filter";
    add_filter_label.appendChild(add_filter_div)

    var add_filter_div_text = document.createElement("div");
    add_filter_div_text.className = "add_filter_text";
    add_filter_div_text.innerText = "커스텀필터 사용";
    add_filter_div.appendChild(add_filter_div_text)
   
    var add_filter_input = document.createElement("input");
    add_filter_input.id = "user_filter";
    add_filter_input.name = "user_filter";
    add_filter_input.type = "file";
    add_filter_input.accept = "image/png, image/jpeg";
    add_filter_input.style.display = 'none'; 
    filters.appendChild(add_filter_input);
    
}


// 사용자가 업로드한 이미지 or 머신러닝 결과 이미지 미리보기
function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('preview').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      document.getElementById('preview').src = "";
    }
  }


// (제공한 기존 필터이미지/필터이름 클릭 or 머신러닝 버튼 클릭 시)머신러닝 실행시키는 함수
async function filter_pick(filter_pk) {
    const formData = new FormData();
    
    if (filter_pk) { 
        const filter = filter_pk 
        formData.append("filter", filter)
    } else {
        const user_filter = document.getElementById("user_filter").files[0] 
        formData.append("user_filter", user_filter)
    };

    const temp_image = document.getElementById("file-ip-1").files[0]
    formData.append("temp_image", temp_image)

    const response = await fetch('http://127.0.0.1:8000/main/image/', {
        method:'POST',
        body: formData
        })
        .then(response => {
            return response.json();
        }).then(data => {
            return data
        });

        var post_image = document.getElementById("file-ip-1-preview"); 
        post_image.src = server+response; 
}

// 제목, 내용 작성칸 보여주기
async function submit() {
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.display = 'block';
    content.style.display = 'block';
}


// 게시글 생성
async function post() {
    const formData = new FormData();
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value 

    url = document.getElementById("file-ip-1-preview").src
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    const result = new File([data], filename, metadata);   

    formData.append("title", title)
    formData.append("content", content)
    formData.append("post_image", result)

    const response2 = await fetch('http://127.0.0.1:8000/post/', {
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("access")
        },
        method:'POST',
        body: formData
    });
    move_page('main.html')
};


// 필터 스크롤
function $(el) {
  return  document.querySelector(el);
}


function slid() {
// input value
var sv=$("#slid").value;
// cards contenar width minus perent width divide input max range value multi input value
var pw=(($("#cards").clientWidth-$("#contenar").clientWidth)/50)*sv;
$("#cards").style="right:"+pw+"px";

// the width of the cerlc
var cer=$("#cerlc").offsetWidth;
// cerlc perent width minus the cerlc width divide input max range multi input value
var iw=(($("#slid").clientWidth-cer)/50)*sv;
$("#cerlc").style="left:"+iw+"px";
}


function handleLogout() {
  window.localStorage.clear(); //로컬스토리지토큰 삭제
  window.location.href="http://127.0.0.1:5500/signlog.html"
}


// 로그인 페이지로 이동하는 함수
function LoginPage() {
  window.location.href="http://127.0.0.1:5500/signlog.html"
}


// 프로필 페이지로 이동하는 함수
function ProfilePage() {
  window.location.href='http://127.0.0.1:5500/profile.html'
}