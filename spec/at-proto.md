# 🔄 ATProto Integration

This document outlines how the Structured Annotation System integrates with the AT Protocol (ATProto) network, including lexicon definitions and interaction patterns.

---

## 🌐 ATProto Overview

The AT Protocol (Authenticated Transfer Protocol) is a distributed social networking protocol that powers platforms like Bluesky. Our Structured Annotation System leverages ATProto for:

1. **User Authentication**: Users sign in with their Bluesky accounts
2. **Data Storage**: Annotations are stored as records in users' repositories
3. **Social Discovery**: Users can discover annotations through social connections
4. **Data Ownership**: Users maintain control over their annotation data

---

## 🔑 Authentication Flow

1. **User Sign-in**:
   - User initiates sign-in with their Bluesky handle
   - System redirects to Bluesky authentication
   - User authorizes the application
   - Bluesky returns authentication tokens

2. **Session Management**:
   - System stores and manages refresh tokens
   - Implements token refresh logic
   - Handles session expiration gracefully

---

## 📝 Record Types & Lexicons

The system defines the following custom lexicons for the ATProto network:

### 1. Structured Annotation Record

```json
{
  "lexicon": 1,
  "id": "app.structuredannotation.annotation",
  "description": "A structured annotation for web content",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["url", "createdAt"],
        "properties": {
          "url": { "type": "string", "format": "uri" },
          "createdAt": { "type": "string", "format": "datetime" },
          "updatedAt": { "type": "string", "format": "datetime" },
          "templateRef": { 
            "type": "union", 
            "refs": ["com.atproto.repo.strongRef"] 
          },
          "note": { "type": "string" },
          "highlight": { "type": "string" },
          "evaluation": { "type": "ref", "ref": "#evaluation" },
          "reactions": { 
            "type": "array", 
            "items": { "type": "ref", "ref": "#reaction" } 
          },
          "tags": { 
            "type": "array", 
            "items": { "type": "ref", "ref": "#tag" } 
          },
          "collections": { 
            "type": "array", 
            "items": { "type": "ref", "ref": "com.atproto.repo.strongRef" } 
          }
        }
      }
    },
    "evaluation": {
      "type": "object",
      "properties": {
        "criteriaEvaluations": {
          "type": "array",
          "items": { "type": "ref", "ref": "#criteriaEvaluation" }
        },
        "singleSelectResponses": {
          "type": "array",
          "items": { "type": "ref", "ref": "#singleSelectResponse" }
        },
        "multiSelectResponses": {
          "type": "array",
          "items": { "type": "ref", "ref": "#multiSelectResponse" }
        },
        "comments": { "type": "string" }
      }
    },
    "criteriaEvaluation": {
      "type": "object",
      "required": ["criterionId", "criterionType", "value"],
      "properties": {
        "criterionId": { "type": "string" },
        "criterionType": { 
          "type": "string", 
          "enum": ["numeric", "dyad", "triad"] 
        },
        "value": { "type": "unknown" }
      }
    },
    "singleSelectResponse": {
      "type": "object",
      "required": ["promptId", "selectedOptionId"],
      "properties": {
        "promptId": { "type": "string" },
        "selectedOptionId": { "type": "string" }
      }
    },
    "multiSelectResponse": {
      "type": "object",
      "required": ["promptId", "selectedOptionIds"],
      "properties": {
        "promptId": { "type": "string" },
        "selectedOptionIds": { 
          "type": "array", 
          "items": { "type": "string" } 
        }
      }
    },
    "reaction": {
      "type": "object",
      "required": ["type", "timestamp"],
      "properties": {
        "type": { "type": "string" },
        "timestamp": { "type": "string", "format": "datetime" }
      }
    },
    "tag": {
      "type": "object",
      "required": ["name", "type"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "type": { 
          "type": "string", 
          "enum": ["userDefined", "systemDefined"] 
        }
      }
    }
  }
}
```

### 2. Collection Record

