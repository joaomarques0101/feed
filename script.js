document.addEventListener("DOMContentLoaded", function () {
    // Função para verificar se o usuário está logado
    function checkUserLoggedIn() {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        return userProfile;
    }

    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');
    const commentsSections = document.querySelectorAll('.comments');

    // Função para curtir post
    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const post = button.closest('.post');
            const likeCount = post.querySelector('.like-count');
            const currentLikes = parseInt(likeCount.textContent) || 0;
            likeCount.textContent = currentLikes + 1;
        });
    });

    // Função para comentar no post
    commentButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userProfile = checkUserLoggedIn();

            if (!userProfile) {
                alert("Você precisa criar um perfil para comentar.");
                window.location.href = "profile.html"; // Redireciona para a página de perfil
                return;
            }

            const post = button.closest('.post');
            const commentText = prompt("Digite seu comentário:");

            if (commentText) {
                const commentsSection = post.querySelector('.comments');
                const newComment = document.createElement('p');
                newComment.innerHTML = `
                    <img src="${userProfile.profilePicture}" alt="${userProfile.nickname}" class="comment-avatar">
                    <strong>${userProfile.nickname}:</strong> ${commentText}
                `;
                commentsSection.appendChild(newComment);
            }
        });
    });

    // Função para adicionar novos posts dinamicamente
    function addNewPost(userName, userImage, postImage, postContent) {
        const feed = document.querySelector('.feed');
        const newPost = document.createElement('div');
        newPost.classList.add('post');

        newPost.innerHTML = `
            <div class="user-info">
                <img src="${userImage}" alt="${userName}" class="avatar">
                <span class="username">${userName}</span>
            </div>
            <img src="${postImage}" alt="Post Image" class="post-image">
            <div class="post-actions">
                <button class="like-btn">❤️ Like</button>
                <span class="like-count">0</span> <!-- Contador de curtidas -->
                <button class="comment-btn">💬 Comment</button>
            </div>
            <div class="comments">
                <p><strong>User1:</strong> ${postContent}</p>
            </div>
        `;
        
        // Adicionando o novo post ao feed
        feed.appendChild(newPost);

        // Reaplicar os event listeners aos novos botões
        newPost.querySelector('.like-btn').addEventListener('click', function () {
            const likeCount = newPost.querySelector('.like-count');
            const currentLikes = parseInt(likeCount.textContent) || 0;
            likeCount.textContent = currentLikes + 1;
        });
        
        newPost.querySelector('.comment-btn').addEventListener('click', function () {
            const userProfile = checkUserLoggedIn();

            if (!userProfile) {
                alert("Você precisa criar um perfil para comentar.");
                window.location.href = "profile.html"; // Redireciona para a página de perfil
                return;
            }

            const commentText = prompt("Digite seu comentário:");

            if (commentText) {
                const commentsSection = newPost.querySelector('.comments');
                const newComment = document.createElement('p');
                newComment.innerHTML = `
                    <img src="${userProfile.profilePicture}" alt="${userProfile.nickname}" class="comment-avatar">
                    <strong>${userProfile.nickname}:</strong> ${commentText}
                `;
                commentsSection.appendChild(newComment);
            }
        });
    }

    // Exemplo de como adicionar um novo post
    addNewPost("User2", "user2.jpg", "post2.jpg", "Nice photo!");

    // Adicionar perfil de usuário
    document.getElementById('create-profile-btn').addEventListener('click', function () {
        const nickname = prompt("Escolha um nickname:");
        const profilePicture = prompt("Insira a URL da sua foto de perfil:");

        const userProfile = {
            nickname: nickname,
            profilePicture: profilePicture
        };

        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        alert("Perfil criado com sucesso!");
    });
});
// Função para aumentar o número de likes, desabilitando o botão após o clique
function increaseLikes(postId) {
    const likesCount = document.getElementById(`likes-count-${postId}`);
    const likeButton = document.getElementById(`like-btn-${postId}`);

    let currentLikes = parseInt(likesCount.innerText.split(' ')[0].replace(',', '')); // Extraindo o número de likes
    currentLikes++; // Incrementa 1 ao contador de likes
    likesCount.innerText = `${currentLikes.toLocaleString()} Likes`; // Atualiza o contador de likes

    likeButton.disabled = true; // Desabilita o botão de "Like" após o clique
    likeButton.innerText = "❤️ Liked"; // Atualiza o texto do botão para mostrar que já foi curtido
}

function toggleCommentBox(postId) {
    const commentBox = document.getElementById(`comment-box-${postId}`);
    const notification = document.getElementById(`comment-notification-${postId}`);

    // Mostrar barra de comentário e notificação
    commentBox.style.display = "flex";
    notification.style.display = "none"; // Esconde a notificação após clicar no botão

    const commentInput = document.getElementById(`comment-input-${postId}`);
    commentInput.focus(); // Foca no campo de texto para facilitar o comentário
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentsSection = document.getElementById(`comments-${postId}`);

    if (commentInput.value.trim() !== "") {
        const newComment = document.createElement("p");
        newComment.innerHTML = `<strong>YourUsername:</strong> ${commentInput.value}`;
        commentsSection.appendChild(newComment);
        commentInput.value = ""; // Limpa o campo após o envio do comentário
    }
}
