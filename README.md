![.NET](https://img.shields.io/badge/.NET-8-blue)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)

# 🚀 Task Manager Fullstack

Sistema completo de gerenciamento de tarefas com autenticação JWT.

## 🎯 Objetivo

Projeto desenvolvido com foco em arquitetura fullstack moderna, autenticação segura e deploy em ambiente cloud.

## 🛠 Tecnologias

### Backend
- ASP.NET Core 8
- Entity Framework Core
- SQL Server
- Postgres SQL (em deploy no Neon)
- JWT Authentication

### Frontend
- React
- TypeScript
- Axios
- Tailwind CSS

  ### Cloud / Deploy
- Render (Backend)
- Vercel (Frontend)
- Neon (Database)

---

## 🔐 Funcionalidades

- Registro de usuário
- Login com JWT
- Logout
- Rotas protegidas
- CRUD completo de tarefas
- Paginação
- Filtro por status
- Busca por título
- Associação User → ToDo

---

## 🌍 Live Demo
- Web: https://task-manager-web-plum.vercel.app/

---

## ⚙️ Como rodar localmente

### Backend

```bash
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🔐 Variáveis de Ambiente

```markdown
O projeto utiliza:

- `Jwt:Key`
- `ConnectionStrings:DefaultConnection`

As credenciais não estão versionadas e devem ser configuradas via User Secrets ou variáveis de ambiente.
```

### Dashboard
![Dashboard](docs/dashboard.jpg)

### Login
![Login](docs/login.jpg)

### Registro
![Registro](docs/register.jpg)

### Dashboard - Login
![Dashboard - Login](docs/dashboard_login.jpg)

### Adicionar Task
![Adicionar](docs/AddTask.jpg)

### Visualizar Task
![Visualizar](docs/visualizarTask.jpg)

### Atualizar Task
![Atualizar](docs/atualizarTask.jpg)
