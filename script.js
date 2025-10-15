
// Estado da aplicação
let currentUser = null;
let posts = JSON.parse(localStorage.getItem('heyart_posts') || '[]');
let currentTheme = 'light';
let fontSize = 'normal';
let currentCategory = '';
let fontSizeLevel = 1; // 0=small, 1=normal, 2=large
let postsDisplayed = 6; // Número de posts mostrados inicialmente
let smokeActive = false;
let smokeColor = '#ff6b6b';
let smokeParticles = [];

// Elementos DOM
const authContainer = document.getElementById('authContainer');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authTabs = document.querySelectorAll('.auth-tab');
const navBtns = document.querySelectorAll('.icon-btn');
const pages = document.querySelectorAll('.page');
const accessibilityBtn = document.getElementById('accessibilityBtn');
const accessibilityMenu = document.getElementById('accessibilityMenu');
const themeToggle = document.getElementById('themeToggle');
const fontIncrease = document.getElementById('fontIncrease');
const fontDecrease = document.getElementById('fontDecrease');
const createForm = document.getElementById('createForm');
const profileForm = document.getElementById('profileForm');
const postsHorizontalScroll = document.getElementById('postsHorizontalScroll');
const postsGrid = document.getElementById('postsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const categoryToggle = document.getElementById('categoryToggle');
const categoriesDropdown = document.getElementById('categoriesDropdown');
const searchInput = document.getElementById('searchInput');
const smokeCanvas = document.getElementById('smokeCanvas');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    setupEventListeners();
    loadPosts();
    updateUI();
});

// Event Listeners
function setupEventListeners() {
    // Auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });

    // Auth forms
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    // Navigation
    navBtns.forEach(btn => {
        if (btn.dataset.page) {
            btn.addEventListener('click', () => switchPage(btn.dataset.page));
        }
    });
    
    // Category toggle
    categoryToggle.addEventListener('click', toggleCategoriesMenu);
    
    // Category filters
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            filterByCategory(e.target.dataset.category);
        });
    });
    
    // Search
    searchInput.addEventListener('input', searchPosts);

    // Accessibility
    accessibilityBtn.addEventListener('click', toggleAccessibilityMenu);
    themeToggle.addEventListener('click', toggleTheme);
    fontIncrease.addEventListener('click', increaseFontSize);
    fontDecrease.addEventListener('click', decreaseFontSize);

    // Create post
    createForm.addEventListener('submit', handleCreatePost);
    document.getElementById('postFile').addEventListener('change', handleFileUpload);
    
    // Load more posts
    loadMoreBtn.addEventListener('click', loadMorePosts);
    
    // Lessons type selector
    document.querySelectorAll('.lesson-type-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLessonsType(btn.dataset.type));
    });
    
    // Color bubbles
    document.querySelectorAll('.color-bubble').forEach(bubble => {
        bubble.addEventListener('click', () => toggleSmoke(bubble.dataset.color));
    });
    
    // Setup smoke canvas
    setupSmokeCanvas();

    // Profile
    profileForm.addEventListener('submit', handleUpdateProfile);
    document.getElementById('changeAvatarBtn').addEventListener('click', changeAvatar);
    document.getElementById('logoutProfileBtn').addEventListener('click', handleLogout);

    // Close accessibility menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!accessibilityBtn.contains(e.target) && !accessibilityMenu.contains(e.target)) {
            accessibilityMenu.classList.remove('active');
        }
    });
}

