# Projeto prático frontend - Processo seletivo PJC-MT
- Aplicação Single Page Application dockerizada, responsiva e feita utilizando Vue.js, Material Design (Vuetify), Axios e Vue Router.
- Consome dados de API Rest em node descrita no projeto prático backend para o mesmo processo seletivo.
- Link do repositório backend: https://github.com/RafaelSantana11/projeto-pratico-pjc-backend.

## Dados de inscrição
- Candidato: Rafael Cândido Santana de Lima
- Vaga: Analista Desenvolvedor

## Preview
<img src="https://i.imgur.com/Tpne0Gd.png" alt="captura1" width="750"/>
<img src="https://i.imgur.com/cVAffxv.png" alt="captura3" width="750"/>
<img src="https://i.imgur.com/2CvnZyh.png" alt="captura2" width="750"/>

## Execução do projeto
Siga os seguintes passos para a execução do projeto, sendo necessária a pré instalação do NPM, do Docker e Docker Compose

### Instalando dependências
```
npm install
```
### Subindo o container Docker
```
docker-compose up
```
### Link para acesso da aplicação no navegador
```
http://localhost:8080
```
### Dados de acesso
```
login: usuario@teste.com
```
```
senha: dxK86g#
```

## O que foi implementado:

* Single Page Application que consume as informações referentes aos álbuns;

* Layout responsivo;

* Tela de autenticação; 

* Tela de pesquisa e detalhamento de um álbum selecionado;

* Listagem inicial dos álbuns paginada;

* Tela de dados do artista;

* Recuperação das imagens feita através links, apontando para o Min.IO Play com tempo de expiração.

## O que não foi implementado:

* Rotinas de testes automatizadas, devido a priorização nos estudos e implementação do upload e recuperação de imagens utilizando Min.Io. (Possuía experiência apenas com Digital Ocean Space, Amazon S3 e Armazenamento de mídia local do lado do servidor)