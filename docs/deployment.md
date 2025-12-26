---
layout: default
title: Deployment
nav_order: 3
---

# Deployment Guide

This guide covers all the different ways you can deploy the AKS Store Demo application.

## Table of Contents
- [Quick Start](#quick-start)
- [Local Deployment with Docker Compose](#local-deployment-with-docker-compose)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Azure Deployment with Azure Developer CLI](#azure-deployment-with-azure-developer-cli)
- [GitHub Codespaces](#github-codespaces)

## Quick Start

Choose your deployment method based on your needs:

| Method | Best For | Time | Complexity |
|--------|----------|------|------------|
| Docker Compose | Local development | 5 min | Low |
| Kubernetes (kubectl) | Testing on any K8s cluster | 10 min | Medium |
| Azure Developer CLI | Full Azure deployment | 15-30 min | Medium |
| GitHub Codespaces | Cloud development | 5 min | Low |

## Local Deployment with Docker Compose

The easiest way to run the application locally.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed
- Git installed

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Azure-Samples/aks-store-demo.git
   cd aks-store-demo
   ```

2. **Configure AI Service (Optional)**
   
   Edit `docker-compose.yml` and add your API keys:
   ```yaml
   ai-service:
     environment:
       - USE_AZURE_OPENAI=True  # False for OpenAI
       - AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment-name
       - AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
       - OPENAI_API_KEY=your-api-key
       - OPENAI_ORG_ID=your-org-id  # if using OpenAI
   ```

   Or disable AI service by commenting it out:
   ```yaml
   #  ai-service:
   #    build: src/ai-service
   #    ...
   ```

3. **Start the application**
   ```bash
   docker compose up
   ```

4. **Access the application**
   - Store Front: http://localhost:8080
   - Store Admin: http://localhost:8081
   - RabbitMQ Management: http://localhost:15672 (guest/guest)

5. **Stop the application**
   Press `Ctrl+C` in the terminal, then run:
   ```bash
   docker compose down
   ```

### Quick Start Script

For a simplified deployment without AI service:
```bash
docker compose -f docker-compose-quickstart.yml up
```

## Kubernetes Deployment

Deploy to any Kubernetes cluster (AKS, minikube, kind, etc.).

### Prerequisites
- Kubernetes cluster running
- `kubectl` installed and configured
- Cluster has internet access to pull images

### Basic Deployment

1. **Create namespace**
   ```bash
   kubectl create namespace pets
   ```

2. **Deploy all services**
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/Azure-Samples/aks-store-demo/main/aks-store-all-in-one.yaml -n pets
   ```

3. **Check deployment status**
   ```bash
   kubectl get pods -n pets
   kubectl get services -n pets
   ```

4. **Access the application**
   ```bash
   # Get the external IPs
   kubectl get service store-front -n pets
   kubectl get service store-admin -n pets
   ```
   
   Wait for external IPs to be assigned, then access:
   - Store Front: http://[EXTERNAL-IP]:80
   - Store Admin: http://[EXTERNAL-IP]:80

### Quick Start Deployment

For a simplified deployment without AI and virtual services:
```bash
kubectl apply -f https://raw.githubusercontent.com/Azure-Samples/aks-store-demo/main/aks-store-quickstart.yaml -n pets
```

### Deployment with Ingress

For production-like setup with Ingress controller:
```bash
kubectl apply -f https://raw.githubusercontent.com/Azure-Samples/aks-store-demo/main/aks-store-ingress-quickstart.yaml -n pets
```

### Cleanup
```bash
kubectl delete namespace pets
```

## Azure Deployment with Azure Developer CLI

Deploy the complete solution to Azure with a single command.

### Prerequisites

- Azure subscription with Owner role
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed
- [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd) (azd) version 1.15.0+ installed
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- [Helm](https://helm.sh/docs/intro/install/) installed

### Quick Deployment

1. **Clone the repository**
   ```bash
   git clone https://github.com/Azure-Samples/aks-store-demo.git
   cd aks-store-demo
   ```

2. **Authenticate**
   ```bash
   azd auth login
   az login
   ```

3. **Enable Helm support**
   ```bash
   azd config set alpha.aks.helm on
   ```

4. **Deploy**
   ```bash
   azd up
   ```
   
   You'll be prompted for:
   - Environment name (e.g., "my-aks-demo")
   - Azure subscription
   - Azure region (e.g., "eastus2", "swedencentral")

5. **Get service URLs**
   ```bash
   azd env get-value SERVICE_STORE_FRONT_ENDPOINT_URL
   azd env get-value SERVICE_STORE_ADMIN_ENDPOINT_URL
   ```

### Advanced Configuration

Configure deployment options before running `azd up`:

```bash
# Set Azure region
azd env set AZURE_LOCATION swedencentral

# Deploy Azure Container Registry
azd env set DEPLOY_AZURE_CONTAINER_REGISTRY true

# Deploy Azure OpenAI
azd env set DEPLOY_AZURE_OPENAI true
azd env set AZURE_OPENAI_LOCATION swedencentral

# Deploy DALL-E 3 for image generation
azd env set DEPLOY_IMAGE_GENERATION_MODEL true

# Deploy Azure Service Bus (instead of RabbitMQ)
azd env set DEPLOY_AZURE_SERVICE_BUS true

# Deploy Azure Cosmos DB (instead of MongoDB)
azd env set DEPLOY_AZURE_COSMOSDB true
azd env set AZURE_COSMOSDB_ACCOUNT_KIND GlobalDocumentDB  # or MongoDB

# Deploy observability tools
azd env set DEPLOY_OBSERVABILITY_TOOLS true

# Set AKS node VM size
azd env set AKS_NODE_POOL_VM_SIZE Standard_D2s_v4

# Build containers from source
azd env set BUILD_CONTAINERS true
```

### Infrastructure Options

**Terraform (Default)**
```bash
# Uses infrastructure defined in infra/terraform
azd up
```

**Bicep**
```bash
# Edit azure.yaml and change:
# - infra.provider: bicep
# - infra.path: infra/bicep
azd up
```

### Build from Source

To build container images from source code:

1. **Switch to build-from-source configuration**
   ```bash
   mv azure.yaml azure.yaml.bak
   mv azure-build-from-source.yaml azure.yaml
   ```

2. **Enable ACR and Kustomize**
   ```bash
   azd env set DEPLOY_AZURE_CONTAINER_REGISTRY true
   azd config set alpha.aks.kustomize on
   ```

3. **Deploy**
   ```bash
   azd up
   ```

### Cleanup

Remove all Azure resources:
```bash
azd down --force --purge
```

For more details, see [Azure Developer CLI documentation](azd.md).

## GitHub Codespaces

Run the application in a cloud-based development environment.

### Steps

1. **Open in Codespaces**
   
   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=648726487)

2. **Wait for environment setup**
   
   The Codespace will automatically set up with all required tools.

3. **Start the application**
   ```bash
   docker compose up
   ```

4. **Access the application**
   
   Codespaces will forward ports automatically. Look for notifications about forwarded ports or check the Ports tab.

### Benefits
- No local setup required
- Consistent development environment
- Cloud-based resources
- Pre-configured with all tools

## Helm Deployment

For production Kubernetes deployments using Helm charts.

### Prerequisites
- Helm 3 installed
- Kubernetes cluster configured

### Steps

```bash
# Add the Helm repository (if published)
helm repo add aks-store-demo https://azure-samples.github.io/aks-store-demo

# Update repository
helm repo update

# Install the chart
helm install my-store aks-store-demo/aks-store-demo -n pets --create-namespace

# Or install from local chart
helm install my-store ./charts/aks-store-demo -n pets --create-namespace
```

### Custom Values

Create a `values.yaml` file:
```yaml
aiService:
  enabled: true
  openai:
    endpoint: "https://your-endpoint.openai.azure.com/"
    apiKey: "your-api-key"
    deploymentName: "your-deployment"

serviceType: LoadBalancer

replicaCount:
  orderService: 2
  productService: 2
```

Install with custom values:
```bash
helm install my-store ./charts/aks-store-demo -f values.yaml -n pets --create-namespace
```

## Kustomize Deployment

For GitOps-style deployments with Kustomize.

### Base Deployment

```bash
kubectl apply -k kustomize/base -n pets
```

### With Overlays

```bash
# Development overlay
kubectl apply -k kustomize/overlays/dev -n pets

# Production overlay
kubectl apply -k kustomize/overlays/prod -n pets
```

## Troubleshooting

### Docker Compose Issues

**Ports already in use**
```bash
# Stop conflicting services or change ports in docker-compose.yml
docker compose down
docker ps  # Check for other running containers
```

**Out of memory**
- Increase Docker Desktop memory allocation
- Stop unnecessary containers

### Kubernetes Issues

**Pods not starting**
```bash
# Check pod status
kubectl describe pod [POD_NAME] -n pets

# Check logs
kubectl logs [POD_NAME] -n pets
```

**External IP pending**
- For minikube: `minikube tunnel`
- For cloud providers: Wait a few minutes for LoadBalancer provisioning

**Image pull errors**
- Check internet connectivity
- Verify image names in manifests

### Azure Deployment Issues

**Insufficient quota**
- Request quota increase in Azure Portal
- Choose a different region
- Reduce VM size

**Deployment timeout**
- Check Azure Portal for detailed errors
- Review activity log
- Ensure all required providers are registered

For more troubleshooting tips, see [Troubleshooting Guide](troubleshooting.md).

## Next Steps

- [Learn about the architecture](architecture.md)
- [Set up development environment](development.md)
- [Explore individual services](services.md)
