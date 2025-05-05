Feature: Create Option
Como um usuário autenticado
Quero criar uma opção para uma enquete
Para que eu possa adicionar alternativas para votação

Scenario: Criar opção com sucesso
    Given: Dado que o usuário está autenticado via Google
    And: E o usuário tem permissão para criar uma opção
    When: Quando o usuário enviar os dados de uma nova opção para a enquete
    Then: Então o sistema deve criar a nova opção e associá-la à enquete

Scenario: Usuário não encontrado
    Given: Dado que o token JWT contém um email não associado a nenhum usuário
    When: Quando o sistema tentar buscar o usuário
    Then: Então o sistema deve retornar um erro informando que o usuário não foi encontrado

Scenario: Opção inválida
    Given: Dado que os dados da opção não são válidos (exemplo: vazio)
    When: Quando o sistema tentar criar a opção
    Then: Então o sistema deve retornar um erro informando que a opção é inválida
