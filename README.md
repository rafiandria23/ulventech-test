# Ulventech Test

Test for Ulventech.

## Tech Stacks

- [Node.js](https://nodejs.org)
- [TypeScript](https://typescriptlang.org)
- [Nx](https://nx.dev)
- [Nest.js](https://nestjs.com)
- [SQLite](https://sqlite.org)
- [Next.js](https://nextjs.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [MUI](https://mui.com)

## Apps

- [API](apps/api/)
- [Web](apps/web/)

## Environment

Environment variables are available in `.env.template` file inside each app.

## Installation

```zsh
# Install Nx CLI
yarn add --global nx

# Install project dependencies
yarn
```

## Development

```zsh
# Run all apps
nx run-many -t serve start
```

## API Docs

API docs is available at `/docs`. For example `http://127.0.0.1:4000/docs`.

## License

[MIT](LICENSE)
