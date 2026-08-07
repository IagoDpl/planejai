# Planej.ai: Desenvolvendo um Educador Financeiro com React e IA Generativa

O **Planej.ai** é uma aplicação web de planejamento financeiro pessoal. O usuário preenche um formulário com informações sobre sua renda, gastos e uma meta financeira (como uma viagem ou a compra de um bem), e a aplicação usa inteligência artificial para gerar um diagnóstico personalizado com sugestões práticas, ideias de renda extra e um plano de ação.

Tudo funciona diretamente no navegador: sem backend, sem banco de dados remoto. Os dados são salvos no `localStorage` e as análises são geradas em tempo real pela API do Google Gemini.

---

## Stacks do Projeto

### Dependências de produção

| Pacote                   | Versão  | Finalidade                   |
| ------------------------ | ------- | ---------------------------- |
| `react`                  | ^19.2.4 | Biblioteca principal de UI   |
| `react-dom`              | ^19.2.4 | Renderização React no DOM    |
| `react-router-dom`       | ^7.13.2 | Roteamento client-side (SPA) |
| `tailwindcss`            | ^4.2.2  | Framework de CSS utilitário  |
| `@tailwindcss/vite`      | ^4.2.2  | Plugin Tailwind para Vite    |
| `@fontsource/inter`      | ^5.2.8  | Fonte Inter auto-hospedada   |
| `lucide-react`           | ^1.5.0  | Biblioteca de ícones SVG     |
| `react-loading-skeleton` | ^3.5.0  | Skeletons de carregamento    |

### Dependências de desenvolvimento

| Pacote                             | Versão  | Finalidade                               |
| ---------------------------------- | ------- | ---------------------------------------- |
| `vite`                             | ^8.0.1  | Build tool e dev server                  |
| `typescript`                       | ~5.9.3  | Tipagem estática                         |
| `@vitejs/plugin-react`             | ^6.0.1  | Suporte a React no Vite (Fast Refresh)   |
| `eslint`                           | ^9.39.4 | Linter de código                         |
| `prettier`                         | ^3.8.1  | Formatação de código                     |
| `eslint-plugin-simple-import-sort` | ^12.1.1 | Ordenação automática de imports          |
| `eslint-plugin-unused-imports`     | ^4.4.1  | Remove imports não utilizados            |
| `prettier-plugin-tailwindcss`      | ^0.7.2  | Ordenação automática de classes Tailwind |

---

## Estrutura de Pastas

