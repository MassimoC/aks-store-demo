---
layout: default
title: Architecture
nav_order: 2
---

# Architecture

This page provides detailed information about the AKS Store Demo architecture, including the services, data flow, and technology stack.

## System Architecture

The AKS Store Demo follows a microservices architecture pattern with event-driven communication between services.

![Architecture Diagram]({{ site.baseurl }}/assets/demo-arch-with-openai.png)

## Services Overview

The application consists of the following services:

### Frontend Services

#### Store Front
- **Technology**: Vue.js 3
- **Purpose**: Customer-facing web application for browsing products and placing orders
- **Port**: 8080
- **Key Features**:
  - Product catalog browsing
  - Shopping cart functionality
  - Order placement
  - Real-time order status updates

#### Store Admin
- **Technology**: Vue.js 3
- **Purpose**: Employee-facing web application for managing orders and products
- **Port**: 8081
- **Key Features**:
  - Order queue monitoring
  - Product management (CRUD operations)
  - Order completion tracking
  - Analytics dashboard

### Backend Services

#### Order Service
- **Technology**: Node.js with Fastify
- **Purpose**: Handles order creation and management
- **Port**: 3000
- **Key Features**:
  - RESTful API for orders
  - Integration with message queue (RabbitMQ/Service Bus)
  - Order validation and persistence
  - Event publishing for order processing

#### Product Service
- **Technology**: Rust with Actix-web
- **Purpose**: Manages product catalog
- **Port**: 3002
- **Key Features**:
  - RESTful API for products
  - CRUD operations on product data
  - Product search and filtering
  - Data persistence (MongoDB/Cosmos DB)
  - Optional AI-generated product descriptions and images

#### Makeline Service
- **Technology**: Go
- **Purpose**: Processes orders from the queue
- **Port**: 3001
- **Key Features**:
  - Consumes messages from queue
  - Order processing logic
  - Status updates
  - Integration with database

#### AI Service (Optional)
- **Technology**: Python with Flask
- **Purpose**: Generates AI-powered content
- **Port**: 5001
- **Key Features**:
  - Product description generation using GPT models
  - Product image generation using DALL-E
  - Integration with Azure OpenAI or OpenAI API
  - RESTful API for AI operations

### Simulation Services

#### Virtual Customer
- **Technology**: Rust
- **Purpose**: Simulates customer behavior by creating orders
- **Key Features**:
  - Automated order creation
  - Configurable order frequency
  - Random product selection
  - Load testing capability

#### Virtual Worker
- **Technology**: Rust
- **Purpose**: Simulates worker behavior by completing orders
- **Key Features**:
  - Automated order completion
  - Configurable processing frequency
  - Simulates realistic processing times

### Data Services

#### MongoDB
- **Purpose**: Primary database for product and order data
- **Port**: 27017
- **Alternative**: Azure Cosmos DB (when deployed to Azure)

#### RabbitMQ
- **Purpose**: Message queue for order processing
- **Port**: 5672 (AMQP), 15672 (Management UI)
- **Alternative**: Azure Service Bus (when deployed to Azure)

## Data Flow

### Order Creation Flow

1. Customer browses products on **Store Front**
2. Customer adds products to cart and places order
3. **Store Front** sends order to **Order Service** via REST API
4. **Order Service** validates and persists order to **MongoDB**
5. **Order Service** publishes order message to **RabbitMQ**
6. **Makeline Service** consumes order message from queue
7. **Makeline Service** processes the order
8. **Makeline Service** updates order status in **MongoDB**
9. **Store Admin** displays order in queue for employee monitoring

### Product Management Flow

1. Employee accesses **Store Admin**
2. Employee creates/updates product via **Product Service** API
3. **Product Service** persists data to **MongoDB**
4. Optionally, **Product Service** calls **AI Service** for descriptions/images
5. **AI Service** generates content using Azure OpenAI/OpenAI
6. Updated product appears in **Store Front** catalog

## Technology Stack

### Languages
- **Go**: Makeline service (concurrent processing)
- **JavaScript/Node.js**: Order service (event-driven APIs)
- **Rust**: Product service, Virtual Customer, Virtual Worker (performance-critical services)
- **Python**: AI service (ML/AI integration)
- **Vue.js**: Store Front, Store Admin (reactive UIs)

### Frameworks
- **Fastify**: Order service web framework
- **Actix-web**: Product service web framework
- **Gin**: Makeline service web framework
- **Flask**: AI service web framework
- **Vue 3 + Vite**: Frontend frameworks

### Data Storage
- **MongoDB**: Document database for products and orders
- **Azure Cosmos DB**: Alternative cloud-native database
- **RabbitMQ**: Message broker for async processing
- **Azure Service Bus**: Alternative enterprise messaging

### AI/ML
- **Azure OpenAI**: GPT models for text generation, DALL-E for images
- **OpenAI API**: Alternative to Azure OpenAI

### Infrastructure
- **Docker**: Containerization
- **Kubernetes**: Orchestration
- **Azure Kubernetes Service (AKS)**: Managed Kubernetes
- **Helm**: Kubernetes package manager
- **Kustomize**: Kubernetes configuration management

### Observability
- **Azure Monitor**: Cloud monitoring
- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization
- **Container Insights**: Container-level monitoring

## Design Patterns

### Microservices Pattern
- Each service is independently deployable
- Services communicate via REST APIs and message queues
- Services can be scaled independently

### Event-Driven Architecture
- Orders are processed asynchronously via message queue
- Loose coupling between services
- Better resilience and scalability

### API Gateway Pattern
- Kubernetes Ingress acts as API gateway
- Single entry point for external traffic
- Load balancing and routing

### Database per Service
- Each service manages its own data
- Reduces coupling between services
- Allows technology-appropriate data storage choices

## Deployment Architectures

### Local Development
- Docker Compose orchestrates all services
- Services communicate via Docker network
- Suitable for development and testing

### Kubernetes (Any Cluster)
- Services deployed as Kubernetes Deployments
- LoadBalancer or Ingress for external access
- ConfigMaps and Secrets for configuration

### Azure Kubernetes Service
- Managed Kubernetes control plane
- Integration with Azure services
- Workload Identity for secure authentication
- Optional: Service Bus, Cosmos DB, OpenAI, Container Registry

## Security Considerations

### Authentication & Authorization
- Workload Identity for Azure service authentication
- API key-based authentication for AI service
- Network policies for service isolation

### Secrets Management
- Kubernetes Secrets for sensitive data
- Azure Key Vault integration (optional)
- Environment variables for configuration

### Network Security
- Internal service communication via cluster DNS
- External access controlled via LoadBalancer/Ingress
- Network policies for traffic control

## Scalability

### Horizontal Scaling
- All services support horizontal pod autoscaling
- Stateless service design enables easy scaling
- Message queue handles load distribution

### Performance Optimization
- Rust services for performance-critical paths
- Asynchronous processing for orders
- Database indexing and query optimization
- CDN for static assets (when deployed to Azure)

## High Availability

- Multiple pod replicas for critical services
- Health checks and automatic restarts
- Message queue for reliable order processing
- Database replication (in production scenarios)

## Next Steps

- [Deploy the application](deployment.html)
- [Set up development environment](development.html)
- [Learn about individual services](services.html)
