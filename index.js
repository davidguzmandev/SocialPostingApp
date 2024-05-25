const urlPost = 'https://jsonplaceholder.typicode.com/posts/'
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
            <button onclick="updatePost(${post.id})">Update</button>
        </div>
        `;
        postList.appendChild(listItem);
    })
}

function editPost(id) {
    const form = document.getElementById('editForm');
    form.style.display = 'flex';
}