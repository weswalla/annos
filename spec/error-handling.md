## ⚠️ Expressive Error Handling

Use expressive, rich domain and application error objects—no blind exceptions.

### Error Hierarchy

```ts
// core/errors/DomainError.ts
export class DomainError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
  }
}

// core/errors/ApplicationError.ts
export class ApplicationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
  }
}

// core/errors/InfrastructureError.ts
export class InfrastructureError extends Error {
  constructor(message: string, public readonly code: string, public readonly cause?: Error) {
    super(message);
  }
}
```

### Domain-Specific Errors

```ts
// annotation/domain/errors/InvalidAnnotationError.ts
export class InvalidAnnotationError extends DomainError {
  constructor(reason: string) {
    super(`Invalid annotation: ${reason}`, "ANNOTATION_INVALID");
  }
}

// annotation/domain/errors/AnnotationNotFoundError.ts
export class AnnotationNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Annotation with ID ${id} not found`, "ANNOTATION_NOT_FOUND");
  }
}
```

### Infrastructure Errors

```ts
// annotation/infrastructure/errors/ATProtoRepositoryError.ts
export class ATProtoRepositoryError extends InfrastructureError {
  constructor(operation: string, cause?: Error) {
    super(
      `ATProto repository operation failed: ${operation}`, 
      "ATPROTO_REPOSITORY_ERROR",
      cause
    );
  }
}
```

### Result Pattern

Use `Result<T, E>` or `Either<L, R>` to return error/success from use-cases:

```ts
// Application layer
const result = await createAnnotation.execute(input);
if (result.isErr()) {
  return res.status(400).json({ error: result.error.message });
}

// Infrastructure layer with error mapping
async save(annotation: StructuredAnnotation): Promise<Result<string, DomainError>> {
  try {
    const record = this.mapper.toRecord(annotation);
    const response = await this.atprotoClient.repo.createRecord({
      repo: annotation.authorDid,
      collection: 'app.bsky.annotation.structuredAnnotation',
      record
    });
    return Result.ok(response.uri);
  } catch (error) {
    // Map infrastructure errors to domain errors
    if (error instanceof ATProtoRepositoryError) {
      return Result.err(new AnnotationPersistenceError(annotation.id));
    }
    return Result.err(new UnexpectedError("Failed to save annotation"));
  }
}
```

### Error Handling in Use Cases

```ts
// annotation/application/use-cases/CreateAnnotationUseCase.ts
export class CreateAnnotationUseCase {
  constructor(
    private readonly annotationRepository: AnnotationRepository,
    private readonly webpageRepository: WebpageRepository
  ) {}

  async execute(input: CreateAnnotationInput): Promise<Result<string, ApplicationError>> {
    // Validate input
    if (!input.url) {
      return Result.err(new InvalidInputError("URL is required"));
    }

    // Check if webpage exists
    const webpageResult = await this.webpageRepository.findByUrl(input.url);
    if (webpageResult.isErr()) {
      return Result.err(new ApplicationError(
        "Failed to verify webpage",
        "WEBPAGE_VERIFICATION_FAILED"
      ));
    }

    // Create annotation
    try {
      const annotation = StructuredAnnotation.create({
        authorDid: input.authorDid,
        url: input.url,
        content: input.content
      });

      // Handle domain validation errors
      if (annotation.isErr()) {
        return Result.err(new InvalidInputError(annotation.error.message));
      }

      // Save to repository
      const saveResult = await this.annotationRepository.save(annotation.value);
      if (saveResult.isErr()) {
        return Result.err(new AnnotationCreationError(saveResult.error.message));
      }

      return Result.ok(saveResult.value);
    } catch (error) {
      // Unexpected errors
      return Result.err(new UnexpectedError("Annotation creation failed"));
    }
  }
}
```