```json
{
  "lexicon": 1,
  "id": "app.structuredannotation.collection",
  "description": "A collection of structured annotations",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["title", "createdAt"],
        "properties": {
          "title": { "type": "string" },
          "description": { "type": "string" },
          "createdAt": { "type": "string", "format": "datetime" },
          "updatedAt": { "type": "string", "format": "datetime" },
          "items": {
            "type": "array",
            "items": { "type": "ref", "ref": "#collectionItem" }
          }
        }
      }
    },
    "collectionItem": {
      "type": "object",
      "required": ["annotationRef", "addedAt"],
      "properties": {
        "annotationRef": { "type": "ref", "ref": "com.atproto.repo.strongRef" },
        "addedAt": { "type": "string", "format": "datetime" },
        "priority": { "type": "integer" }
      }
    }
  }
}
```

### 3. Annotation Template Record

```json
{
  "lexicon": 1,
  "id": "app.structuredannotation.template",
  "description": "A template for structured annotations",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["name"],
        "properties": {
          "name": { "type": "string" },
          "description": { "type": "string" },
          "criteria": {
            "type": "array",
            "items": { "type": "ref", "ref": "#criterion" }
          },
          "singleSelectPrompts": {
            "type": "array",
            "items": { "type": "ref", "ref": "#singleSelectPrompt" }
          },
          "multiSelectPrompts": {
            "type": "array",
            "items": { "type": "ref", "ref": "#multiSelectPrompt" }
          },
          "defaultTags": {
            "type": "array",
            "items": { "type": "ref", "ref": "#tag" }
          },
          "fields": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    },
    "criterion": {
      "type": "object",
      "required": ["id", "name", "criterionType"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "description": { "type": "string" },
        "criterionType": { 
          "type": "string", 
          "enum": ["numeric", "dyad", "triad"] 
        },
        "poleA": { "type": "string" },
        "poleB": { "type": "string" },
        "cornerA": { "type": "string" },
        "cornerB": { "type": "string" },
        "cornerC": { "type": "string" }
      }
    },
    "singleSelectPrompt": {
      "type": "object",
      "required": ["id", "prompt", "options"],
      "properties": {
        "id": { "type": "string" },
        "prompt": { "type": "string" },
        "options": {
          "type": "array",
          "items": { "type": "ref", "ref": "#option" }
        }
      }
    },
    "multiSelectPrompt": {
      "type": "object",
      "required": ["id", "prompt", "options"],
      "properties": {
        "id": { "type": "string" },
        "prompt": { "type": "string" },
        "options": {
          "type": "array",
          "items": { "type": "ref", "ref": "#option" }
        }
      }
    },
    "option": {
      "type": "object",
      "required": ["id", "label"],
      "properties": {
        "id": { "type": "string" },
        "label": { "type": "string" }
      }
    },
    "tag": {
      "type": "object",
      "required": ["name", "type"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "type": { 
          "type": "string", 
          "enum": ["userDefined", "systemDefined"] 
        }
      }
    }
  }
}
```

### 4. Webpage Metadata Record

```json
{
  "lexicon": 1,
  "id": "app.structuredannotation.webpage",
  "description": "Metadata about a webpage that has been annotated",
  "defs": {
    "main": {
      "type": "record",
      "key": "tid",
      "record": {
        "type": "object",
        "required": ["url"],
        "properties": {
          "url": { "type": "string", "format": "uri" },
          "title": { "type": "string" },
          "description": { "type": "string" },
          "imageUrl": { "type": "string", "format": "uri" },
          "author": { "type": "string" },
          "publishedAt": { "type": "string", "format": "datetime" },
          "domain": { "type": "string" },
          "extractedAt": { "type": "string", "format": "datetime" }
        }
      }
    }
  }
}
```

---

## 🔄 Repository Operations

### Creating Records

```typescript
// Example of creating an annotation record
async function createAnnotation(client, annotation) {
  const record = mapAnnotationToRecord(annotation);
  
  return await client.api.com.atproto.repo.createRecord({
    repo: client.session.did,
    collection: 'app.structuredannotation.annotation',
    record: record
  });
}
```

### Retrieving Records

