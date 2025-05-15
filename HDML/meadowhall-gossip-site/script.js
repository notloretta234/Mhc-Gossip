document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('loginSection');
  const welcomeSection = document.getElementById('welcomeSection');
  const usernameInput = document.getElementById('usernameInput');
  const loginBtn = document.getElementById('loginBtn');
  const userDisplay = document.getElementById('userDisplay');

  const form = document.getElementById('postForm');
  const postInput = document.getElementById('postInput');
  const postList = document.getElementById('postList');

  let currentUser = null;
  let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

  // Restore user if previously logged in
  const savedUser = localStorage.getItem('meadowhallUser');
  if (savedUser) {
    currentUser = savedUser;
    loginSection.style.display = 'none';
    welcomeSection.style.display = 'block';
    userDisplay.textContent = currentUser;
    form.style.display = 'block';
    renderPosts();
  }

  function savePosts() {
    localStorage.setItem('posts', JSON.stringify(savedPosts));
  }

  function renderPosts() {
    postList.innerHTML = '';
    savedPosts.forEach((post, index) => {
      // Skip broken posts
      if (!post || !post.user || !post.text) return;

      const li = document.createElement('li');
      li.textContent = `${post.user}: ${post.text}`;

      if (post.user === currentUser) {
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => {
          savedPosts.splice(index, 1);
          savePosts();
          renderPosts();
        });
        li.appendChild(delBtn);
      }

      postList.appendChild(li);
    });
  }

  loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (!username) {
      alert('Type a username, dummy');
      return;
    }
    currentUser = username;
    localStorage.setItem('meadowhallUser', currentUser);
    loginSection.style.display = 'none';
    welcomeSection.style.display = 'block';
    userDisplay.textContent = currentUser;
    form.style.display = 'block';

    renderPosts();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!currentUser) {
      alert('Login first, dude!');
      return;
    }
    const text = postInput.value.trim();
    if (!text) return;

    savedPosts.push({ user: currentUser, text });
    savePosts();
    renderPosts();
    postInput.value = '';
  });

  renderPosts();
});
