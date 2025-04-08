# DDD Architecture

# 🧩 Domain-Driven Design (DDD) Layered Architecture

This document outlines a layered architecture following Domain-Driven Design (DDD) principles for the Structured Annotation system built on the ATProto network.

---

## 🧱 Layers Overview

### 🟢 Domain Layer

- Encapsulates business rules and logic
- Includes entities, value objects, aggregates, and domain services
- No dependencies on other layers
- Defines core annotation concepts independent of ATProto implementation details

### 🟡 Application Layer

- Orchestrates use cases (commands/queries)
- Uses domain objects
- Produces/handles domain events
- Handles validation and error propagation
- Returns `Result`/`Either` objects instead of throwing
- Coordinates with ATProto services for record publishing and retrieval

### 🔵 Infrastructure Layer

- ATProto client implementations for PDS communication
- Lexicon definition and validation
- Repository implementations that translate between domain objects and ATProto records
- Bluesky authentication adapters
- Mappers between ATProto records and domain models

### 🔴 Presentation Layer

- Controllers, routes, GraphQL resolvers, extension UIs
- Translates external input into use-case input
- Returns use-case output as JSON or UI-rendered state
- Handles Bluesky authentication flow

---

## 📌 Core Domain

The **Structured Annotation** represents the core domain. It captures user interactions for enriching web content through structured metadata, evaluations, tags, reactions, collections, and reusable annotation templates.

---

## 🌐 Bounded Contexts

### 1. Annotation Management

- Responsible for creation, updating, and retrieval of structured annotations linked to webpages.
- Publishes annotations as ATProto records to users' repositories.

### 2. Evaluation & Criteria Management

- Manages structured evaluations, criteria definitions, and related scoring mechanisms.
- Ensures evaluations conform to lexicon schemas.

### 3. Tagging & Reactions

- Handles tagging, quick reactions, and related metadata for rapid content categorization.
- Encodes tags and reactions within ATProto record formats.

### 4. Collection Management (Curation)

- Oversees user-generated collections or groupings of annotated content.
- Publishes collections as ATProto records with references to annotation records.

### 5. Annotation Template Management

- Manages creation, editing, and sharing of annotation templates and reusable criteria.
- Allows templates to be shared as ATProto records.

### 6. Webpage Management

- Manages information about annotated webpages, including metadata extraction and retrieval.
- Associates webpage metadata with annotation references in ATProto records.

### 7. ATProto Identity & Authentication

- Manages user authentication through Bluesky accounts.
- Handles DID resolution and verification.
- Maintains user session state with the PDS.

### 8. ATProto Repository Management

- Handles CRUD operations for records in users' repositories.
- Manages subscriptions to relevant record types.
- Implements query capabilities across the ATProto network.

---

## 📦 Aggregates

### 1. Structured Annotation Aggregate

- **Root:** StructuredAnnotation
- Includes evaluations, tags, reactions, notes, highlights, references to collections, and reference to template.

### 2. Collection Aggregate

- **Root:** Collection
- Includes items (StructuredAnnotations), prioritization, and ordering.

### 3. Evaluation Aggregate

- **Root:** Criterion
- Manages definitions and changes to evaluation criteria.

### 4. Annotation Template Aggregate

- **Root:** AnnotationTemplate
- Defines reusable templates including fields, criteria, tags, single-select and multi-select prompts.

### 5. Webpage Aggregate

- **Root:** Webpage
- Represents annotated webpages, including URL and metadata.

---

## 📬 Domain Events

### Annotation Management

- AnnotationCreated
- AnnotationUpdated
- AnnotationDeleted
- AnnotationPublishedToATProto
- AnnotationPublishingFailed

### Evaluation Management

- EvaluationAdded
- EvaluationCriteriaUpdated

### Tagging & Reaction Management

- TagAdded
- TagRemoved
- ReactionAdded
- ReactionRemoved

### Collection Management

- CollectionCreated
- CollectionUpdated
- AnnotationAddedToCollection
- AnnotationRemovedFromCollection
- CollectionPublishedToATProto
- CollectionPublishingFailed

### Template Management

