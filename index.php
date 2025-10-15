<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HeyArt - Compartilhe sua Arte</title>
    <link href="style.css" rel="stylesheet" type="text/css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- Botão de Acessibilidade -->
    <div class="accessibility-btn" id="accessibilityBtn">
        <i class="fas fa-hand-paper"></i>
    </div>

    <!-- Menu de Acessibilidade -->
    <div class="accessibility-menu" id="accessibilityMenu">
        <div class="accessibility-option" id="themeToggle">
            <i class="fas fa-moon"></i>
            <span>Modo Escuro</span>
        </div>
        <div class="accessibility-option" id="fontIncrease">
            <i class="fas fa-plus"></i>
            <span>Aumentar Fonte</span>
        </div>
        <div class="accessibility-option" id="fontDecrease">
            <i class="fas fa-minus"></i>
            <span>Diminuir Fonte</span>
        </div>
    </div>

    <!-- Tela de Login/Cadastro -->
    <div class="auth-container" id="authContainer">
        <div class="auth-card">
            <div class="auth-header">
                <h1>HeyArt</h1>
                <p>Compartilhe sua arte com o mundo</p>
            </div>
            
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Login</button>
                <button class="auth-tab" data-tab="register">Cadastro</button>
            </div>

            <!-- Formulário de Login -->
            <form class="auth-form" id="loginForm">
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" placeholder="Email" id="loginEmail" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Senha" id="loginPassword" required>
                </div>
                <button type="submit" class="auth-btn">Entrar</button>
            </form>

            <!-- Formulário de Cadastro -->
            <form class="auth-form hidden" id="registerForm">
                <div class="input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Nome" id="registerName" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" placeholder="Email" id="registerEmail" required>
                </div>
                <div class="input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Senha" id="registerPassword" required>
                </div>
                <button type="submit" class="auth-btn">Criar Conta</button>
            </form>
        </div>
    </div>

    <!-- App Principal -->
    <div class="app-container hidden" id="appContainer">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="logo">
                    <img src="WhatsApp_Image_2025-09-15_at_9.31.10_AM-removebg-preview (1).png" alt="Logo" class="logo-img" id="logoImg" width="100px">
                </div>
                
                <!-- Barra de Pesquisa -->
                <div class="search-container">
                    <input type="text" placeholder="Pesquisar artes..." class="search-input" id="searchInput">
                    <i class="fas fa-search search-icon"></i>
                </div>
                
                <!-- Ícones da Interface -->
                <nav class="nav-icons">
                    <button class="icon-btn home-btn" data-page="feed" title="Home">
                        <i class="fas fa-home"></i>
                    </button>
                    <button class="icon-btn add-btn" data-page="create" title="Nova Postagem">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="icon-btn category-btn" id="categoryToggle" title="Categorias">
                        <i class="fas fa-bars"></i>
                    </button>
                    <button class="icon-btn lessons-btn" data-page="lessons" title="Aulas">
                        <i class="fas fa-graduation-cap"></i>
                    </button>
                    <button class="icon-btn profile-btn" data-page="profile" title="Perfil">
                        <img src="https://via.placeholder.com/30" alt="Avatar" class="nav-avatar" id="headerAvatar">
                    </button>
                </nav>
            </div>
            
            <!-- Menu de Categorias (dropdown) -->
            <div class="categories-dropdown" id="categoriesDropdown">
                <div class="categories-content">
                    <button class="category-tag active" data-category="">Tudo</button>
                    <button class="category-tag" data-category="surrealismo">Surrealismo</button>
                    <button class="category-tag" data-category="anime-manga">Anime-Mangá</button>
                    <button class="category-tag" data-category="cartoon">Cartoon</button>
                    <button class="category-tag" data-category="expressionismo">Expressionismo</button>
                    <button class="category-tag" data-category="pixel-art">Pixel Art</button>
                </div>
            </div>
        </header>

        <!-- Páginas -->
        <!-- Feed -->
        <div class="page active" id="feedPage">
            <div class="page-header">
            </div>
            
            <div class="posts-netflix-container" id="postsNetflixContainer">
                <div class="posts-horizontal-scroll" id="postsHorizontalScroll">
                    <div class="empty-feed">
                        <i class="fas fa-palette"></i>
                        <h3>Nenhuma postagem ainda</h3>
                        <p>Seja o primeiro a compartilhar sua arte!</p>
                    </div>
                </div>
            </div>
            
            <div class="posts-vertical-container" id="postsVerticalContainer">
                <div class="posts-grid" id="postsGrid">
                </div>
                <button class="load-more-btn hidden" id="loadMoreBtn">
                    <i class="fas fa-plus"></i>
                    Ver Mais
                </button>
            </div>
        </div>

       <div class="page" id="createPage">
    <div class="create-content">
        <div class="user-profile-section">
            <div class="profile-avatar-container">
                <a href="#" class="profile-link">
                    <img src="caminho/para/sua/foto/perfil.jpg" alt="Foto de Perfil" class="profile-avatar-img" />
                    <i class="fas fa-camera-retro camera-icon"></i>
                </a>
            </div>
            <h3 id="userName">Nome do Usuário</h3>
            <a href="login.php" class="change-account-link">Trocar de conta</a>
        </div>
        
        <form class="create-form" id="createForm">
            <div class="form-header">
                <h3>Nova postagem!</h3>
            </div>
            
            <div class="input-group">
                <input type="text" placeholder="Título da sua arte" id="postTitle" required class="form-input">
            </div>
            
            <div class="input-group">
                <select id="postCategory" required class="form-input">
                    <option value="">Categoria</option>
                    <option value="surrealismo">Surrealismo</option>
                    <option value="anime-manga">Anime-Mangá</option>
                </select>
            </div>
            
            <div class="input-group">
                <select id="postFilter" required class="form-input">
                    <option value="">Filtro</option>
                    <option value="filtro1">Filtro 1</option>
                    <option value="filtro2">Filtro 2</option>
                </select>
            </div>
            
            <div class="input-group">
                <select id="postFormat" required class="form-input">
                    <option value="">Formato</option>
                    <option value="imagem">Imagem</option>
                    <option value="pdf">PDF</option>
                </select>
            </div>
            
            <div class="file-upload-container">
                <input type="file" id="postFile" accept="image/*,.pdf" class="file-input">
                <label for="postFile" class="select-file-label">
                    Selecionar arquivo
                </label>
            </div>
            
            <button type="submit" class="post-btn">Postar</button>
        </form>
    </div>
