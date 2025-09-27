# Sistema de Presença com Geolocalização

API para gerenciamento de eventos, controle de presença via geolocalização e sistema de recompensas por pontos.

---

## Como executar

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPO>
cd <PASTA_DO_REPO>
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/appdb?schema=public"
JWT_SECRET="coloque_um_segredo_forte_aqui"
```

### 4. Definir estrutura do banco

```bash
npx prisma db push
```

### 5. Subir o banco com Docker

```bash
docker compose up -d
```

### 6. Iniciar o projeto

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.
