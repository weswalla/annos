# 📌 Structured Annotation: Key Terminology Overview

---

## 📝 Structured Annotation

A general-purpose container used to capture structured information about any web content. It aggregates various forms of user input, including evaluations, tagging, reactions, and personal notes. In the ATProto context, annotations are published as records to a user's repository on their Personal Data Server (PDS).

---

## 📊 Evaluation

Structured, numerical, or categorical assessments of content based on predefined dimensions or criteria. Common types include:

- **Ratings**: Numeric evaluations (e.g., star ratings: 1–5).
- **Dyads**: Evaluations along a spectrum between two extremes (e.g., simple ↔ complex).
- **Triads**: Evaluations positioned within a triangle of three dimensions (e.g., theoretical, practical, societal).
- **Single-select**: User selects exactly one choice from a set of options.
- **Multi-select**: User selects multiple relevant choices from a set of predefined options.

---

## ✅ Criteria (Dimensions)

Attributes or aspects upon which the content is evaluated. These dimensions guide the structured evaluation and can be numeric, categorical, or spectrum-based (dyads and triads).

---

## 🏷️ Tags (Structured Markers)

Short labels or descriptive keywords applied to content. Useful for quick categorization, filtering, and content discovery.

---

## 👍 Reactions

Simple, expressive evaluations typically conveyed through emoji or icons (e.g., 👍, ❤️, 😮). They allow rapid, low-effort user interaction.

---

## 📚 Curations (Collections)

Sets or groups of annotated items organized purposefully by users, providing structure, priority, and context. Collections help users organize and share annotated content around meaningful themes. Collections are published as ATProto records with references to annotation records.

---

## 🗒️ Notes (Annotations & Highlights)

Free-text commentary provided by the user to add context, interpretation, or personal insights, optionally referencing specific highlighted portions of the content.

---

## 📋 Annotation Form

The interactive interface through which users create structured annotations. The form guides users through structured inputs based on predefined or custom templates.

---

## 🗂️ Annotation Templates

Predefined schemas specifying the structure of annotations, including evaluations, criteria, available tags, reactions, and selections (single/multi-select). Templates standardize structured annotations, making data consistent and easier to analyze. Templates can be shared as ATProto records that other users can reference.

---

## 🌐 Content Profile

The collective structured annotations associated with a specific piece of web content, providing a summary and aggregated insights based on multiple user annotations.

---

## 🔑 ATProto Concepts

### DID (Decentralized Identifier)

A globally unique identifier that doesn't require a centralized registry. In ATProto, DIDs identify users and are the foundation of the identity system.

### PDS (Personal Data Server)

The server that hosts a user's data repository in the ATProto network. Users connect to their PDS to publish and manage their data.

### Repository

A user's personal datastore on their PDS, containing all their records. Each repository is identified by the user's DID.

### Record

The fundamental unit of data in ATProto. Annotations, collections, and templates are all stored as records in a user's repository.

### Lexicon

A schema definition format used in ATProto to define the structure and validation rules for different types of records.

### XRPC

The remote procedure call protocol used to communicate with ATProto services.

---
