# Meteor.js and React

## Implementação de um aplicativo 'To-do List'

Desenvolvimento de uma aplicação utilizando React (18.2.0) e Meteor (3.1.2), além do Material-UI para estilização.

#### - O que é um To-do?
É uma aplicação para monitoramento de tarefas, onde é possível se manter atualizado sobre o nome, descrição e status das tarefas, além de poder editar/excluir uma task se necessário. A criação de usuários é feita com Meteor Accounts, enquanto o armazenamento e a manutenção das tarefas é feita com a integração ao banco de dados MongoDB proporcionada pelo Meteor. 

Tarefas são compartilhadas entre usuários, se essa permissão for concedida pelo criador da task em questão, assim, permitindo uma dinâmica entre grupos parecida com a metodologia do quadro Kanban.

### Dependencies
```
"dependencies": {
    "@babel/runtime": "^7.20.7",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.7",
    "@mui/material": "^6.4.7",
    "@mui/x-data-grid": "^7.27.3",
    "@mui/x-date-pickers": "^7.28.0",
    "@toolpad/core": "^0.13.0",
    "bcrypt": "^5.1.1",
    "dayjs": "^1.11.13",
    "meteor-node-stubs": "^1.2.5",
    "react": "^18.2.0",
    "react-dom": "^18.3.1",
    "react-router": "^7.3.0",
    "react-router-dom": "^6.3.0"
  },
```
Dependências
Algumas das bibliotecas utilizadas estão listadas a seguir:

React: ```^18.2.0```

React DOM: ```^18.3.1```

React Router: ```^7.3.0```

MUI (Material-UI): ```@mui/material ^6.4.7```, ```@mui/icons-material ^6.4.7```, ```@mui/x-data-grid ^7.27.3```, ```@mui/x-date-pickers ^7.28.0```
Meteor Node Stubs: ````^1.2.5```


## Quick Start

1. Clone o repositório:
```
$ git clone https://github.com/Mateusg2022/advanced_ToDo.git
$ cd advanced_ToDo
```
2. Instale as dependências:
```
npm install
```

5. Rode a aplicação:
```Meteor run```

6.
```
Navegue para o seu localhost digitando http://localhost:3000 no navegador.
```

## Project Structure
```
advanced_ToDo/
│── .meteor/                 
│── .vscode/                
│── client/                  
│   ├── main.css            
│   ├── main.html            
│   ├── main.jsx             
│── imports/                 
│   ├── api/                
│   │   ├── TasksCollection.js      # Definição da coleção mongoDB de tarefas
│   │   ├── tasksMethods.js         # Métodos Meteor para manipulação de tarefas
│   │   ├── TasksPublications.js    # Publicações para assinaturas do Meteor
│   │   ├── UserMethods.js          # Métodos relacionados ao usuário
│   ├── ui/                  # Componentes React
│   │   ├── App.jsx                # Componente principal
│   │   ├── CreateTask.jsx         # Formulário para criar tarefas
│   │   ├── Drawer.jsx             # Menu lateral
│   │   ├── EditProfile.jsx        # Tela de edição de perfil
│   │   ├── EditTask.jsx           # Tela de edição de tarefa
│   │   ├── Home.jsx               # Página inicial
│   │   ├── LoginForm.jsx          # Formulário de login
│   │   ├── MenuAppBar.jsx         # Barra de navegação
│   │   ├── PrivateRoute.jsx       # Controle de rotas privadas
│   │   ├── Profile.jsx            # Página de perfil
│   │   ├── ProfilePic.jsx         # Componente para exibir/mudar foto do perfil
│   │   ├── SignUp.jsx             # Formulário de criação de usuário
│   │   ├── TasksPage.jsx          # Página com lista de tarefas
│   │   ├── ViewTask.jsx           # Visualização detalhada de uma tarefa 
│── server/                  
│   ├── main.js              
│── tests/                   
│── .gitignore              
│── jsconfig.json           
│── package.json             
│── package-lock.json        
│── README.md
```