// Authentication
function switchAuthTab(tab) {
    authTabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simular login (em uma aplicação real, isso seria uma chamada para API)
    const users = JSON.parse(localStorage.getItem('heyart_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('heyart_current_user', JSON.stringify(user));
        showApp();
        showMessage('Login realizado com sucesso!', 'success');
    } else {
        showMessage('Email ou senha incorretos!', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    const users = JSON.parse(localStorage.getItem('heyart_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showMessage('Este email já está cadastrado!', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        avatar: 'https://via.placeholder.com/120'
    };
    
    users.push(newUser);
    localStorage.setItem('heyart_users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('heyart_current_user', JSON.stringify(newUser));
    
    showApp();
    showMessage('Conta criada com sucesso!', 'success');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('heyart_current_user');
    showAuth();
    showMessage('Logout realizado com sucesso!', 'success');
}

function loadUserData() {
    const savedUser = localStorage.getItem('heyart_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    } else {
        showAuth();
    }
}

function showAuth() {
    authContainer.classList.remove('hidden');
    appContainer.classList.add('hidden');
}

function showApp() {
    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
    updateUserInfo();
}

// Navigation
function switchPage(pageId) {
    navBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageId}Page`).classList.add('active');
    
    // Fechar menu de categorias se estiver aberto
    categoriesDropdown.classList.remove('active');
    
    if (pageId === 'feed') {
        displayPosts();
    } else if (pageId === 'profile') {
        loadProfileData();
    }
}

// Categories Menu
function toggleCategoriesMenu() {
    categoriesDropdown.classList.toggle('active');
}

function filterByCategory(category) {
    // Atualizar categoria ativa
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.classList.remove('active');
    });
    
    const activeTag = document.querySelector(`[data-category="${category || ''}"]`);
    if (activeTag) {
        activeTag.classList.add('active');
    }
    
    // Filtrar posts
    currentCategory = category || '';
    postsDisplayed = 6; // Reset para mostrar os primeiros posts
    displayPosts();
    
    // Fechar menu
    categoriesDropdown.classList.remove('active');
}

// Search Posts
function searchPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPosts = posts.filter(post => {
        return post.title.toLowerCase().includes(searchTerm) ||
               post.description.toLowerCase().includes(searchTerm) ||
               post.category.toLowerCase().includes(searchTerm) ||
               post.author.name.toLowerCase().includes(searchTerm);
    });
    
    displayFilteredPosts(filteredPosts);
}

// File Upload Handler
function handleFileUpload(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('filePreview');
    
    if (file) {
        console.log('Arquivo selecionado:', file.name, file.type, file.size);
        
        // Verificar tamanho do arquivo (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showMessage('O arquivo deve ter no máximo 10MB!', 'error');
            event.target.value = '';
            return;
        }
        
        // Determinar o tipo baseado no arquivo
        const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name);
        const isPDF = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
        
        if (!isImage && !isPDF) {
            showMessage('Por favor, selecione apenas imagens (JPG, PNG, GIF, etc.) ou arquivos PDF!', 'error');
            event.target.value = '';
            return;
        }
        
        // Atualizar o formato automaticamente
        const formatRadio = document.querySelector(`input[name="format"][value="${isImage ? 'imagem' : 'pdf'}"]`);
        if (formatRadio) {
            formatRadio.checked = true;
        }
        
        // Criar preview do arquivo
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileData = e.target.result;
            
            preview.innerHTML = `
                <div class="file-preview-item">
                    <div class="file-preview-info">
                        ${isImage ? 
                            `<img src="${fileData}" alt="Preview" class="file-preview-image">` :
                            `<div class="file-preview-icon"><i class="fas fa-file-pdf"></i></div>`
                        }
                        <div class="file-preview-details">
                            <span class="file-preview-name">${file.name}</span>
                            <span class="file-preview-size">${formatFileSize(file.size)}</span>
                            <span class="file-preview-type">${isImage ? 'Imagem' : 'PDF'}</span>
                        </div>
                    </div>
                    <button type="button" class="file-remove-btn" onclick="removeFile()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            showMessage('Arquivo carregado com sucesso!', 'success');
        };
        
        reader.onerror = function() {
            showMessage('Erro ao carregar o arquivo. Tente novamente.', 'error');
            event.target.value = '';
            preview.innerHTML = '';
        };
        
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

function removeFile() {
    document.getElementById('postFile').value = '';
    document.getElementById('filePreview').innerHTML = '';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Posts
function handleCreatePost(e) {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const format = document.querySelector('input[name="format"]:checked').value;
    const description = document.getElementById('postDescription').value;
    const fileInput = document.getElementById('postFile');
    
    const newPost = {
        id: Date.now(),
        title,
        category,
        format,
        description,
        author: currentUser,
        createdAt: new Date().toISOString(),
        file: null
    };
    
    // Se há um arquivo, processar
    if (fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            newPost.file = {
                name: file.name,
                type: file.type,
                data: e.target.result
            };
            
            posts.unshift(newPost);
            savePosts();
            
            createForm.reset();
            document.getElementById('filePreview').innerHTML = '';
            switchPage('feed');
            showMessage('Postagem criada com sucesso!', 'success');
        };
        
        reader.readAsDataURL(file);
    } else {
        posts.unshift(newPost);
        savePosts();
        
        createForm.reset();
        switchPage('feed');
        showMessage('Postagem criada com sucesso!', 'success');
    }
}

function loadPosts() {
    const savedPosts = localStorage.getItem('heyart_posts');
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    } else {
        posts = [];
    }
    displayPosts();
}

function savePosts() {
    localStorage.setItem('heyart_posts', JSON.stringify(posts));
}

function displayPosts() {
    let filteredPosts = posts;
    
    // Filtrar por categoria se selecionada
    if (currentCategory) {
        filteredPosts = posts.filter(post => post.category === currentCategory);
    }
    
    displayFilteredPosts(filteredPosts);
}

function displayFilteredPosts(filteredPosts) {
    if (filteredPosts.length === 0) {
        postsHorizontalScroll.innerHTML = `
            <div class="empty-feed">
                <i class="fas fa-palette"></i>
                <h3>Nenhuma postagem encontrada</h3>
                <p>Seja o primeiro a compartilhar sua arte!</p>
            </div>
        `;
        postsGrid.innerHTML = '';
        loadMoreBtn.classList.add('hidden');
        return;
    }
    
    // Exibir posts horizontais (estilo Netflix)
    const horizontalPosts = filteredPosts.slice(0, Math.min(6, filteredPosts.length));
    postsHorizontalScroll.innerHTML = horizontalPosts.map(post => createPostCardHorizontal(post)).join('');
    
    // Exibir posts verticais (grid)
    displayVerticalPosts(filteredPosts);
    
    setupPostEventListeners();
}

function displayVerticalPosts(filteredPosts) {
    const verticalPosts = filteredPosts.slice(0, postsDisplayed);
    postsGrid.innerHTML = verticalPosts.map(post => createPostCard(post)).join('');
    
    // Mostrar/esconder botão "Ver Mais"
    if (filteredPosts.length > postsDisplayed) {
        loadMoreBtn.classList.remove('hidden');
    } else {
        loadMoreBtn.classList.add('hidden');
    }
    
    setupPostEventListeners();
}

function loadMorePosts() {
    postsDisplayed += 6;
    let filteredPosts = posts;
    
    if (currentCategory) {
        filteredPosts = posts.filter(post => post.category === currentCategory);
    }
    
    displayVerticalPosts(filteredPosts);
}

function createPostCardHorizontal(post) {
    const isOwner = currentUser && currentUser.id === post.author.id;
    const formatIcon = post.format === 'imagem' ? 'fas fa-image' : 'fas fa-file-pdf';
    
    // Renderizar arquivo se existir
    let fileContent = '';
    if (post.file) {
        if (post.file.type.startsWith('image/')) {
            fileContent = `
                <div class="post-file">
                    <img src="${post.file.data}" alt="${post.file.name}" class="post-image">
                </div>
            `;
        } else if (post.file.type === 'application/pdf') {
            fileContent = `
                <div class="post-file">
                    <div class="post-pdf">
                        <i class="fas fa-file-pdf"></i>
                        <span>${post.file.name}</span>
                        <a href="${post.file.data}" download="${post.file.name}" class="download-btn">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    return `
        <div class="post-card-horizontal">
            <div class="post-header">
                <div class="post-author">
                    <img src="${post.author.avatar}" alt="${post.author.name}">
                    <div class="post-author-info">
                        <h4>${post.author.name}</h4>
                        <span>${formatDate(post.createdAt)}</span>
                    </div>
                </div>
                ${isOwner ? `
                    <div class="post-menu">
                        <button class="post-menu-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="post-menu-dropdown">
                            <button class="edit-post" data-post-id="${post.id}">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="delete-post" data-post-id="${post.id}">
                                <i class="fas fa-trash"></i> Excluir
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-category">${post.category}</span>
                ${fileContent}
                <p class="post-description">${post.description}</p>
                <div class="post-format">
                    <i class="${formatIcon}"></i>
                    <span>${post.format}</span>
                </div>
            </div>
        </div>
    `;
}

function setupPostEventListeners() {
    // Adicionar event listeners para os menus dos posts
    document.querySelectorAll('.post-menu-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePostMenu(btn);
        });
    });
    
    document.querySelectorAll('.delete-post').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deletePost(parseInt(btn.dataset.postId));
        });
    });
    
    document.querySelectorAll('.edit-post').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            editPost(parseInt(btn.dataset.postId));
        });
    });
}

