const urlPost = 'https://jsonplaceholder.typicode.com/posts'
let posts = [];

function getPost(){
    fetch(urlPost)
    .then(res => res.json())
    .then(data => {
        posts = data;
        //Show info
        renderPost()
    })
    .catch(err => console.log('Huge Mistake', err));
}

function renderPost() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.classList.add('postItem');
        listItem.innerHTML =`
        <p>${post.body}</p>
        <button onclick="editPost(${post.id})">Edit</button>
        <button onclick="deletePost(${post.id})">Delete</button>

        <div id="editForm${post.id}" class="editForm" style="display:none">
            <textarea id="editBody${post.id}" required>${post.body}</textarea>
            <br>
            <button onclick="updatePost(${post.id})">Update</button>
        </div>
        `;
        postList.appendChild(listItem);
    })
}

function postData(){
    const postBody = document.getElementById('post');
    const postBodyInput = postBody.value;

    if (postBodyInput.trim() == ''){
        alert('Please write anything');
        return;
    }

    fetch(urlPost, {
        method: 'POST',
        body: JSON.stringify({
          body: postBodyInput,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    .then(res => res.json())
    .then(data => {
        posts.unshift(data);
        renderPost()
    }).catch(err => {
        console.log(err);
    })

    postBody.value = ''
}

function editPost(id) {
    const form = document.getElementById(`editForm${id}`);
    form.style.display = (form.style.display == 'none') ? 'block' : 'none' ;
}

function updatePost(id) {
    const editBody = document.getElementById(`editBody${id}`).value;

    fetch(`${urlPost}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            body: editBody,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then(res => res.json())
    .then(data => {
        const index = posts.findIndex(post => post.id === data.id)
        if (index != -1) {
            posts[index] = data;
        } else {
            alert('Something wrong');
        }
        renderPost();
    }).catch(err => {
        console.log(err);
    })
}

function deletePost(id) {
    fetch(`${urlPost}/${id}`, {
        method: 'DELETE',
    })
    .then(res => {
        if(res.ok) {
            posts = posts.filter( post => post.id != id);
            renderPost();
        } else {
            alert('Something wrong');
        }
    })
    .catch(err => {
        console.log(err);
    })
}