```typescript
// Example of retrieving annotations for a URL
async function getAnnotationsForUrl(client, url) {
  const response = await client.api.app.bsky.feed.searchPosts({
    q: url,
    limit: 100
  });
  
  // Filter for annotation records
  const annotations = response.data.posts.filter(post => 
    post.record.$type === 'app.structuredannotation.annotation'
  );
  
  return annotations.map(mapRecordToAnnotation);
}
```

### Updating Records

```typescript
// Example of updating an annotation
async function updateAnnotation(client, uri, cid, updatedAnnotation) {
  const record = mapAnnotationToRecord(updatedAnnotation);
  
  return await client.api.com.atproto.repo.putRecord({
    repo: client.session.did,
    collection: 'app.structuredannotation.annotation',
    rkey: uri.split('/').pop(),
    record: record
  });
}
```

### Deleting Records

```typescript
// Example of deleting an annotation
async function deleteAnnotation(client, uri) {
  return await client.api.com.atproto.repo.deleteRecord({
    repo: client.session.did,
    collection: 'app.structuredannotation.annotation',
    rkey: uri.split('/').pop()
  });
}
```

---

## 🔍 Query Patterns

### Finding User's Annotations

```typescript
// Get all annotations created by a user
async function getUserAnnotations(client, did) {
  const response = await client.api.com.atproto.repo.listRecords({
    repo: did,
    collection: 'app.structuredannotation.annotation'
  });
  
  return response.data.records.map(record => 
    mapRecordToAnnotation(record)
  );
}
```

### Finding Annotations for a URL

```typescript
// Find all annotations for a specific URL
async function getAnnotationsForUrl(client, url) {
  // This would require a custom query endpoint or client-side filtering
  const allAnnotations = await getAllAnnotations(client);
  return allAnnotations.filter(annotation => annotation.url === url);
}
```

### Finding Collections

```typescript
// Get all collections created by a user
async function getUserCollections(client, did) {
  const response = await client.api.com.atproto.repo.listRecords({
    repo: did,
    collection: 'app.structuredannotation.collection'
  });
  
  return response.data.records.map(record => 
    mapRecordToCollection(record)
  );
}
```

---

## 🔔 Subscription & Feed Integration

### Feed Generation

```typescript
// Example of generating a feed of annotations
async function getAnnotationFeed(client) {
  // Get annotations from followed users
  const following = await client.api.app.bsky.graph.getFollows({
    actor: client.session.did
  });
  
  const annotationPromises = following.data.follows.map(follow => 
    getUserAnnotations(client, follow.did)
  );
  
  const allAnnotations = (await Promise.all(annotationPromises)).flat();
  
  // Sort by recency
  return allAnnotations.sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}
```

### Real-time Updates

```typescript
// Example of subscribing to annotation updates
async function subscribeToAnnotations(client, callback) {
  const subscription = await client.api.com.atproto.sync.subscribeRepos();
  
  subscription.on('message', (message) => {
    if (message.body.ops) {
      const annotationOps = message.body.ops.filter(op => 
        op.path.startsWith('app.structuredannotation')
      );
      
      if (annotationOps.length > 0) {
        callback(annotationOps);
      }
    }
  });
  
  return subscription;
}
```

---

## 🔐 Privacy & Permissions

### Visibility Control

Annotations can have different visibility levels:

1. **Public**: Visible to anyone on the network
2. **Unlisted**: Only visible to those with the direct link
3. **Private**: Only visible to the creator

This is implemented using ATProto's label system and custom visibility fields.

### Access Control

```typescript
// Example of checking if a user can view an annotation
async function canViewAnnotation(client, annotation) {
  // Public annotations are visible to everyone
  if (annotation.visibility === 'public') return true;
  
  // Creator can always view their own annotations
  if (annotation.creator === client.session.did) return true;
  
  // For unlisted annotations, check if user has the link
  if (annotation.visibility === 'unlisted' && userHasLink) return true;
  
  // Otherwise, deny access
  return false;
}
```

---

This integration leverages ATProto's capabilities to create a decentralized, user-controlled annotation system that benefits from the social graph and data ownership principles of the Bluesky ecosystem.
