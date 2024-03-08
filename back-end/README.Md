Teste Facilita Jurídico
Este é um projeto de teste técnico para o Facilita Jurídico.

Instruções de Execução Back-End
Pré-requisitos
Certifique-se de ter o Node.js e o npm instalados em sua máquina.

Instalação
Clone o repositório:

bash
git clone https://github.com/seu-usuario/teste-facilita-juridico.git
Navegue até o diretório do projeto:

bash
cd teste-facilita-juridico
Instale as dependências:

bash
npm install
Configuração
Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente necessárias, como o banco de dados.

Exemplo de .env:

env
DB_HOST=seu-host
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=seu-banco-de-dados
Execução
Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando:


bash
npm run dev
O servidor estará acessível em http://localhost:3000.

Rotas
GET /ping
Verifica se o servidor está ativo.

GET /clients
Retorna a lista de clientes cadastrados.

POST /clients
Adiciona um novo cliente. O corpo da requisição deve seguir o formato:


{
  "name": "client1",
  "email": "client1@gmail.com",
  "phone": "123456789",
  "coordenada_x": 10.0,
  "coordenada_y": -1.0
}
Em caso de sucesso, retorna status 201. Se o e-mail já estiver cadastrado, retorna um erro 409 com a mensagem:

json
{
  "message": "email already registered"
}
GET /clients/coordenates
Retorna as coordenadas dos clientes.

DELETE /clients/:id
Exclui um cliente pelo ID especificado na rota.
