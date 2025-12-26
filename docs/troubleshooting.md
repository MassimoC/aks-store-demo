---
layout: default
title: Troubleshooting
nav_order: 6
---

# Troubleshooting Guide

Common issues and solutions for the AKS Store Demo application.

## Table of Contents
- [Docker Compose Issues](#docker-compose-issues)
- [Kubernetes Deployment Issues](#kubernetes-deployment-issues)
- [Azure Deployment Issues](#azure-deployment-issues)
- [Service-Specific Issues](#service-specific-issues)
- [Networking Issues](#networking-issues)
- [Database Issues](#database-issues)
- [AI Service Issues](#ai-service-issues)

## Docker Compose Issues

### Port Already in Use

**Symptom**: Error message like "port is already allocated"

**Solution**:
```bash
# Find and stop conflicting process
lsof -i :8080  # Find process using port 8080
kill -9 [PID]  # Kill the process

# Or change port in docker-compose.yml
ports:
  - "8081:8080"  # Use different host port
```

### Containers Not Starting

**Symptom**: Containers exit immediately or show error status

**Solution**:
```bash
# Check logs
docker compose logs [service-name]

# Common fixes:
docker compose down
docker compose pull  # Pull latest images
docker compose up --build  # Rebuild images
```

### Out of Memory

**Symptom**: Services crash with OOM errors

**Solution**:
1. Increase Docker Desktop memory allocation (Settings → Resources → Memory)
2. Reduce number of running services
3. Stop unused containers: `docker system prune -a`

### Volume Permission Issues

**Symptom**: Permission denied errors when accessing volumes

**Solution**:
```bash
# Fix permissions
chmod -R 755 /path/to/volume

# Or run with user flag in docker-compose.yml
user: "${UID}:${GID}"
```

### Network Issues Between Containers

**Symptom**: Services can't communicate

**Solution**:
```bash
# Verify network
docker network ls
docker network inspect aks-store-demo_default

# Recreate network
docker compose down
docker network prune
docker compose up
```

## Kubernetes Deployment Issues

### Pods Not Starting

**Symptom**: Pods stuck in `Pending` or `CrashLoopBackOff`

**Solution**:
```bash
# Check pod status
kubectl get pods -n pets
kubectl describe pod [POD_NAME] -n pets

# Check events
kubectl get events -n pets --sort-by='.lastTimestamp'

# Check logs
kubectl logs [POD_NAME] -n pets
kubectl logs [POD_NAME] -n pets --previous  # Previous container logs
```

Common causes:
- **Insufficient resources**: Add more nodes or reduce resource requests
- **Image pull errors**: Verify image name and registry access
- **Configuration errors**: Check ConfigMaps and Secrets

### Image Pull Errors

**Symptom**: `ImagePullBackOff` or `ErrImagePull`

**Solution**:
```bash
# Verify image exists
docker pull ghcr.io/azure-samples/aks-store-demo/order-service:latest

# Check image pull secrets (if using private registry)
kubectl get secrets -n pets
kubectl create secret docker-registry regcred \
  --docker-server=[REGISTRY] \
  --docker-username=[USERNAME] \
  --docker-password=[PASSWORD]

# Add to pod spec
imagePullSecrets:
- name: regcred
```

### External IP Pending

**Symptom**: LoadBalancer service shows `<pending>` for external IP

**Solution**:

For **minikube**:
```bash
minikube tunnel
```

For **kind**:
```bash
# Use kubectl port-forward instead
kubectl port-forward -n pets service/store-front 8080:80
```

For **AKS**:
- Wait 2-5 minutes for Azure to provision load balancer
- Check Azure Portal for any quota issues
- Verify subscription has available public IPs

### Pod Restarts

**Symptom**: Pods restarting frequently

**Solution**:
```bash
# Check restart count
kubectl get pods -n pets

# Check logs for errors
kubectl logs [POD_NAME] -n pets --previous

# Check resource usage
kubectl top pods -n pets

# Increase resource limits
resources:
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Service Not Reachable

**Symptom**: Can't access service via LoadBalancer IP

**Solution**:
```bash
# Verify service
kubectl get service -n pets
kubectl describe service store-front -n pets

# Check endpoints
kubectl get endpoints -n pets

# Test from within cluster
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -n pets \
  -- curl http://store-front:80

# Check network policies
kubectl get networkpolicies -n pets
```

## Azure Deployment Issues

### Authentication Failures

**Symptom**: `azd` or `az` commands fail with auth errors

**Solution**:
```bash
# Re-authenticate
azd auth login --use-device-code
az login

# Verify authentication
az account show
azd auth login --check-status

# Set correct subscription
az account set --subscription [SUBSCRIPTION_ID]
```

### Insufficient Quota

**Symptom**: Deployment fails with quota exceeded errors

**Solution**:
1. Request quota increase in Azure Portal (Support → New support request)
2. Choose different region with available quota
3. Reduce VM size: `azd env set AKS_NODE_POOL_VM_SIZE Standard_D2s_v4`

### Resource Provider Not Registered

**Symptom**: Error about unregistered resource provider

**Solution**:
```bash
# Register required providers
az provider register --namespace Microsoft.ContainerService
az provider register --namespace Microsoft.KeyVault
az provider register --namespace Microsoft.CognitiveServices
az provider register --namespace Microsoft.ServiceBus
az provider register --namespace Microsoft.DocumentDB
az provider register --namespace Microsoft.OperationalInsights

# Check registration status
az provider show -n Microsoft.ContainerService --query "registrationState"
```

### Terraform/Bicep Deployment Failures

**Symptom**: Infrastructure provisioning fails

**Solution**:
```bash
# Check detailed error in Azure Portal
# Go to Resource Group → Deployments

# Clean up and retry
azd down --force --purge
azd up

# Check Terraform state
cd infra/terraform
terraform init
terraform plan
```

### Workload Identity Issues

**Symptom**: Services can't access Azure resources

**Solution**:
```bash
# Verify workload identity is enabled
az aks show --resource-group [RG] --name [CLUSTER] \
  --query "oidcIssuerProfile.enabled"

# Check service account annotations
kubectl describe serviceaccount [SA_NAME] -n pets

# Verify federated identity
az identity federated-credential list \
  --identity-name [IDENTITY] \
  --resource-group [RG]
```

### Network Connectivity Issues

**Symptom**: Can't access services after deployment

**Solution**:
```bash
# Get service endpoints
azd env get-value SERVICE_STORE_FRONT_ENDPOINT_URL

# Check AKS network configuration
az aks show --resource-group [RG] --name [CLUSTER] \
  --query "networkProfile"

# Verify NSG rules don't block traffic
az network nsg list --resource-group [RG]
```

## Service-Specific Issues

### Order Service Issues

**Problem**: Orders not being created

**Solution**:
```bash
# Check order service logs
kubectl logs -l app=order-service -n pets

# Verify RabbitMQ connection
kubectl exec -it [ORDER_SERVICE_POD] -n pets -- env | grep RABBIT

# Test endpoint
curl -X POST http://[SERVICE_IP]:3000/order \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"1","quantity":1}]}'
```

### Product Service Issues

**Problem**: Products not loading

**Solution**:
```bash
# Check product service logs
kubectl logs -l app=product-service -n pets

# Verify database connection
kubectl exec -it [PRODUCT_SERVICE_POD] -n pets -- env | grep DATABASE

# Test endpoint
curl http://[SERVICE_IP]:3002/product
```

### Makeline Service Issues

**Problem**: Orders stuck in queue

**Solution**:
```bash
# Check makeline service logs
kubectl logs -l app=makeline-service -n pets

# Check queue depth
# Access RabbitMQ management UI at http://localhost:15672
kubectl port-forward service/rabbitmq 15672:15672 -n pets

# Verify queue processing
kubectl logs -l app=makeline-service -n pets --tail=100 -f
```

## Networking Issues

### DNS Resolution Failures

**Symptom**: Services can't resolve other service names

**Solution**:
```bash
# Verify CoreDNS is running
kubectl get pods -n kube-system | grep coredns

# Test DNS resolution
kubectl run -it --rm debug --image=busybox --restart=Never -n pets \
  -- nslookup order-service

# Check service DNS names
kubectl get services -n pets
# Format: [service-name].[namespace].svc.cluster.local
```

### Connection Timeouts

**Symptom**: Services timeout when connecting to each other

**Solution**:
```bash
# Check service endpoints
kubectl get endpoints -n pets

# Verify pod labels match service selectors
kubectl get pods --show-labels -n pets
kubectl describe service [SERVICE_NAME] -n pets

# Test connectivity
kubectl exec -it [POD_NAME] -n pets -- wget -O- http://[SERVICE]:PORT
```

## Database Issues

### MongoDB Connection Failures

**Symptom**: Services can't connect to MongoDB

**Solution**:
```bash
# Verify MongoDB is running
kubectl get pods -l app=mongodb -n pets

# Check MongoDB logs
kubectl logs -l app=mongodb -n pets

# Test connection
kubectl exec -it [MONGODB_POD] -n pets -- mongosh --eval "db.runCommand({ping:1})"

# Verify connection string
kubectl exec -it [SERVICE_POD] -n pets -- env | grep MONGODB
```

### Database Persistence Issues

**Symptom**: Data lost after pod restart

**Solution**:
```bash
# Verify PersistentVolume is bound
kubectl get pv
kubectl get pvc -n pets

# Check volume mount
kubectl describe pod [POD_NAME] -n pets | grep -A 5 Mounts
```

### Cosmos DB Connection Issues

**Symptom**: Can't connect to Cosmos DB

**Solution**:
```bash
# Verify connection string
azd env get-value AZURE_COSMOS_DB_CONNECTION_STRING

# Test connectivity from pod
kubectl exec -it [POD] -n pets -- curl [COSMOS_ENDPOINT]

# Check firewall rules in Azure Portal
# Cosmos DB → Firewall and virtual networks
```

## AI Service Issues

### OpenAI API Errors

**Symptom**: AI service fails to generate content

**Solution**:
```bash
# Verify API key
kubectl get secret openai-secret -n pets -o yaml

# Check AI service logs
kubectl logs -l app=ai-service -n pets

# Test API key manually
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer [API_KEY]"
```

### Rate Limiting

**Symptom**: 429 Too Many Requests errors

**Solution**:
- Reduce request frequency
- Implement exponential backoff
- Request quota increase from OpenAI
- Use Azure OpenAI for higher limits

### Azure OpenAI Endpoint Issues

**Symptom**: Can't connect to Azure OpenAI

**Solution**:
```bash
# Verify endpoint and deployment
azd env get-value AZURE_OPENAI_ENDPOINT
azd env get-value AZURE_OPENAI_DEPLOYMENT_NAME

# Check workload identity
kubectl describe serviceaccount ai-service -n pets

# Test endpoint
curl [ENDPOINT]/openai/deployments/[DEPLOYMENT]/chat/completions?api-version=2024-02-01 \
  -H "Authorization: Bearer $(az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv)"
```

## General Debugging Steps

### Enable Verbose Logging

```bash
# For kubectl
kubectl logs [POD] -n pets --tail=100 -f

# For azd
azd up --debug

# For docker compose
docker compose logs -f [service]
```

### Check Resource Usage

```bash
# Kubernetes
kubectl top nodes
kubectl top pods -n pets

# Docker
docker stats

# System
df -h  # Disk usage
free -h  # Memory usage
```

### Network Debugging

```bash
# Deploy debug pod
kubectl run -it --rm debug --image=nicolaka/netshoot --restart=Never -n pets -- /bin/bash

# Inside debug pod:
curl http://order-service:3000/health
nslookup order-service
traceroute order-service
```

### Collect Diagnostics

```bash
# Kubernetes
kubectl cluster-info dump > cluster-dump.txt

# Docker
docker compose logs > compose-logs.txt

# AKS
az aks get-credentials --resource-group [RG] --name [CLUSTER]
az aks kollect --resource-group [RG] --name [CLUSTER]
```

## Getting Help

If you're still experiencing issues:

1. **Search existing issues**: [GitHub Issues](https://github.com/Azure-Samples/aks-store-demo/issues)
2. **Check discussions**: [GitHub Discussions](https://github.com/Azure-Samples/aks-store-demo/discussions)
3. **Create new issue**: Include:
   - Environment details (OS, Kubernetes version, etc.)
   - Steps to reproduce
   - Error messages and logs
   - What you've already tried

## Additional Resources

- [Kubernetes Troubleshooting](https://kubernetes.io/docs/tasks/debug/)
- [AKS Troubleshooting](https://learn.microsoft.com/azure/aks/troubleshooting)
- [Docker Troubleshooting](https://docs.docker.com/config/daemon/troubleshoot/)
- [Azure Developer CLI Troubleshooting](https://learn.microsoft.com/azure/developer/azure-developer-cli/troubleshoot)

## Next Steps

- [Return to main documentation](index.md)
- [Review architecture](architecture.md)
- [Check deployment guide](deployment.md)