</div>

       <div class="page" id="lessonsPage">
    <div class="page-header">
    </div>

    <div class="lessons-type-selector">
        <button class="lesson-type-btn active" data-type="videos">
            <i class="fas fa-play"></i>
            Vídeo Aulas
        </button>
        <button class="lesson-type-btn" data-type="pdfs">
            <i class="fas fa-file-pdf"></i>
            Material PDF
        </button>
    </div>

    <div class="lessons-container">
        <div class="lessons-section" id="videosSection">
            <div class="lesson-card">
                <div class="lesson-thumbnail">
                    <img src="https://img.youtube.com/vi/ID_DO_VIDEO_1/mqdefault.jpg" alt="Thumbnail da aula de HTML" />
                    <i class="fas fa-play-circle"></i>
                </div>
                <div class="lesson-info">
                    <h4>Introdução ao HTML5</h4>
                    <p>Aprenda os conceitos básicos da linguagem HTML, suas tags e a estrutura de uma página web.</p>
                    <a href="https://www.youtube.com/watch?v=ID_DO_VIDEO_1" target="_blank" class="lesson-type-btn">
                        <i class="fas fa-eye"></i> Assistir
                    </a>
                </div>
            </div>
            
            <div class="lesson-card">
                <div class="lesson-thumbnail">
                    <img src="https://img.youtube.com/vi/ID_DO_VIDEO_2/mqdefault.jpg" alt="Thumbnail da aula de CSS" />
                    <i class="fas fa-play-circle"></i>
                </div>
                <div class="lesson-info">
                    <h4>Fundamentos de CSS3</h4>
                    <p>Dominando estilos e layouts com CSS, seletores, cores e espaçamento.</p>
                    <a href="https://www.youtube.com/watch?v=ID_DO_VIDEO_2" target="_blank" class="lesson-type-btn">
                        <i class="fas fa-eye"></i> Assistir
                    </a>
                </div>
            </div>
        </div>

        <div class="lessons-section hidden" id="pdfsSection">
            <div class="lesson-card">
                <div class="lesson-thumbnail">
                    <i class="fas fa-file-pdf pdf-icon"></i>
                </div>
                <div class="lesson-info">
                    <h4>Ebook de JavaScript</h4>
                    <p>Material completo sobre JavaScript, incluindo variáveis, funções e loops.</p>
                    <a href="https://seusite.com/arquivos/ebook-js.pdf" target="_blank" class="lesson-type-btn">
                        <i class="fas fa-download"></i> Baixar PDF
                    </a>
                </div>
            </div>

            <div class="lesson-card">
                <div class="lesson-thumbnail">
                    <i class="fas fa-file-pdf pdf-icon"></i>
                </div>
                <div class="lesson-info">
                    <h4>Cheat Sheet de Git</h4>
                    <p>Guia rápido com os comandos essenciais do Git para controle de versão.</p>
                    <a href="https://seusite.com/arquivos/git-cheatsheet.pdf" target="_blank" class="lesson-type-btn">
                        <i class="fas fa-download"></i> Baixar PDF
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="load-more-btn-container">
        <button class="load-more-btn">Ver Mais</button>
    </div>
