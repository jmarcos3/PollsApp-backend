Feature: Vote on Poll
Como um usuário autenticado
Quero poder votar em uma opção de enquete
Para que minha escolha seja registrada na plataforma

Scenario: Voto válido
    Given: Dado que o usuário está autenticado via Google
    And: E a opção da enquete existe
    And: E o usuário ainda não votou nessa enquete
    When: Quando o usuário votar em uma opção
    Then: Então o sistema deve registrar o voto com sucesso

Scenario: Usuário não encontrado
    Given: Dado que o token JWT contém um email não associado a nenhum usuário
    When: Quando o sistema tentar buscar o usuário
    Then: Então o sistema deve retornar um erro informando que o usuário não foi encontrado

Scenario: Opção inválida
    Given: Dado que o ID da opção não pertence a nenhuma enquete
    When: Quando o sistema tentar buscar a opção
    Then: Então o sistema deve retornar um erro informando que a opção não foi encontrada

Scenario: Voto duplicado
    Given: Dado que o usuário já votou na enquete
    When: Quando o sistema verificar o histórico de votos
    Then: Então o sistema deve retornar um erro informando que o usuário já votou