function createPostCard(post) {
    const isOwner = currentUser && currentUser.id === post.author.id;
    const formatIcon = post.format === 'imagem' ? 'fas fa-image' : 'fas fa-file-pdf';
    
    // Renderizar arquivo se existir
    let fileContent = '';
    if (post.file) {
        if (post.file.type.startsWith('image/')) {
            fileContent = `
                <div class="post-file">
                    <img src="${post.file.data}" alt="${post.file.name}" class="post-image">
                </div>
            `;
        } else if (post.file.type === 'application/pdf') {
            fileContent = `
                <div class="post-file">
                    <div class="post-pdf">
                        <i class="fas fa-file-pdf"></i>
                        <span>${post.file.name}</span>
                        <a href="${post.file.data}" download="${post.file.name}" class="download-btn">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
            `;
        }
    }
    
    return `
        <div class="post-card">
            <div class="post-header">
                <div class="post-author">
                    <img src="${post.author.avatar}" alt="${post.author.name}">
                    <div class="post-author-info">
                        <h4>${post.author.name}</h4>
                        <span>${formatDate(post.createdAt)}</span>
                    </div>
                </div>
                ${isOwner ? `
                    <div class="post-menu">
                        <button class="post-menu-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="post-menu-dropdown">
                            <button class="edit-post" data-post-id="${post.id}">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="delete-post" data-post-id="${post.id}">
                                <i class="fas fa-trash"></i> Excluir
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-category">${post.category}</span>
                ${fileContent}
                <p class="post-description">${post.description}</p>
                <div class="post-format">
                    <i class="${formatIcon}"></i>
                    <span>${post.format}</span>
                </div>
            </div>
        </div>
    `;
}

function togglePostMenu(btn) {
    const dropdown = btn.nextElementSibling;
    const isActive = dropdown.classList.contains('active');
    
    // Fechar todos os menus
    document.querySelectorAll('.post-menu-dropdown').forEach(menu => {
        menu.classList.remove('active');
    });
    
    // Abrir o menu clicado se não estava ativo
    if (!isActive) {
        dropdown.classList.add('active');
    }
}

function deletePost(postId) {
    if (confirm('Tem certeza que deseja excluir esta postagem?')) {
        posts = posts.filter(post => post.id !== postId);
        savePosts();
        displayPosts();
        showMessage('Postagem excluída com sucesso!', 'success');
    }
}

function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postCategory').value = post.category;
        document.querySelector(`input[name="format"][value="${post.format}"]`).checked = true;
        document.getElementById('postDescription').value = post.description;
        
        // Remover o post original e será criado novamente com os novos dados
        posts = posts.filter(p => p.id !== postId);
        
        switchPage('create');
        showMessage('Post carregado para edição!', 'info');
    }
}



// Lessons Type Switcher
function switchLessonsType(type) {
    // Update active button
    document.querySelectorAll('.lesson-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Show/hide sections
    document.querySelectorAll('.lessons-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(`${type}Section`).classList.remove('hidden');
}

// Smoke Effect
function setupSmokeCanvas() {
    const canvas = smokeCanvas;
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (smokeActive) {
            createSmokeParticle(mouseX, mouseY);
        }
    });
    
    function createSmokeParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            size: Math.random() * 10 + 5,
            speedX: (Math.random() - 0.5) * 2,
            speedY: Math.random() * -3 - 1,
            opacity: 1,
            life: 100,
            color: smokeColor
        };
        
        smokeParticles.push(particle);
    }
    
    function updateSmoke() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
            const particle = smokeParticles[i];
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size += 0.2;
            particle.opacity -= 0.01;
            particle.life--;
            
            if (particle.life <= 0 || particle.opacity <= 0) {
                smokeParticles.splice(i, 1);
                continue;
            }
            
            ctx.save();
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        requestAnimationFrame(updateSmoke);
    }
    
    updateSmoke();
}

function toggleSmoke(color) {
    if (color === 'white') {
        smokeActive = false;
        smokeParticles = [];
        showMessage('Efeito de fumaça desativado', 'info');
    } else {
        smokeActive = true;
        smokeColor = color;
        showMessage('Efeito de fumaça ativado!', 'success');
    }
}

// Profile
function loadProfileData() {
    if (currentUser) {
        document.getElementById('profileNameInput').value = currentUser.name;
        document.getElementById('profileEmailInput').value = currentUser.email;
        document.getElementById('profilePasswordInput').value = '';
    }
}

function handleUpdateProfile(e) {
    e.preventDefault();
    
    const name = document.getElementById('profileNameInput').value;
    const email = document.getElementById('profileEmailInput').value;
    const password = document.getElementById('profilePasswordInput').value;
    
    // Verificar se o email já existe (exceto o usuário atual)
    const users = JSON.parse(localStorage.getItem('heyart_users') || '[]');
    const emailExists = users.find(u => u.email === email && u.id !== currentUser.id);
    
    if (emailExists) {
        showMessage('Este email já está sendo usado por outro usuário!', 'error');
        return;
    }
    
    // Atualizar dados do usuário atual
    currentUser.name = name;
    currentUser.email = email;
    if (password) {
        currentUser.password = password;
    }
    
    // Atualizar na lista de usuários
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('heyart_users', JSON.stringify(users));
    }
    
    // Atualizar usuário atual
    localStorage.setItem('heyart_current_user', JSON.stringify(currentUser));
    
    // Atualizar posts do usuário
    posts = posts.map(post => {
        if (post.author.id === currentUser.id) {
            post.author = { ...currentUser };
        }
        return post;
    });
    savePosts();
    
    updateUserInfo();
    showMessage('Perfil atualizado com sucesso!', 'success');
}

function changeAvatar() {
    if (!currentUser) return;
    
    // Criar input de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // Verificar se é uma imagem
            if (!file.type.startsWith('image/')) {
                showMessage('Por favor, selecione apenas arquivos de imagem!', 'error');
                return;
            }
            
            // Verificar tamanho do arquivo (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showMessage('A imagem deve ter no máximo 5MB!', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageDataUrl = e.target.result;
                
                // Atualizar avatar do usuário atual
                currentUser.avatar = imageDataUrl;
                
                // Salvar no localStorage
                try {
                    // Atualizar na lista de usuários
                    const users = JSON.parse(localStorage.getItem('heyart_users') || '[]');
                    const userIndex = users.findIndex(u => u.id === currentUser.id);
                    if (userIndex !== -1) {
                        users[userIndex] = { ...currentUser };
                        localStorage.setItem('heyart_users', JSON.stringify(users));
                    }
                    
                    // Atualizar usuário atual
                    localStorage.setItem('heyart_current_user', JSON.stringify(currentUser));
                    
                    // Atualizar posts do usuário
                    posts = posts.map(post => {
                        if (post.author.id === currentUser.id) {
                            post.author = { ...currentUser };
                        }
                        return post;
                    });
                    savePosts();
                    
                    // Atualizar interface
                    updateUserInfo();
                    displayPosts();
                    
                    showMessage('Avatar alterado com sucesso!', 'success');
                } catch (error) {
                    console.error('Erro ao alterar avatar:', error);
                    showMessage('Erro ao alterar avatar. Tente novamente.', 'error');
                }
            };
            
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
}

function updateUserInfo() {
    if (currentUser) {
        document.getElementById('headerAvatar').src = currentUser.avatar;
        document.getElementById('profileAvatar').src = currentUser.avatar;
        document.getElementById('profileName').textContent = currentUser.name;
    }
}

// Accessibility
function toggleAccessibilityMenu() {
    accessibilityMenu.classList.toggle('active');
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Modo Claro';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Modo Escuro';
    }
    
    localStorage.setItem('heyart_theme', currentTheme);
}

function increaseFontSize() {
    if (fontSizeLevel < 2) {
        fontSizeLevel++;
        updateFontSize();
    }
}

function decreaseFontSize() {
    if (fontSizeLevel > 0) {
        fontSizeLevel--;
        updateFontSize();
    }
}

function updateFontSize() {
    const sizes = ['font-small', 'font-normal', 'font-large'];
    const sizeNames = ['small', 'normal', 'large'];
    
    // Remove todas as classes de tamanho
    document.body.classList.remove('font-small', 'font-normal', 'font-large');
    
    // Adiciona a classe atual
    document.body.classList.add(sizes[fontSizeLevel]);
    fontSize = sizeNames[fontSizeLevel];
    
    // Salvar preferência
    localStorage.setItem('heyart_font_size', fontSizeLevel.toString());
}

// Utilities
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'hoje';
    } else if (diffDays === 2) {
        return 'ontem';
    } else if (diffDays <= 7) {
        return `${diffDays - 1} dias atrás`;
    } else {
        return date.toLocaleDateString('pt-BR');
    }
}

function showMessage(message, type = 'info') {
    // Remover mensagem anterior se existir
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Estilos inline para a mensagem
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

// Adicionar estilos das animações das mensagens
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyles);

function updateUI() {
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('heyart_theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            const icon = themeToggle.querySelector('i');
            const text = themeToggle.querySelector('span');
            icon.className = 'fas fa-sun';
            text.textContent = 'Modo Claro';
        }
    }
    
    // Carregar tamanho de fonte salvo
    const savedFontSize = localStorage.getItem('heyart_font_size');
    if (savedFontSize) {
        fontSizeLevel = parseInt(savedFontSize);
        updateFontSize();
    }
}

// Fechar menus ao clicar fora - atualizado para nova interface
document.addEventListener('click', (e) => {
    // Fechar menu de posts
    if (!e.target.closest('.post-menu')) {
        document.querySelectorAll('.post-menu-dropdown').forEach(menu => {
            menu.classList.remove('active');
        });
    }
    
    // Fechar menu de categorias
    if (!e.target.closest('#categoryToggle') && !e.target.closest('.categories-dropdown')) {
        categoriesDropdown.classList.remove('active');
    }
});
