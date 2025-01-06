# Projeto Sindagente Web

Este projeto foi desenvolvido com o objetivo de servir como a página web do sindicato **Sindagente AM**. Ele utiliza tecnologias modernas como Next.js, TypeScript, Tailwind CSS e Prisma para oferecer uma solução robusta e escalável.

---

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web otimizadas.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework de estilização utilitária.
- **Prisma**: ORM para gerenciamento de banco de dados.
- **PNPM**: Gerenciador de pacotes utilizado no projeto.

---

## Funcionalidades Principais

- [**Descrever funcionalidade 1**]
- [**Descrever funcionalidade 2**]
- [**Adicionar outras funcionalidades importantes**]

---

## Como Rodar o Projeto

### Requisitos

- Node.js v16 ou superior
- PNPM instalado globalmente
- Banco de dados configurado (veja o arquivo `.env.example` para detalhes)

### Passos

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd sindagente-web
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no `.env.example`.
   - Atualize as configurações do banco de dados e outros parâmetros necessários.

4. Execute as migrações do banco de dados:
   ```bash
   pnpm prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

6. Abra [http://localhost:3000](http://localhost:3000) no navegador para ver a aplicação.

---

## Configuração do Banco de Dados

O projeto utiliza o Prisma como ORM e suporta diferentes bancos de dados. Certifique-se de configurar a string de conexão no arquivo `.env` corretamente.

---

## Licença

Este é um projeto privado desenvolvido para o Sindicato Sindagente-AM. Todo o código-fonte e conteúdo deste repositório estão protegidos e não devem ser distribuídos ou utilizados sem permissão expressa. Todos os direitos reservados.

