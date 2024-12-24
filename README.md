# Projeto Microfrontend com Module Federation e Docker

Aplicativo Host Next.js
Aplicativo Remoto Angular
Banco de Dados Postgres

## Estrutura do Projeto

- **apps/host-app**: Contém o aplicativo host.
- **apps/investimentos**: Contém o aplicativo remoto para os investimentos.
- **libs/db**: Contém os esquemas e a configuração do Prisma.
- **Docker**: Contém os arquivos de configuração do Docker Compose.

---

## Inicialização em Produção

### 1. Iniciar Containers

Certifique-se de que o Docker esteja instalado e em execução no seu sistema.
Execute o comando abaixo para iniciar todos os serviços definidos em `./Docker/docker-compose.yml`.

```bash
npm run up-all
```

### 2. Acessar aplicação host

Acesse a aplicação host na url em [http://localhost:3000](http://localhost:3000).

---

## Inicialização para Desenvolvimento

### 1. Instalar dependências

Antes de qualquer coisa, instale as dependências necessárias para o projeto.

```bash
npm install
```

---

### 2. Iniciar Containers

Certifique-se de que o Docker esteja instalado e em execução no seu sistema.

#### Suba os containers do Docker:

Execute o comando abaixo para iniciar o banco de dados definido em `./Docker/docker-compose.yml`.

```bash
npm run up-db
```

---

### 3. Configurar e Inicializar o Prisma

#### Navegue até a pasta do Prisma:

```bash
cd libs/db
```

#### 3.1 Gerar os arquivos do Prisma:

Certifique-se de que as migrações e o cliente Prisma estejam configurados corretamente.

```bash
npx prisma generate
```

#### 3.2 Aplicar as migrações no banco de dados:

```bash
npx prisma migrate dev
```

Se o banco de dados estiver configurado corretamente, as migrações serão aplicadas.

#### 3.3 Verificar o banco de dados:

Para abrir o Prisma Studio e visualizar os dados:

```bash
npx prisma studio
```

---

### 4. Iniciar o Aplicativo Host

Depois de configurar o ambiente, inicie o aplicativo host:

#### Navegue até a pasta do host-app:

```bash
cd apps/host-app
```

#### Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor de desenvolvimento do Next.js será iniciado, e o aplicativo estará disponível em [http://localhost:3000](http://localhost:3000).

---

### 5. Iniciar o Aplicativo Remoto Investimentos

Depois de configurar o ambiente, inicie o aplicativo remoto dos investimentos:

#### Navegue até a pasta do investimentos:

```bash
cd apps/investimentos
```

#### Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O servidor de desenvolvimento do Angular será iniciado, e o aplicativo estará disponível em [http://localhost:3001](http://localhost:3001).
