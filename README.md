# Ulventech Test

[![GitHub Actions Build](https://github.com/rafiandria23/ulventech-test/actions/workflows/ci.yaml/badge.svg)](https://github.com/rafiandria23/ulventech-test/actions/workflows/ci.yaml)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_ulventech-test&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rafiandria23_ulventech-test)

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

Environment variables are available in `.env.example` file inside each app.

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
nx run-many -t serve dev
```

## API Docs

Available at `/`.

## License

[MIT](LICENSE)
