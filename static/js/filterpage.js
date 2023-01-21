filter_list_2()

// 모든 필터 목록 출력
async function filter_list_2() {
    const response = await fetch('http://127.0.0.1:8000/filter/?sort=modal', {
        method:'GET'
    }).then(response => {return response.json()})

    var posts = document.getElementById("table");
  
    for (i = 0; i < response['results'].length; i++) {
  
      const image = response['results'][i]['filter_image'];

      const new_image = `<div class='table_item'>
            <img src='${image}'>
            </div>`;

      posts.insertAdjacentHTML("beforeend",new_image)
    }
}