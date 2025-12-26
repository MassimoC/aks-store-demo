---
layout: default
title: Development
nav_order: 4
---

# Development Guide

This guide helps you set up a local development environment for contributing to the AKS Store Demo.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Service Development](#service-development)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Contributing](#contributing)

## Prerequisites

### Required Tools

- **Git**: Version control
- **Docker Desktop**: For containerization and local testing
- **Visual Studio Code**: Recommended IDE (with DevContainer support)

### Language-Specific Tools

Depending on which services you're working on:

#### Node.js Services (order-service)
- Node.js 18+ and npm
- Dependencies: `cd src/order-service && npm install`

#### Go Services (makeline-service)
- Go 1.21+
- Dependencies: `cd src/makeline-service && go mod download`

#### Rust Services (product-service, virtual-customer, virtual-worker)
- Rust 1.70+ with cargo
- Dependencies: `cd src/product-service && cargo build`

#### Python Services (ai-service)
- Python 3.11+
- pip or poetry for dependency management
- Dependencies: `cd src/ai-service && pip install -r requirements.txt`

#### Vue.js Services (store-front, store-admin)
- Node.js 18+ and npm
- Dependencies: `cd src/store-front && npm install`

### Optional Tools

- **kubectl**: For Kubernetes testing
- **Helm**: For chart development
- **Azure CLI**: For Azure integration testing
- **GitHub CLI**: For contributing

## Environment Setup

### Option 1: Using DevContainer (Recommended)

The repository includes DevContainer configuration for a consistent development environment.

1. **Install VS Code and DevContainers extension**
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Open in DevContainer**
   ```bash
   git clone https://github.com/Azure-Samples/aks-store-demo.git
   cd aks-store-demo
   code .
   ```
   
   VS Code will prompt to "Reopen in Container". Click it.

3. **Wait for setup**
   
   The DevContainer will install all required tools automatically.

### Option 2: Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Azure-Samples/aks-store-demo.git
   cd aks-store-demo
   ```

2. **Install tools**
   
   Install the prerequisites listed above for the services you plan to work on.

3. **Verify installation**
   ```bash
   node --version
   go version
   cargo --version
   python --version
   docker --version
   ```

### Option 3: GitHub Codespaces

Open the repository in GitHub Codespaces for a cloud-based development environment:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=648726487)

## Service Development

### Running Individual Services Locally

Each service can be run independently for faster development cycles.

#### Order Service (Node.js)

```bash
cd src/order-service
npm install
npm run dev
```

Access at: http://localhost:3000

API endpoints:
- `GET /health` - Health check
- `POST /order` - Create order
- `GET /order/{id}` - Get order

#### Product Service (Rust)

```bash
cd src/product-service
cargo build
cargo run
```

Access at: http://localhost:3002

API endpoints:
- `GET /health` - Health check
- `GET /product` - List products
- `POST /product` - Create product
- `PUT /product/{id}` - Update product
- `DELETE /product/{id}` - Delete product

#### Makeline Service (Go)

```bash
cd src/makeline-service
go build
go run .
```

Access at: http://localhost:3001

#### AI Service (Python)

```bash
cd src/ai-service
pip install -r requirements.txt

# Set environment variables
export OPENAI_API_KEY=your-api-key
export USE_AZURE_OPENAI=True  # or False
export AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
export AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment

python app.py
```

Access at: http://localhost:5001

#### Store Front (Vue.js)

```bash
cd src/store-front
npm install
npm run dev
```

Access at: http://localhost:8080

#### Store Admin (Vue.js)

```bash
cd src/store-admin
npm install
npm run dev
```

Access at: http://localhost:8081

### Running Full Stack with Docker Compose

For integration testing, run all services together:

```bash
# From repository root
docker compose up

# Run in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### Hot Reload for Development

Modify `docker-compose.yml` to enable hot reload:

```yaml
order-service:
  build: src/order-service
  volumes:
    - ./src/order-service:/app
  command: npm run dev
```

## Project Structure

```
aks-store-demo/
├── src/
│   ├── order-service/       # Node.js order API
│   ├── product-service/     # Rust product API
│   ├── makeline-service/    # Go order processor
│   ├── ai-service/          # Python AI service
│   ├── store-front/         # Vue.js customer UI
│   ├── store-admin/         # Vue.js admin UI
│   ├── virtual-customer/    # Rust order simulator
│   └── virtual-worker/      # Rust worker simulator
├── charts/                  # Helm charts
├── kustomize/              # Kustomize configurations
├── infra/                  # IaC (Terraform & Bicep)
├── docs/                   # Documentation
├── tests/                  # Integration tests
└── docker-compose.yml      # Local development
```

## Testing

### Unit Tests

Each service has its own test suite:

**Node.js (order-service)**
```bash
cd src/order-service
npm test
```

**Rust (product-service)**
```bash
cd src/product-service
cargo test
```

**Go (makeline-service)**
```bash
cd src/makeline-service
go test ./...
```

**Python (ai-service)**
```bash
cd src/ai-service
pytest
```

### Integration Tests

Run integration tests from the repository root:

```bash
# Start services
docker compose up -d

# Run tests
npm test  # or appropriate test command

# Cleanup
docker compose down
```

### End-to-End Tests

**Store Front E2E Tests**
```bash
cd src/store-front
npm run test:e2e
```

## Code Quality

### Linting

Each service has linting configured:

**JavaScript/TypeScript**
```bash
cd src/order-service
npm run lint
npm run lint:fix
```

**Rust**
```bash
cd src/product-service
cargo clippy
cargo fmt --check
```

**Go**
```bash
cd src/makeline-service
go fmt ./...
go vet ./...
```

**Python**
```bash
cd src/ai-service
black .
flake8 .
```

### Formatting

The repository uses Prettier for consistent formatting:

```bash
# From repository root
npx prettier --write "**/*.{js,json,md,yaml,yml}"
```

### Pre-commit Hooks

Set up pre-commit hooks to ensure code quality:

```bash
# Install pre-commit (if not using DevContainer)
pip install pre-commit

# Install hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

## Debugging

### VS Code Debug Configurations

The repository includes VS Code debug configurations for each service.

1. Open service directory in VS Code
2. Press F5 to start debugging
3. Set breakpoints as needed

### Remote Debugging in Kubernetes

Debug services running in Kubernetes:

```bash
# Port forward to service
kubectl port-forward -n pets service/order-service 3000:3000

# Attach debugger to localhost:3000
```

### Docker Debug

Debug containerized services:

```bash
# Run with debugger exposed
docker compose -f docker-compose.yml -f docker-compose.debug.yml up
```

## Environment Variables

Create `.env` files for local development:

**.env.local** (repository root)
```bash
# AI Service
USE_AZURE_OPENAI=True
AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment
OPENAI_API_KEY=your-api-key

# Database
MONGODB_URI=mongodb://localhost:27017/

# Message Queue
RABBITMQ_URI=amqp://localhost:5672
```

## Common Development Tasks

### Adding a New Service

1. Create service directory under `src/`
2. Add Dockerfile
3. Update `docker-compose.yml`
4. Add Kubernetes manifests
5. Update Helm chart
6. Update documentation

### Modifying API Endpoints

1. Update service code
2. Update API documentation
3. Update client code (if applicable)
4. Add/update tests
5. Test locally with Docker Compose

### Adding Dependencies

**Node.js**
```bash
npm install <package>
```

**Rust**
```bash
cargo add <crate>
```

**Go**
```bash
go get <package>
```

**Python**
```bash
pip install <package>
echo "<package>" >> requirements.txt
```

### Database Schema Changes

1. Update schema in service code
2. Test with local MongoDB
3. Document changes
4. Consider migration strategy

## Contributing

### Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add my feature"
   ```
4. **Push to your fork**
   ```bash
   git push origin feature/my-feature
   ```
5. **Create Pull Request**
   
   Go to GitHub and create a PR from your fork

### Commit Message Guidelines

Use conventional commits:

```
feat: add new product filter
fix: resolve order processing bug
docs: update deployment guide
test: add unit tests for order service
chore: update dependencies
```

### Code Review Process

1. Automated checks must pass
2. At least one reviewer approval required
3. Address review feedback
4. Squash commits if needed
5. Merge when approved

### Documentation

Update documentation when:
- Adding new features
- Changing APIs
- Modifying deployment process
- Adding configuration options

## Resources

- [Contributing Guide](../CONTRIBUTING.md)
- [Code of Conduct](../.github/CODE_OF_CONDUCT.md)
- [Security Policy](../SECURITY.md)

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/Azure-Samples/aks-store-demo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Azure-Samples/aks-store-demo/discussions)
- **Documentation**: [Project Documentation](index.md)

## Next Steps

- [Understand the architecture](architecture.md)
- [Deploy the application](deployment.md)
- [Explore service details](services.md)
