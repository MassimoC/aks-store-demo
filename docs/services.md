---
layout: default
title: Services
nav_order: 5
---

# Services Documentation

Detailed documentation for each microservice in the AKS Store Demo.

## Table of Contents
- [Order Service](#order-service)
- [Product Service](#product-service)
- [Makeline Service](#makeline-service)
- [AI Service](#ai-service)
- [Store Front](#store-front)
- [Store Admin](#store-admin)
- [Virtual Customer](#virtual-customer)
- [Virtual Worker](#virtual-worker)

## Order Service

**Technology**: Node.js 18+ with Fastify framework

### Purpose
Handles order creation, retrieval, and management. Acts as the primary API for order operations and publishes order events to the message queue.

### Key Features
- RESTful API for order operations
- Order validation and persistence
- Message queue integration (RabbitMQ/Service Bus)
- Health checks and monitoring

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| POST | `/order` | Create a new order |
| GET | `/order/:id` | Get order by ID |
| GET | `/orders` | List all orders |

### Configuration

Environment variables:
```bash
ORDER_QUEUE_HOSTNAME=rabbitmq           # Message queue host
ORDER_QUEUE_PORT=5672                   # Message queue port
ORDER_QUEUE_USERNAME=username           # Queue username
ORDER_QUEUE_PASSWORD=password           # Queue password
ORDER_QUEUE_NAME=orders                 # Queue name
ORDER_QUEUE_RECONNECT_LIMIT=3          # Reconnection attempts
FASTIFY_ADDRESS=0.0.0.0                # Listen address
FASTIFY_PORT=3000                      # Listen port
```

### Request/Response Examples

**Create Order**
```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "1", "quantity": 2},
      {"productId": "2", "quantity": 1}
    ]
  }'
```

Response:
```json
{
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "pending",
  "items": [...],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Dependencies
- Fastify: Web framework
- amqplib: RabbitMQ client
- @azure/service-bus: Azure Service Bus client (optional)
- MongoDB driver: Data persistence

### Source Code
Located in `src/order-service/`

For more details, see [Order Service README](https://github.com/MassimoC/aks-store-demo/blob/main/src/order-service/README.md)

---

## Product Service

**Technology**: Rust with Actix-web framework

### Purpose
Manages the product catalog including CRUD operations. Optionally integrates with AI service for generating product descriptions and images.

### Key Features
- High-performance product API
- CRUD operations on products
- AI-generated content integration
- MongoDB/Cosmos DB integration
- Health checks

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| GET | `/product` | List all products |
| GET | `/product/:id` | Get product by ID |
| POST | `/product` | Create a new product |
| PUT | `/product/:id` | Update product |
| DELETE | `/product/:id` | Delete product |

### Configuration

Environment variables:
```bash
DATABASE_URL=mongodb://mongodb:27017     # Database connection
DATABASE_NAME=storedb                    # Database name
COLLECTION_NAME=products                 # Collection name
AI_SERVICE_URL=http://ai-service:5001   # AI service endpoint (optional)
PORT=3002                                # Listen port
```

### Request/Response Examples

**Create Product**
```bash
curl -X POST http://localhost:3002/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Dog Food",
    "price": 29.99,
    "description": "High-quality nutrition for your pet"
  }'
```

**Generate AI Description**
```bash
curl -X POST http://localhost:3002/product \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Dog Food",
    "price": 29.99,
    "generateDescription": true
  }'
```

Response includes AI-generated description and optional image URL.

### Dependencies
- Actix-web: Web framework
- MongoDB driver: Database client
- Serde: Serialization/deserialization
- Tokio: Async runtime

### Source Code
Located in `src/product-service/`

For more details, see [Product Service README](https://github.com/MassimoC/aks-store-demo/blob/main/src/product-service/README.md)

---

## Makeline Service

**Technology**: Go 1.21+ with Gin framework

### Purpose
Consumes orders from the message queue and processes them. Simulates order fulfillment workflow and updates order status.

### Key Features
- Message queue consumer
- Asynchronous order processing
- Order status updates
- Concurrent processing with Go routines
- Health checks

### Configuration

Environment variables:
```bash
ORDER_QUEUE_URI=amqp://rabbitmq:5672    # Message queue URI
ORDER_QUEUE_USERNAME=username            # Queue username
ORDER_QUEUE_PASSWORD=password            # Queue password
ORDER_QUEUE_NAME=orders                  # Queue name
ORDER_DB_URI=mongodb://mongodb:27017     # Database URI
ORDER_DB_NAME=storedb                    # Database name
ORDER_DB_COLLECTION_NAME=orders          # Collection name
PORT=3001                                # HTTP port for health checks
```

### Processing Logic

1. Consume order message from queue
2. Validate order data
3. Simulate processing time
4. Update order status in database
5. Log completion

### Dependencies
- Gin: Web framework (for health endpoint)
- RabbitMQ client: Message queue
- MongoDB driver: Database operations

### Source Code
Located in `src/makeline-service/`

For more details, see [Makeline Service README](https://github.com/MassimoC/aks-store-demo/blob/main/src/makeline-service/README.md)

---

## AI Service

**Technology**: Python 3.11+ with Flask

### Purpose
Provides AI-powered content generation using Azure OpenAI or OpenAI API. Generates product descriptions and images.

### Key Features
- GPT-based text generation
- DALL-E image generation
- Azure OpenAI and OpenAI support
- RESTful API
- Caching for efficiency

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| POST | `/generate/description` | Generate product description |
| POST | `/generate/image` | Generate product image |

### Configuration

Environment variables:
```bash
USE_AZURE_OPENAI=True                    # Use Azure OpenAI (False for OpenAI)
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4       # Azure deployment name
AZURE_OPENAI_ENDPOINT=https://...        # Azure OpenAI endpoint
OPENAI_API_KEY=sk-...                    # API key (required)
OPENAI_ORG_ID=org-...                    # OpenAI organization (if using OpenAI)
```

### Request/Response Examples

**Generate Description**
```bash
curl -X POST http://localhost:5001/generate/description \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Premium Dog Food",
    "category": "pet supplies"
  }'
```

Response:
```json
{
  "description": "Premium Dog Food is a nutrient-rich formula designed..."
}
```

**Generate Image**
```bash
curl -X POST http://localhost:5001/generate/image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Premium dog food bag with happy dog"
  }'
```

Response:
```json
{
  "imageUrl": "https://..."
}
```

### Dependencies
- Flask: Web framework
- openai: OpenAI Python client
- azure-identity: Azure authentication (for Azure OpenAI)

### Source Code
Located in `src/ai-service/`

For more details, see [AI Service README](https://github.com/MassimoC/aks-store-demo/blob/main/src/ai-service/README.md)

---

## Store Front

**Technology**: Vue.js 3 with Vite

### Purpose
Customer-facing web application for browsing products and placing orders.

### Key Features
- Product catalog browsing
- Search and filtering
- Shopping cart
- Order placement
- Order status tracking
- Responsive design

### Configuration

Environment variables:
```bash
VUE_APP_PRODUCT_SERVICE_URL=http://localhost:3002
VUE_APP_ORDER_SERVICE_URL=http://localhost:3000
```

### User Interface

- **Home Page**: Featured products and categories
- **Product Catalog**: Browse all products with search
- **Product Details**: Detailed product information
- **Shopping Cart**: Review items before purchase
- **Checkout**: Place orders
- **Order Tracking**: View order status

### Technologies
- Vue 3: Frontend framework
- Vite: Build tool
- Vue Router: Routing
- Pinia: State management
- Axios: HTTP client

### Source Code
Located in `src/store-front/`

---

## Store Admin

**Technology**: Vue.js 3 with Vite

### Purpose
Employee-facing web application for managing products and monitoring orders.

### Key Features
- Order queue monitoring
- Order management
- Product CRUD operations
- Analytics dashboard
- Real-time updates

### Configuration

Environment variables:
```bash
VUE_APP_PRODUCT_SERVICE_URL=http://localhost:3002
VUE_APP_MAKELINE_SERVICE_URL=http://localhost:3001
```

### User Interface

- **Dashboard**: Overview of orders and products
- **Order Queue**: View pending orders
- **Order Management**: Update order status
- **Product Management**: Add, edit, delete products
- **Analytics**: Order statistics

### Technologies
- Vue 3: Frontend framework
- Vite: Build tool
- Vue Router: Routing
- Pinia: State management
- Axios: HTTP client

### Source Code
Located in `src/store-admin/`

---

## Virtual Customer

**Technology**: Rust

### Purpose
Simulates customer behavior by automatically creating orders at configurable intervals.

### Key Features
- Automated order generation
- Configurable order frequency
- Random product selection
- Load testing capability
- Customizable order patterns

### Configuration

Environment variables:
```bash
ORDER_SERVICE_URL=http://order-service:3000
ORDERS_PER_HOUR=10                       # Orders to create per hour
RANDOM_SEED=42                           # For reproducible testing
```

### Use Cases
- Load testing
- Demo scenarios
- Continuous integration testing
- Performance benchmarking

### Source Code
Located in `src/virtual-customer/`

---

## Virtual Worker

**Technology**: Rust

### Purpose
Simulates worker behavior by automatically completing orders from the queue.

### Key Features
- Automated order completion
- Configurable processing speed
- Realistic processing delays
- Queue monitoring

### Configuration

Environment variables:
```bash
ORDER_QUEUE_URI=amqp://rabbitmq:5672
ORDERS_PER_HOUR=15                       # Orders to process per hour
PROCESSING_DELAY_MS=2000                 # Simulated processing time
```

### Use Cases
- Demo automation
- Load testing
- End-to-end testing
- Queue processing simulation

### Source Code
Located in `src/virtual-worker/`

---

## Service Communication

### Synchronous Communication (REST APIs)

- Store Front → Product Service (GET products)
- Store Front → Order Service (POST orders)
- Store Admin → Product Service (CRUD operations)
- Product Service → AI Service (Generate content)

### Asynchronous Communication (Message Queue)

- Order Service → Queue → Makeline Service
- Decouples order placement from processing
- Provides resilience and scalability

### Data Flow

1. **Order Creation**:
   - Store Front → Order Service (REST)
   - Order Service → Queue (AMQP)
   - Queue → Makeline Service (AMQP)

2. **Product Management**:
   - Store Admin → Product Service (REST)
   - Product Service → AI Service (REST, optional)
   - Product Service → Database

## Health Checks

All services implement health check endpoints:

```bash
# Check service health
curl http://localhost:3000/health  # Order Service
curl http://localhost:3002/health  # Product Service
curl http://localhost:3001/health  # Makeline Service
curl http://localhost:5001/health  # AI Service
```

Kubernetes uses these for:
- Liveness probes
- Readiness probes
- Service routing decisions

## Monitoring

### Metrics

Services expose metrics (if configured):
- Request count
- Response times
- Error rates
- Queue depth
- Database connections

### Logging

All services log to stdout:
- Request/response logs
- Error logs
- Debug information

### Distributed Tracing

When deployed with observability tools:
- OpenTelemetry integration
- Distributed trace correlation
- Performance analysis

## Next Steps

- [Deploy the application](deployment.md)
- [Set up development environment](development.md)
- [Learn about architecture](architecture.md)
