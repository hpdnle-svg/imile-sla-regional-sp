# iMile SLA Regional SP — V6.4

## Alterações principais
- Mantido o painel regional.
- Adicionadas 2 telas específicas para print:
  1. **Resumo por Base**
     - Total
     - Entregues
     - Não entregues
     - Em rota
     - Todos os demais status com quantidade e percentual
     - Gráfico da distribuição da base
  2. **Motoristas Ofensores**
     - Ranking por pacotes faltantes
     - Total por motorista
     - Entregues
     - Faltam
     - % faltam
     - % entregue
- Gráfico de performance alterado para barras **lado a lado**: Entregue x Não Entregue.
- Gráfico DSP removido.
- Novo gráfico **Baixas por Hora**, usando o campo `Horário de entrega`.
- Removida a faixa que informava o nome do arquivo importado.
- Cabeçalho alterado para `Supervisor`.

## Supervisor por Base
O relatório fornecido não possui uma coluna de Supervisor/Gestor/Responsável.

Para exibir o nome correto automaticamente, abra `app.js` e procure:

```js
const BASE_SUPERVISORS = {
  "DS VLM": "",
  "DS JDP": "",
  ...
};
```

Preencha uma vez, por exemplo:

```js
"DS VLM": "Daniel Coutinho",
```

Ao selecionar a base, o painel e as telas de print mostrarão o supervisor configurado.

## Como usar
1. Extraia o ZIP.
2. Abra `index.html` no Chrome ou Edge.
3. Clique em **Importar Excel**.
4. Escolha o relatório iMile `.xlsx`.
5. Para envio à base:
   - Abra `Resumo por Base` ou `Motoristas Ofensores`.
   - Escolha a base.
   - Clique em **Imprimir / Salvar PDF** ou tire o print da tela.

A leitura do Excel ocorre localmente no navegador.


## V4 — Salvar como imagem
As telas **Resumo por Base** e **Motoristas Ofensores** agora possuem o botão:

`📸 Salvar imagem PNG`

O sistema captura somente a área do relatório, sem menus ou controles, e baixa uma imagem em alta resolução pronta para envio.

## Usar em outros notebooks
Sim. Basta copiar a pasta do projeto ou o arquivo ZIP para outro computador e abrir `index.html` no Chrome ou Edge.

Como esta versão usa bibliotecas via CDN (XLSX, Chart.js e html2canvas), o notebook precisa ter acesso à internet para carregar essas bibliotecas.

Para uma versão totalmente portátil/offline, as bibliotecas podem ser incluídas dentro da própria pasta do projeto.


## V5 — Performance Geral + Supervisores
- Novo card **Performance Geral** = Entregues ÷ Total.
- Faixas de cor:
  - 0,00% a 79,99%: vermelho
  - 80,00% a 92,99%: amarelo
  - 93,00% a 100,00%: verde
- Incorporado o mapa Base → Supervisor fornecido para a Regional SP.
- Ao selecionar uma base, o cabeçalho e as telas de imagem exibem automaticamente o supervisor correspondente.
- Bases fornecidas sem supervisor continuam exibindo `Não definido`.


## V6.4 — Visual mais claro
- Fundo geral azul-marinho mais claro.
- Cards superiores mais iluminados e com maior contraste.
- Filtros e abas com tons mais claros e destaque visual.
- Painéis de gráficos separados do fundo com camadas mais visíveis.
- Tabelas com cabeçalho destacado.
- Mantidos os 5 cards em uma única linha para telas de notebook/desktop.
- Mantida a regra de Performance Geral:
  - Vermelho: 0,00% a 79,99%
  - Amarelo: 80,00% a 92,99%
  - Verde: 93,00% a 100,00%


## Correção V6.4 — Percentuais
O relatório Excel não possui coluna de porcentagem. Os percentuais são calculados no navegador:

- Performance Geral = Entregues ÷ Total
- % Entregues = Entregues ÷ Total
- % Em rota = Em rota ÷ Total
- % Não entregues = Não entregues ÷ Total

Todos os percentuais agora são exibidos com 2 casas decimais.

Validação com o arquivo de referência:
- Total: 465
- Entregues: 391
- Em rota: 43
- Não entregues: 74
- Performance Geral: 84,09%


## V6.4 — Supervisor + múltiplas bases
- Novo filtro **Supervisor**.
- Ao selecionar um supervisor, o painel seleciona automaticamente todas as bases vinculadas a ele.
- O filtro de Bases virou multiseleção com checkboxes.
- É possível marcar/desmarcar várias bases e comparar apenas as desejadas.
- O gráfico de performance e todos os KPIs respeitam a combinação Supervisor + Bases selecionadas.
- As telas de Resumo por Base e Motoristas Ofensores continuam com seleção individual de base para gerar imagem.


## V6.4 — Correção da importação
- Corrigido um erro de JavaScript introduzido na alteração do filtro multibase.
- O erro impedia o script de inicializar e, por consequência, o botão Importar Excel não executava.
- Após a importação, os filtros Supervisor + Bases são inicializados antes da renderização.
- Adicionada validação para Excel vazio ou sem aba válida.


## V6.4 — Correção da coluna Base
A Base passa a ser extraída exclusivamente da coluna:

`Última estação de leitura` (coluna Z)

A leitura anterior podia usar `Station`, o que gerava divergências nos filtros, supervisores e comparações entre bases.

Agora todos os recursos usam a mesma origem:
- Filtro Supervisor
- Filtro múltiplas Bases
- Performance por Base
- Resumo por Base
- Motoristas Ofensores
- Supervisor vinculado à Base
