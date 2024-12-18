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

## Passo a Passo de Inicialização

### 1. Instalar dependências

Antes de qualquer coisa, instale as dependências necessárias para o projeto.

#### Na raiz do repositório:

```bash
npm install
```

#### No aplicativo host (apps/host-app):

Entre na pasta do aplicativo host e instale as dependências locais:

```bash
cd apps/host-app
npm install
```

#### No aplicativo Investimentos (apps/investimentos):

Entre na pasta do aplicativo host e instale as dependências locais:

```bash
cd apps/investimentos
npm install
```

---

### 2. Iniciar o Banco de Dados com Docker Compose

O banco de dados é gerenciado via Docker Compose. Certifique-se de que o Docker esteja instalado e em execução no seu sistema.

#### Suba os containers do Docker:

Na pasta **Docker**:

```bash
cd Docker
docker-compose up -d
```

Isso iniciará os serviços definidos no `docker-compose.yml` (incluindo o banco de dados).

#### Verifique os containers em execução:

```bash
docker ps
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

---

## Scripts Importantes

- **Instalar dependências na raiz**:

  ```bash
  npm install
  ```

- **Iniciar containers do Docker**:

  ```bash
  docker-compose up -d
  ```

- **Gerar cliente do Prisma**:

  ```bash
  npx prisma generate
  ```

- **Aplicar migrações do Prisma**:

  ```bash
  npx prisma migrate dev
  ```

- **Abrir Prisma Studio**:

  ```bash
  npx prisma studio
  ```

- **Iniciar o servidor do host-app**:

  ```bash
  npm run dev
  ```

- **Iniciar o servidor do investimentos**:
  ```bash
  npm run start
  ```

---

## Observações

- Certifique-se de que o Docker está configurado corretamente e que os containers foram iniciados antes de rodar o Prisma ou o aplicativo.
- Sempre instale as dependências na raiz antes de instalar dependências em subprojetos.

Se encontrar algum problema, confira os logs do Docker ou do Prisma para diagnóstico.
