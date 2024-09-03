# Sistema de Reserva de Restaurantes

Este projeto é um sistema de reserva de mesas para restaurantes, desenvolvido para facilitar a gestão de reservas online, permitindo que os clientes realizem reservas de forma prática e que o restaurante gerencie a disponibilidade de mesas e horários. O sistema foi desenvolvido utilizando Node.js com Express, fornecendo uma API que será consumida por um frontend.

## Sumário

- [Diagrama de Arquitetura](#diagrama-de-arquitetura)
- [Diagrama de Classes](#diagrama-de-classes)
- [Documentação de Decisões Arquiteturais](#documentação-de-decisões-arquiteturais)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Instalação](#instalação)
- [Uso](#uso)

## Diagrama de Arquitetura

O diagrama de arquitetura do sistema detalha os principais componentes e módulos, além de suas interações. Ele abrange as seguintes camadas:

1. **Frontend:** Interface de usuário que consome a API.
2. **API:** Desenvolvida em Node.js com Express, responsável por gerenciar as requisições e interagir com o banco de dados.
3. **Banco de Dados:** Sistema de gerenciamento de reservas utilizando um banco de dados relacional.

![Diagrama de Arquitetura](path/to/arquitetura.png)

## Diagrama de Classes

O diagrama de classes abaixo mostra as principais classes do sistema, suas propriedades, métodos e as relações entre elas. As classes incluem:

- **Reserva:** Representa uma reserva realizada no sistema.
- **Cliente:** Representa o cliente que faz a reserva.
- **Mesa:** Representa as mesas disponíveis para reserva.
- **Adm:** Gerencia as funcionalidades administrativas, como o controle de disponibilidade.

![Diagrama de Classes](path/to/classes.png)

## Documentação de Decisões Arquiteturais

Durante o desenvolvimento deste sistema, foram tomadas diversas decisões arquiteturais e de projeto, baseadas em critérios de escalabilidade, manutenibilidade e desempenho:

1. **Arquitetura em Camadas:**
   - **Justificativa:** A arquitetura em camadas foi escolhida para separar responsabilidades, facilitando a manutenção e a evolução do sistema. A camada de apresentação (frontend) é separada da lógica de negócios (API) e da camada de dados (Banco de Dados), permitindo uma maior flexibilidade e escalabilidade.

2. **Uso de Node.js com Express:**
   - **Justificativa:** Node.js com Express foi escolhido por sua simplicidade, flexibilidade e grande comunidade de suporte. A combinação permite construir APIs RESTful de forma eficiente e escalável, além de ser altamente compatível com tecnologias modernas de frontend.

3. **Banco de Dados Relacional:**
   - **Justificativa:** Um banco de dados relacional foi utilizado para garantir a integridade e a consistência dos dados, essenciais em um sistema de reservas, onde a precisão na disponibilidade de mesas e horários é crucial.

4. **Padrões de Projeto:**
   - **Justificativa:** Foram utilizados padrões de projeto como o **Singleton** para gerenciar as instâncias de classes que necessitam de controle centralizado e o **Repository** para o acesso aos dados, promovendo a separação das responsabilidades e facilitando a manutenção do código.

## Requisitos Funcionais

- Permitir que clientes realizem reservas online.
- Gerenciar a disponibilidade de mesas e horários.
- Enviar confirmações de reserva aos clientes.
- Permitir o cancelamento ou alteração de reservas.

## Requisitos Não Funcionais

- **Desempenho:** O sistema deve ser capaz de processar múltiplas reservas simultaneamente sem perda de desempenho.
- **Escalabilidade:** O sistema deve ser projetado para suportar futuras expansões.
- **Segurança:** As informações dos clientes devem ser protegidas conforme as melhores práticas de segurança da informação.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-de-reservas.git
