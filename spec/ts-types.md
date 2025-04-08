# TypeScript Type Definitions for Structured Annotation System

This document provides TypeScript type definitions that correspond to the AT Protocol lexicons defined in our system. These types make it easier to reason about the data structures when implementing the system.

## Core Types

```typescript
/**
 * A structured annotation for web content
 */
export interface StructuredAnnotation {
  // Required fields
  url: string;
  createdAt: string; // ISO datetime
  
  // Optional fields
  updatedAt?: string; // ISO datetime
  templateRef?: StrongRef;
  note?: string;
  highlight?: string;
  evaluation?: Evaluation;
  reactions?: Reaction[];
  tags?: Tag[];
  collections?: StrongRef[];
}

/**
 * A reference to a record in the ATProto network
 */
export interface StrongRef {
  uri: string;
  cid: string;
}

/**
 * Structured evaluation of content
 */
export interface Evaluation {
  criteriaEvaluations?: CriteriaEvaluation[];
  singleSelectResponses?: SingleSelectResponse[];
  multiSelectResponses?: MultiSelectResponse[];
  comments?: string;
}

/**
 * Evaluation against a specific criterion
 */
export interface CriteriaEvaluation {
  criterionId: string;
  criterionType: 'numeric' | 'dyad' | 'triad';
  
  // Only one of these will be present based on criterionType
  numericValue?: number;
  dyadValue?: number; // 0.0-1.0
  triadValue?: {
    cornerA: number; // 0.0-1.0
    cornerB: number; // 0.0-1.0
    cornerC: number; // 0.0-1.0
  };
}

/**
 * Single-choice categorical selection
 */
export interface SingleSelectResponse {
  promptId: string;
  selectedOptionId: string;
}

/**
 * Multiple-choice categorical selection
 */
export interface MultiSelectResponse {
  promptId: string;
  selectedOptionIds: string[];
}

/**
 * Quick emotional or opinion-based response
 */
export interface Reaction {
  type: string; // Emoji or symbol
  timestamp: string; // ISO datetime
}

/**
 * Descriptive label for categorization
 */
export interface Tag {
  id?: string;
  name: string;
  type: 'userDefined' | 'systemDefined';
}

/**
 * A collection of structured annotations
 */
export interface Collection {
  // Required fields
  title: string;
  createdAt: string; // ISO datetime
  
  // Optional fields
  description?: string;
  updatedAt?: string; // ISO datetime
  items?: CollectionItem[];
}

/**
 * Individual item within a collection
 */
export interface CollectionItem {
  annotationRef: StrongRef;
  addedAt: string; // ISO datetime
  priority?: number;
}

/**
 * A template for structured annotations
 */
export interface AnnotationTemplate {
  // Required fields
  name: string;
  
  // Optional fields
  description?: string;
  criteria?: Criterion[];
  singleSelectPrompts?: SingleSelectPrompt[];
  multiSelectPrompts?: MultiSelectPrompt[];
  defaultTags?: Tag[];
  fields?: string[];
}

/**
 * A defined dimension for structured evaluation
 */
export interface Criterion {
  id: string;
  name: string;
  description?: string;
  criterionType: 'numeric' | 'dyad' | 'triad';
  
  // Only one of these will be present based on criterionType
  numericConfig?: {
    min?: number; // Default: 1
    max?: number; // Default: 5
    step?: number; // Default: 1
    displayFormat?: 'stars' | 'number' | 'slider'; // Default: 'stars'
  };
  
  dyadConfig?: {
    poleA: string;
    poleB: string;
    steps?: number; // Default: 5
  };
  
  triadConfig?: {
    cornerA: string;
    cornerB: string;
    cornerC: string;
  };
}

/**
 * Single-choice prompt for evaluation
 */
export interface SingleSelectPrompt {
  id: string;
  prompt: string;
  options: Option[];
}

/**
 * Multiple-choice prompt for evaluation
 */
export interface MultiSelectPrompt {
  id: string;
  prompt: string;
  options: Option[];
}

/**
 * Option for selection prompts
 */
export interface Option {
  id: string;
  label: string;
}

/**
 * Metadata about a webpage that has been annotated
 */
export interface WebpageMetadata {
  // Required fields
  url: string;
  
  // Optional fields
  title?: string;
  description?: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: string; // ISO datetime
  domain?: string;
  extractedAt?: string; // ISO datetime
}
```

## Repository Operation Types

```typescript
/**
 * Parameters for creating an annotation record
 */
export interface CreateAnnotationParams {
  repo: string; // DID of the user
  record: StructuredAnnotation;
}

/**
 * Parameters for updating an annotation record
 */
export interface UpdateAnnotationParams {
  repo: string; // DID of the user
  rkey: string; // Record key
  record: StructuredAnnotation;
}

/**
 * Parameters for deleting an annotation record
 */
export interface DeleteAnnotationParams {
  repo: string; // DID of the user
  rkey: string; // Record key
}

/**
 * Parameters for listing records
 */
export interface ListRecordsParams {
  repo: string; // DID of the user
  collection: string;
  limit?: number;
  cursor?: string;
}

/**
 * Response for listing records
 */
export interface ListRecordsResponse {
  records: {
    uri: string;
    cid: string;
    value: any;
  }[];
  cursor?: string;
}
```

## Query and Feed Types

```typescript
/**
 * Parameters for searching annotations
 */
export interface SearchAnnotationsParams {
  q: string;
  limit?: number;
  cursor?: string;
}

/**
 * Response for searching annotations
 */
export interface SearchAnnotationsResponse {
  annotations: StructuredAnnotation[];
  cursor?: string;
}

/**
 * Parameters for getting a feed of annotations
 */
export interface GetAnnotationFeedParams {
  limit?: number;
  cursor?: string;
}

/**
 * Response for getting a feed of annotations
 */
export interface AnnotationFeedResponse {
  feed: {
    annotation: StructuredAnnotation;
    author: {
      did: string;
      handle: string;
      displayName?: string;
      avatar?: string;
    };
  }[];
  cursor?: string;
}
```

## Subscription Types

```typescript
/**
 * Repository operation in a subscription
 */
export interface RepoOp {
  action: 'create' | 'update' | 'delete';
  path: string;
  cid?: string;
}

/**
 * Message received from a repository subscription
 */
export interface RepoSubscriptionMessage {
  seq: number;
  repo: string; // DID
  commit: {
    cid: string;
    time: string; // ISO datetime
  };
  ops: RepoOp[];
}

/**
 * Handler for subscription events
 */
export type SubscriptionHandler = (message: RepoSubscriptionMessage) => void;
```

These TypeScript definitions provide a strongly-typed interface for working with the AT Protocol lexicons defined in our system. They can be used for type checking during development and to provide better IDE support when implementing the system.
