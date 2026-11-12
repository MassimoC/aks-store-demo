---
layout: default
title: Home
nav_order: 1
---

# Santa App Documentation

Welcome to the AKS Store Demo documentation! This sample demo app consists of a group of containerized microservices that can be easily deployed into an Azure Kubernetes Service (AKS) cluster.

## Overview

The AKS Store Demo is a realistic sample application showcasing:
- **Polyglot architecture** - Multiple programming languages (Go, JavaScript, Rust, Python)
- **Event-driven design** - Using message queues for asynchronous processing
- **Microservices** - Independently deployable services
- **Cloud-native** - Designed for Kubernetes and Azure
- **AI Integration** - Optional integration with Azure OpenAI for product descriptions and images

This application is inspired by the [Red Dog](https://github.com/Azure/reddog-code) demo app and is meant to demonstrate realistic scenarios rather than production-ready code.

## Quick Links

- [Architecture](architecture.html) - Understand the application architecture
- [Deployment Guide](deployment.html) - Deploy to AKS, local Docker, or Azure with azd
- [Development Guide](development.html) - Set up your local development environment
- [Services Documentation](services.html) - Details about each microservice
- [Troubleshooting](troubleshooting.html) - Common issues and solutions

## Key Features

### Microservices Architecture
The application consists of multiple independent services that communicate through REST APIs and message queues:
- Store Front (Vue.js) - Customer-facing web application
- Store Admin (Vue.js) - Employee management interface
- Order Service (Node.js) - Order management API
- Product Service (Rust) - Product catalog API
- Makeline Service (Go) - Order processing worker
- AI Service (Python) - AI-powered content generation
- Virtual Customer/Worker (Rust) - Simulation tools

### Azure Integration
- **Azure Kubernetes Service (AKS)** - Container orchestration
- **Azure OpenAI** - AI-powered product descriptions and images
- **Azure Container Registry** - Container image storage
- **Azure Service Bus** - Enterprise messaging (optional)
- **Azure Cosmos DB** - Globally distributed database (optional)
- **Azure Monitor** - Observability and monitoring (optional)

### Local Development Support
- Docker Compose for local development
- GitHub Codespaces ready
- DevContainer configuration included

## Getting Started

The fastest way to get started is to:

1. **Run locally with Docker Compose**
   ```bash
   git clone https://github.com/Azure-Samples/aks-store-demo.git
   cd aks-store-demo
   docker compose up
   ```

2. **Deploy to AKS with kubectl**
   ```bash
   kubectl create ns pets
   kubectl apply -f https://raw.githubusercontent.com/Azure-Samples/aks-store-demo/main/aks-store-all-in-one.yaml -n pets
   ```

3. **Deploy to Azure with Azure Developer CLI**
   ```bash
   azd auth login
   azd up
   ```

For detailed instructions, see the [Deployment Guide](deployment.html).

## Architecture Diagram

![Application Architecture]({{ site.baseurl }}/assets/demo-arch-with-openai.png)

## Learn More

- [Azure Kubernetes Service Documentation](https://learn.microsoft.com/azure/aks)
- [Kubernetes Learning Path](https://azure.microsoft.com/resources/kubernetes-learning-path)
- [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview)

## Contributing

This project welcomes contributions and suggestions. See [CONTRIBUTING.md](https://github.com/MassimoC/aks-store-demo/blob/main/CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see [LICENSE.md](https://github.com/MassimoC/aks-store-demo/blob/main/LICENSE.md) for details.
