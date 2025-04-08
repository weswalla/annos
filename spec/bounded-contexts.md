## 🌐 Bounded Contexts

The chosen bounded contexts aim to separate concerns clearly, improving modularity, maintainability, and scalability. Here's the reasoning behind each:

### 1. Annotation Management

- **Reasoning:** Manages the core action of annotating web content. Given annotations involve various metadata, it forms a foundational context.
- **ATProto Integration:** Annotations are published as ATProto records to users' repositories on their PDS.

### 2. Evaluation & Criteria Management

- **Reasoning:** Evaluations and criteria definitions represent a distinct logic related to structured assessments. Separating them ensures evaluations and criteria management remain independent and maintainable.
- **ATProto Integration:** Evaluation criteria and responses are encoded in the lexicon schema.

### 3. Tagging & Reactions

- **Reasoning:** Tags and reactions represent lightweight metadata, distinct from structured evaluation logic. Bundling tags and reactions allows efficient handling of quick, simple user interactions.
- **ATProto Integration:** Tags and reactions are encoded as fields within annotation records.

### 4. Collection Management (Curation)

- **Reasoning:** Collections represent user-driven grouping and prioritization. Keeping collections separate from individual annotations maintains clear separation between individual and aggregated data.
- **ATProto Integration:** Collections are published as separate records with references to annotation records.

### 5. Annotation Template Management

- **Reasoning:** Templates are reusable structures used by annotations, involving defining and sharing schemas. Their lifecycle and management logic differ significantly from the annotations themselves.
- **ATProto Integration:** Templates can be shared as records that other users can reference.

### 6. Webpage Management

- **Reasoning:** Managing metadata about webpages is distinctly separate from user-generated annotations, involving external metadata extraction and management logic.
- **ATProto Integration:** Webpage metadata is stored alongside annotation references.

### 7. ATProto Identity & Authentication

- **Reasoning:** Managing user identity and authentication through Bluesky/ATProto requires specialized handling.
- **ATProto Integration:** Users sign in with their Bluesky accounts, and the system interacts with their PDS for data storage and retrieval.

### 8. ATProto Repository Management

- **Reasoning:** Handling the persistence and retrieval of records in the ATProto network requires specialized logic.
- **ATProto Integration:** Manages the creation, updating, and querying of records in users' repositories on their PDS.
