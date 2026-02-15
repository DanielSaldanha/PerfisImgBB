// ==================== THEME MANAGER ====================
class ThemeManager {
    constructor() {
        this.themeKey = 'theme-preference';
        this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem(this.themeKey);
        const prefersDark = this.darkModeQuery.matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.setTheme(theme);
        document.getElementById('themeToggle').addEventListener('click', () => this.toggle());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.themeKey, theme);
    }

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ==================== PROFILE API ====================
class ProfileAPI {
    constructor(baseURL = 'http://localhost:3000') {
        this.baseURL = baseURL;
    }

    async getPerfil(id) {
        try {
            const response = await fetch(`${this.baseURL}/perfil/${id}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Perfil não encontrado');
                } else if (response.status === 400) {
                    throw new Error('ID inválido');
                } else {
                    throw new Error('Erro ao buscar perfil');
                }
            }

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

// ==================== UI MANAGER ====================
class UIManager {
    constructor() {
        this.perfilInput = document.getElementById('perfilInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.perfilContainer = document.getElementById('perfilContainer');
        this.emptyState = document.getElementById('emptyState');
        this.api = new ProfileAPI();

        this.attachListeners();
    }

    attachListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.perfilInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }

    async handleSearch() {
        const id = this.perfilInput.value.trim();
        
        if (!id) {
            this.showError('Por favor, digite um ID válido');
            return;
        }

        await this.fetchAndDisplayPerfil(id);
    }

    async fetchAndDisplayPerfil(id) {
        this.setLoading(true);
        this.hideError();

        try {
            const perfil = await this.api.getPerfil(id);
            this.displayPerfil(perfil);
        } catch (error) {
            this.showError(error.message);
            this.hidePerfilContainer();
        } finally {
            this.setLoading(false);
        }
    }

    displayPerfil(perfil) {
        document.getElementById('perfilNome').textContent = perfil.nome;
        document.getElementById('perfilProfissao').textContent = perfil.profissao;
        document.getElementById('perfilCargo').textContent = perfil.cargo;
        document.getElementById('perfilId').textContent = `#${perfil.id}`;
        document.getElementById('perfilImage').src = perfil.caminhoImagem;
        document.getElementById('perfilImage').alt = perfil.nome;

        this.showPerfilContainer();
        this.hideEmptyState();
    }

    showError(message) {
        this.error.textContent = message;
        this.error.classList.remove('hidden');
    }

    hideError() {
        this.error.classList.add('hidden');
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.loading.classList.remove('hidden');
        } else {
            this.loading.classList.add('hidden');
        }
    }

    showPerfilContainer() {
        this.perfilContainer.classList.remove('hidden');
    }

    hidePerfilContainer() {
        this.perfilContainer.classList.add('hidden');
    }

    showEmptyState() {
        this.emptyState.classList.remove('hidden');
    }

    hideEmptyState() {
        this.emptyState.classList.add('hidden');
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new UIManager();
});