</div>

        <!-- Perfil -->
        <div class="page" id="profilePage">
            <div class="page-header">
            </div>
            
            <div class="profile-content">
                <div class="profile-avatar-section">
                    <div class="avatar-container">
                        <img src="https://via.placeholder.com/120" alt="Avatar" class="profile-avatar" id="profileAvatar">
                        <button class="change-avatar-btn" id="changeAvatarBtn">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    <h3 id="profileName">Nome do Usuário</h3>
                </div>
                
                <form class="profile-form" id="profileForm">
                    <div class="input-group">
                        <label>Nome</label>
                        <input type="text" id="profileNameInput" required>
                    </div>
                    
                    <div class="input-group">
                        <label>Email</label>
                        <input type="email" id="profileEmailInput" required>
                    </div>
                    
                    <div class="input-group">
                        <label>Nova Senha</label>
                        <input type="password" id="profilePasswordInput">
                    </div>
                    
                    <button type="submit" class="save-btn">
                        <i class="fas fa-save"></i>
                        Salvar Alterações
                    </button>
                </form>
                
                <div class="profile-actions">
                    <button type="button" class="logout-profile-btn" id="logoutProfileBtn">
                        <i class="fas fa-sign-out-alt"></i>
                        Sair da Conta
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>HeyArt</h3>
                <p>Compartilhe sua arte com o mundo</p>
            </div>
            <div class="footer-section">
                <h4>Links</h4>
                <ul>
                    <li><a href="#" onclick="switchPage('feed')">Home</a></li>
                    <li><a href="#" onclick="switchPage('create')">Criar</a></li>
                    <li><a href="#" onclick="switchPage('lessons')">Aulas</a></li>
                    <li><a href="#" onclick="switchPage('profile')">Perfil</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Contato</h4>
                <p>contato@heyart.com</p>
                <p>© 2024 HeyArt. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Bolinhas Coloridas -->
    <div class="color-bubbles">
        <div class="color-bubble" data-color="#ff6b6b" style="background: #ff6b6b;"></div>
        <div class="color-bubble" data-color="#4ecdc4" style="background: #4ecdc4;"></div>
        <div class="color-bubble" data-color="#45b7d1" style="background: #45b7d1;"></div>
        <div class="color-bubble" data-color="#f9ca24" style="background: #f9ca24;"></div>
        <div class="color-bubble" data-color="#45b7d1" style="background: #45b7d1;"></div>
        <div class="color-bubble white-bubble" data-color="white" style="background: white; border: 2px solid #ddd;"></div>
    </div>

    <!-- Canvas para fumaça -->
    <canvas id="smokeCanvas"></canvas>

    <script src="script.js"></script>
</body>
</html>