Teste Facilita Jurídico
Este é um projeto de teste técnico para o Facilita Jurídico.

Instruções de Execução
Back-End:

Pré-requisitos:
Certifique-se de ter o Node.js e o npm instalados em sua máquina.

Instalação:

Clone o repositório:
bash

git clone https://github.com/seu-usuario/teste-facilita-juridico.git
Navegue até o diretório do projeto:
bash

cd teste-facilita-juridico
Instale as dependências:
bash

npm install
Configuração:

Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias, como o banco de dados.

Exemplo de .env:

env

DB_HOST=seu-host
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=seu-banco-de-dados
Execução:
Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando:

bash

npm run dev
O servidor estará acessível em http://localhost:3000.

Rotas:

GET /ping: Verifica se o servidor está ativo.
GET /clients: Retorna a lista de clientes cadastrados.
POST /clients: Adiciona um novo cliente. O corpo da requisição deve seguir o formato fornecido.
GET /clients/coordinates: Retorna as coordenadas dos clientes.
DELETE /clients/:id: Exclui um cliente pelo ID especificado na rota.
Front-End:

Dependências:

json

"dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-toastify": "^10.0.4"
},
"devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.1.4"
}