- AnnotationTemplateCreated
- AnnotationTemplateUpdated
- AnnotationTemplateDeleted
- CriterionAddedToTemplate
- CriterionRemovedFromTemplate
- TemplatePublishedToATProto
- TemplatePublishingFailed

### Webpage Management

- WebpageRegistered
- WebpageMetadataUpdated

### ATProto Identity & Authentication

- UserLoggedInWithBluesky
- UserLoggedOut
- UserSessionRefreshed
- AuthenticationFailed

### ATProto Repository Management

- RecordCreated
- RecordUpdated
- RecordDeleted
- SubscriptionUpdated

---

## 🔖 Entities

- **StructuredAnnotation**: Identified uniquely, mutable properties.
- **Collection**: Has distinct identity, mutable properties (description, items).
- **Criterion**: Unique definitions of evaluation dimensions, mutable for changes.
- **Tag**: Defined labels used across annotations.
- **AnnotationTemplate**: Identified uniquely, mutable properties (fields, criteria, tags).
- **Webpage**: Represents the webpage content, identified by URL, with mutable metadata.

---

## 📌 Value Objects

- **CriteriaEvaluation**: Immutable numeric/dyadic/triadic evaluation.
- **SingleSelectResponse / MultiSelectResponse**: Immutable selections.
- **Reaction**: Immutable representation of quick user responses (emoji or symbolic).
- **CollectionItem**: Immutable reference within a collection (prioritization/order).

---

## 📁 Repositories

Interfaces for persistence of aggregates via ATProto:

- **StructuredAnnotationRepository**

  - save(annotation) // Creates/updates ATProto record
  - findById(id) // Retrieves record by ATProto record ID
  - findByUrl(url) // Queries records by URL reference
  - findByDid(did) // Finds annotations by user DID

- **CollectionRepository**

  - save(collection) // Creates/updates ATProto record
  - findById(id) // Retrieves record by ATProto record ID
  - findByUserId(did) // Finds collections by user DID
  - findByAnnotationId(annotationId) // Finds collections containing an annotation

- **CriterionRepository**

  - save(criterion) // Creates/updates ATProto record
  - findById(id) // Retrieves record by ATProto record ID
  - findAll() // Queries all available criteria
  - findByTemplate(templateId) // Finds criteria by template

- **TagRepository**

  - save(tag) // Creates/updates ATProto record
  - findById(id) // Retrieves record by ATProto record ID
  - findByName(name) // Queries tags by name
  - findPopularTags(limit) // Finds most used tags

- **AnnotationTemplateRepository**

  - save(template) // Creates/updates ATProto record
  - findById(id) // Retrieves record by ATProto record ID
  - findAll() // Queries all available templates
  - findByCreator(did) // Finds templates by creator

- **WebpageRepository**
  - save(webpage) // Creates/updates ATProto record
  - findByUrl(url) // Queries records by URL

- **ATProtoUserRepository**
  - findByDid(did) // Retrieves user profile by DID
  - getCurrentSession() // Gets current authenticated session
  - refreshSession() // Refreshes authentication token

---

## 🚧 Application Services

Services coordinating interactions between repositories and domain logic:

- AnnotationService
- EvaluationService
- TaggingService
- CollectionService
- AnnotationTemplateService
- WebpageService
- ATProtoAuthenticationService
- ATProtoRepositoryService
- LexiconValidationService

---

## 🌉 Infrastructure Layer

Implementation of repositories, event handling, and ATProto integration:

- ATProto Client (for PDS communication)
- Lexicon Definitions and Validators
- ATProto Record Mappers
- Bluesky Authentication Adapter
- Event Bus (for domain events)
- Local Cache (for performance optimization)

---

## 🌟 Presentation/UI Layer

Interaction point with end-users:

- Web Browser Extension (Annotation Form)
- Web Dashboard for reviewing/managing annotations, collections, templates, criteria, and webpages

---

This layered architecture clearly separates domain logic, application services, infrastructure, and user interface layers, following DDD principles to provide maintainability, clarity, and scalability.

## 🔁 Benefits of This Layout

- **Modular:** each bounded context lives independently
- **Scalable:** supports teams working in parallel
- **Testable:** every layer is testable in isolation
- **Clean architecture:** follows separation of concerns and hexagonal principles
