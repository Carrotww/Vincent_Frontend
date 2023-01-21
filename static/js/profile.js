window.onload = () => {
    show_profile_fuc()
}

async function show_profile_fuc() {

    const id = localStorage.getItem("payload")
    const id_json = JSON.parse(id)
    
    const response = await fetch('http://127.0.0.1:8000/users/'+ id_json['username'] +'/', {

            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        .then(data => {

            // 프로필 정보 불러오는 함수
    
            //프로필 사진 들어갈 div 지정
            const profile_image_frame = document.getElementById("pd-profile-image-frame");
            profile_image_frame.setAttribute('class', 'pd-profile-image-frame')

            //프로필 사진 불러오기
            const profile_image = document.createElement("img")
            profile_image.setAttribute('class', 'pd-profile-image')
            profile_image.src = "http://127.0.0.1:8000" + data["profile_image"] + '/'
            profile_image_frame.appendChild(profile_image)

            const profile_image_edit = document.createElement("input")
            profile_image_edit.setAttribute('type', 'file')
            profile_image_edit.setAttribute('onchange', '')
            profile_image_frame.appendChild(profile_image_edit)

            //프로필 정보 입력할 div 지정
            const profile_info = document.getElementById("pd-profile-info");

            //username 불러오기
            const profile_username = document.createElement("div")
            profile_username.setAttribute('class', 'pd-profile-username')
            profile_username.innerText = data['username']
            profile_info.appendChild(profile_username)

            //email 불러오기
            const profile_email = document.createElement("div")
            profile_email.setAttribute('class', 'pd-profile-email')
            profile_email.innerText = data['email']
            profile_info.appendChild(profile_email)

            //게시물 수, 팔로잉 수 불러오기
            const post_following_count = document.createElement("div")
            post_following_count.setAttribute('class', 'pd-post-following-count')
            post_following_count.innerText = "Post : " + data['post_user'].length + " , " + "Following : " + data['followings'].length
            profile_info.appendChild(post_following_count)

            // 이미지 카드 생성
            const box = document.getElementById("pd-box")
            const filter = document.createElement("div")
            filter.setAttribute('class', "pd-filter pd-filter-grid pd-row")
            filter.setAttribute('id', 'pd-filter')

            box.appendChild(filter)

            for (i = 0; i < data['post_user'].length; i++) {

                // 이미지카드 들어갈 위치 div 지정
                const list_grid = document.createElement("div")
                list_grid.setAttribute('class', 'pd-list-grid pd-col-md-4')
                filter.appendChild(list_grid)

                const card = document.createElement("div")
                card.setAttribute('class', 'pd-card')
                list_grid.appendChild(card)

                // 아웃풋 이미지 불러오기
                const output_image = document.createElement("img")
                output_image.setAttribute('class', 'pd-card-img-top')
                output_image.src = "http://127.0.0.1:8000" + data["post_user"][i]["post_image"] + '/'
                card.appendChild(output_image)

                const card_body = document.createElement("div")
                card_body.setAttribute('class', 'pd-card-body')
                card.appendChild(card_body)

                // 이미지카드 제목 불러오기
                const card_title = document.createElement("b")
                card_title.setAttribute('class', 'pd-card-title')
                card_title.innerText = data["post_user"][i]["title"]
                card_body.appendChild(card_title)

                // 이미지카드 좋아요 수 불러오기
                const card_text = document.createElement("p")
                card_text.setAttribute('class', 'pd-card-text')
                card_text.innerText = "💗 : " + data["post_user"][i]["likes_count"]
                card_body.appendChild(card_text)
            }
        })

        
}