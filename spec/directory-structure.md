# 📂 Codebase Directory Structure

## 🔍 Concise Version

```
structured-annotation-app/
├── apps/                      # Presentation Layer
│   ├── web-dashboard/         # Web UI
│   ├── browser-extension/     # Browser extension
│   └── api-server/            # API endpoints
│
├── packages/                  # Core functionality
│   ├── core/                  # Shared utilities
│   ├── atproto/               # ATProto integration
│   │
│   ├── annotation/            # Bounded Context: Annotations
│   ├── evaluation/            # Bounded Context: Evaluations
│   ├── tagging/               # Bounded Context: Tags & Reactions
│   ├── collection/            # Bounded Context: Collections
│   ├── template/              # Bounded Context: Templates
│   ├── webpage/               # Bounded Context: Webpage metadata
│   └── auth/                  # Bounded Context: Authentication
│
├── tests/                     # Testing infrastructure
└── config/                    # Configuration files
```

## 📋 Detailed Version

```
structured-annotation-app/
├── apps/                         # Presentation Layer
│   ├── web-dashboard/            # Web application
│   │   ├── components/           # UI components
│   │   ├── pages/                # Page definitions
│   │   ├── hooks/                # React hooks
│   │   └── state/                # State management
│   │
│   ├── browser-extension/        # Browser extension
│   │   ├── popup/                # Extension popup UI
│   │   ├── content-scripts/      # Page injection scripts
│   │   ├── background/           # Background service workers
│   │   └── manifest.json         # Extension configuration
│   │
│   └── api-server/               # API server
│       ├── controllers/          # Request handlers
│       ├── routes/               # API route definitions
│       ├── middleware/           # Request processing middleware
│       └── server.ts             # Server bootstrap
│
├── packages/
│   ├── core/                     # Shared core utilities
│   │   ├── types/                # TypeScript types/interfaces
│   │   ├── utils/                # Helper functions
│   │   ├── errors/               # Error handling
│   │   └── result/               # Result pattern implementation
│   │
│   ├── atproto/                  # ATProto integration
│   │   ├── client/               # ATProto client implementation
│   │   ├── lexicons/             # Lexicon definitions
│   │   ├── mappers/              # Domain-to-record mappers
│   │   └── repositories/         # Repository implementations
│   │
│   ├── annotation/               # Bounded Context: Annotations
│   │   ├── domain/               # Domain Layer
│   │   │   ├── entities/         # Annotation entity
│   │   │   ├── value-objects/    # Value objects (notes, highlights)
│   │   │   ├── aggregates/       # Aggregate roots
│   │   │   └── events/           # Domain events
│   │   │
│   │   ├── application/          # Application Layer
│   │   │   ├── use-cases/        # Application services
│   │   │   ├── dtos/             # Data transfer objects
│   │   │   └── ports/            # Repository interfaces
│   │   │
│   │   └── infrastructure/       # Infrastructure Layer
│   │       ├── repositories/     # Repository implementations
│   │       └── services/         # External service adapters
│   │
│   ├── evaluation/               # Bounded Context: Evaluations
│   │   ├── domain/               # Domain Layer
│   │   │   ├── entities/         # Criterion entity
│   │   │   ├── value-objects/    # Value objects (ratings, dyads, triads)
│   │   │   └── events/           # Domain events
│   │   │
│   │   ├── application/          # Application Layer
│   │   │   ├── use-cases/        # Application services
│   │   │   └── ports/            # Repository interfaces
│   │   │
│   │   └── infrastructure/       # Infrastructure Layer
│   │       └── repositories/     # Repository implementations
│   │
│   ├── tagging/                  # Bounded Context: Tags & Reactions
│   │   ├── domain/               # Domain Layer
│   │   ├── application/          # Application Layer
│   │   └── infrastructure/       # Infrastructure Layer
│   │
│   ├── collection/               # Bounded Context: Collections
│   │   ├── domain/               # Domain Layer
│   │   ├── application/          # Application Layer
│   │   └── infrastructure/       # Infrastructure Layer
│   │
│   ├── template/                 # Bounded Context: Templates
│   │   ├── domain/               # Domain Layer
│   │   ├── application/          # Application Layer
│   │   └── infrastructure/       # Infrastructure Layer
│   │
│   ├── webpage/                  # Bounded Context: Webpage metadata
│   │   ├── domain/               # Domain Layer
│   │   ├── application/          # Application Layer
│   │   └── infrastructure/       # Infrastructure Layer
│   │
│   ├── auth/                     # Bounded Context: Authentication
│   │   ├── domain/               # Domain Layer
│   │   ├── application/          # Application Layer
│   │   └── infrastructure/       # Infrastructure Layer
│   │
│   └── shared-kernel/            # Shared domain concepts
│       ├── entities/             # Base entity classes
│       ├── value-objects/        # Shared value objects
│       └── events/               # Base event classes
│
├── tests/                        # Testing infrastructure
│   ├── e2e/                      # End-to-end tests
│   ├── integration/              # Integration tests
│   └── fixtures/                 # Test data
│
├── scripts/                      # Build and utility scripts
│   ├── build.ts                  # Build script
│   └── deploy.ts                 # Deployment script
│
├── config/                       # Configuration
│   ├── development.ts            # Development environment
│   ├── production.ts             # Production environment
│   └── test.ts                   # Test environment
│
├── docs/                         # Documentation
│   ├── api/                      # API documentation
│   └── architecture/             # Architecture documentation
│
├── .github/                      # GitHub configuration
│   └── workflows/                # CI/CD workflows
│
├── package.json                  # Project metadata
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project overview
```

Each bounded context follows the same layered architecture pattern:

1. **Domain Layer**: Contains business logic, entities, value objects, and domain events
2. **Application Layer**: Orchestrates use cases, defines repository interfaces
3. **Infrastructure Layer**: Implements repositories, integrates with ATProto

This structure ensures:
- Clear separation of concerns
- Domain-driven organization
- Testability at all levels
- Scalability for team collaboration
