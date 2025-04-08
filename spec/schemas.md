# Structured Annotation System Specification

This document outlines the core domain objects for a system designed to allow users to leave structured annotations on web content. The annotations include metadata such as evaluations, tags, reactions, notes, and collections.

---

## 🌟 Core Domain Objects

### 1. **Structured Annotation**

Represents user-generated structured metadata linked to specific web content.

**Properties:**

- `id`: _(UUID)_ Unique identifier.
- `userId`: _(UUID)_ Identifier for the user who created the annotation.
- `url`: _(String)_ URL of the annotated web content.
- `createdAt`: _(Timestamp)_ Annotation creation timestamp.
- `updatedAt`: _(Timestamp)_ Last modification timestamp.
- `templateId` _(UUID, optional)_: The template/schema used, if applicable.
- `note`: _(String, optional)_ User's textual commentary or interpretation.
- `highlight`: _(String, optional)_ Specific highlighted or quoted content from the URL.
- `evaluation`: _(Evaluation, optional)_ Structured evaluations of the content.
- `reactions`: _(Array<Reaction>, optional)_ Quick user responses (e.g., emojis).
- `tags`: _(Array<Tag>)_ Descriptive labels or attributes.
- `collections`: _(Array<CollectionReference>)_ Collections the annotation belongs to.

---

### 2. **Evaluation**

Structured numerical or categorical assessments against defined criteria.

**Properties:**

- `criteriaEvaluations`: _(Array<CriteriaEvaluation>)_ List of criterion-based evaluations.
- `singleSelectResponses`: _(Array<SingleSelectResponse>, optional)_ Single-choice categorical selections.
- `multiSelectResponses`: _(Array<MultiSelectResponse>, optional)_ Multiple-choice categorical selections.
- `comments`: _(String, optional)_ Additional explanatory notes.

---

### 3. **CriteriaEvaluation**

Represents a user's evaluation against a specific criterion.

**Properties:**

- `criterionId`: _(UUID)_ Identifier for the criterion evaluated.
- `criterionType`: _(Enum)_ Type of criterion:
  - `numeric`: Simple numeric rating (e.g., stars).
  - `dyad`: Two-pole spectrum (0.0–1.0).
  - `triad`: Three-pole distribution (three coordinates summing to 1.0).
- `value`: _(Object)_ Numeric or geometric rating:
  - For `numeric`: `value: Number` _(e.g., 4.5)_
  - For `dyad`: `value: Number` _(0.0–1.0, position between two extremes)_
  - For `triad`: `value: {cornerA: Number, cornerB: Number, cornerC: Number}` _(values sum to 1.0)_

---

### 4. **SingleSelectResponse**

Represents a categorical evaluation where one option is selected from multiple choices.

**Properties:**

- `promptId`: _(UUID)_ Identifier for the prompt or question.
- `selectedOptionId`: _(UUID)_ Identifier for the selected option.

---

### 5. **MultiSelectResponse**

Represents a categorical evaluation where multiple options can be selected.

**Properties:**

- `promptId`: _(UUID)_ Identifier for the prompt or question.
- `selectedOptionIds`: _(Array<UUID>)_ Identifiers for the selected options.

---

### 6. **Reaction**

Quick emotional or opinion-based responses using predefined emojis or symbols.

**Properties:**

- `type`: _(String)_ Emoji or symbol representing the reaction (e.g., 👍, ❤️, 😮).
- `timestamp`: _(Timestamp)_ When the reaction was given.

---

### 7. **Criterion**

A defined dimension for structured evaluation.

**Properties:**

- `id`: _(UUID)_ Criterion identifier.
- `name`: _(String)_ Human-readable name _(e.g., "Creativity")_.
- `description`: _(String, optional)_ Explanation or context.
- `criterionType`: _(Enum)_ Type: `numeric`, `dyad`, or `triad`.
- For `dyad`:
  - `poleA`: _(String)_ One extreme (e.g., "Experimental")
  - `poleB`: _(String)_ Opposite extreme (e.g., "Theoretical")
- For `triad`:
  - `cornerA`: _(String)_ Label for first dimension.
  - `cornerB`: _(String)_ Label for second dimension.
  - `cornerC`: _(String)_ Label for third dimension.

---

### 8. **Tag**

Descriptive labels attached to annotations for categorization and filtering.

**Properties:**

- `id`: _(UUID)_ Tag identifier.
- `name`: _(String)_ Short descriptive label (e.g., `"innovation"`).
- `type`: _(Enum)_:
  - `userDefined`: created by users.
  - `systemDefined`: predefined by the system.

---

### 9. **Collection**

User-curated groupings of annotations.

**Properties:**

- `id`: _(UUID)_ Unique identifier.
- `userId`: _(UUID)_ Owner or curator.
- `title`: _(String)_ Collection title.
- `description`: _(String, optional)_ Explanation or purpose of the collection.
- `createdAt`: _(Timestamp)_ When collection was created.
- `updatedAt`: _(Timestamp)_ Last modification date.
- `items`: _(Array<CollectionItem>)_ Ordered or prioritized list of annotated URLs or annotations.

---

### 10. **CollectionItem**

Individual item within a collection.

**Properties:**

- `annotationId`: _(UUID)_ Annotation included in collection.
- `addedAt`: _(Timestamp)_ When the annotation was added.
- `priority`: _(Integer, optional)_ Priority or order within the collection.

---

### 11. **CollectionReference**

A reference to a collection to which an annotation belongs.

**Properties:**

- `collectionId`: _(UUID)_ Referenced collection.
- `addedAt`: _(Timestamp)_ When the annotation was added to the collection.

---

### 12. **Annotation Template**

Predefined schema or structure for annotations, specifying fields and criteria.

**Properties:**

- `id`: _(UUID)_ Unique identifier for the template.
- `name`: _(String)_ Template name (e.g., "Research Paper Review").
- `description`: _(String, optional)_ Explanation of use-case.
- `criteria`: _(Array<Criterion>)_ Evaluation dimensions.
- `singleSelectPrompts`: _(Array<SingleSelectPrompt>, optional)_ Single-choice categorical prompts.
- `multiSelectPrompts`: _(Array<MultiSelectPrompt>, optional)_ Multiple-choice categorical prompts.
- `defaultTags`: _(Array<Tag>, optional)_ Suggested or default tags.
- `fields`: _(Array<String>, optional)_ Optional predefined fields or instructions for annotation.

---
