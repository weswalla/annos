# 📝 Structured Annotation Examples

This document provides concrete examples of structured annotations across various domains, demonstrating the versatility and depth of the annotation system.

## Table of Contents
- [Research Paper Annotations](#research-paper-annotations)
- [Technical Documentation Annotations](#technical-documentation-annotations)
- [Product Review Annotations](#product-review-annotations)
- [Film & Media Annotations](#film--media-annotations)
- [News Article Annotations](#news-article-annotations)
- [Recipe Annotations](#recipe-annotations)
- [Educational Content Annotations](#educational-content-annotations)
- [Collection Examples](#collection-examples)
- [Template Examples](#template-examples)

---

## Research Paper Annotations

### Example 1: Machine Learning Research Paper

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:abcdefghijklmnop",
  "url": "https://arxiv.org/abs/2103.14030",
  "title": "Vision Transformer (ViT) Paper Analysis",
  "createdAt": "2023-09-15T14:32:10Z",
  "template": {
    "id": "research-paper-evaluation",
    "name": "Research Paper Evaluation"
  },
  "evaluations": [
    {
      "criterion": "Methodological Rigor",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Novelty",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Practical Impact",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Research Approach",
      "type": "triad",
      "coordinates": {
        "theoretical": 0.6,
        "empirical": 0.3,
        "engineering": 0.1
      }
    }
  ],
  "tags": ["machine-learning", "computer-vision", "transformers", "deep-learning"],
  "reactions": ["🔬", "💡", "🚀"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Primary contribution type",
      "selected": "Novel Architecture",
      "options": ["Novel Architecture", "Empirical Study", "Theoretical Analysis", "Survey"]
    },
    {
      "type": "multi-select",
      "prompt": "Key strengths",
      "selected": ["Scalability", "Performance", "Simplicity"],
      "options": ["Scalability", "Performance", "Simplicity", "Theoretical Foundations", "Experimental Design"]
    }
  ],
  "notes": [
    {
      "text": "This paper introduces a transformer-based approach to image recognition that challenges the CNN paradigm.",
      "isHighlight": false
    },
    {
      "text": "The authors demonstrate that reliance on CNN-specific inductive biases may be unnecessary.",
      "isHighlight": true,
      "highlightedText": "We show that this reliance on CNNs is not necessary and a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
      "highlightPosition": {
        "startOffset": 1024,
        "endOffset": 1182
      }
    }
  ]
}
```

### Example 2: Medical Research Paper

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:qrstuvwxyz123456",
  "url": "https://www.nejm.org/doi/full/10.1056/NEJMoa2034577",
  "title": "COVID-19 Vaccine Efficacy Study",
  "createdAt": "2023-10-02T09:15:22Z",
  "template": {
    "id": "medical-research-evaluation",
    "name": "Medical Research Evaluation"
  },
  "evaluations": [
    {
      "criterion": "Study Design",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Statistical Analysis",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Clinical Relevance",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Research Focus",
      "type": "dyad",
      "position": 0.7,
      "spectrum": {
        "left": "Basic Science",
        "right": "Clinical Application"
      }
    }
  ],
  "tags": ["COVID-19", "vaccine", "clinical-trial", "immunology"],
  "reactions": ["🔬", "💉", "👍"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Evidence level",
      "selected": "Level I (RCT)",
      "options": ["Level I (RCT)", "Level II (Cohort)", "Level III (Case-Control)", "Level IV (Case Series)"]
    },
    {
      "type": "multi-select",
      "prompt": "Study strengths",
      "selected": ["Large Sample Size", "Diverse Population", "Rigorous Protocol"],
      "options": ["Large Sample Size", "Diverse Population", "Rigorous Protocol", "Long Follow-up", "Novel Endpoints"]
    }
  ],
  "notes": [
    {
      "text": "This landmark study demonstrates 95% efficacy for the mRNA vaccine against COVID-19.",
      "isHighlight": false
    },
    {
      "text": "The safety profile is impressive given the accelerated development timeline.",
      "isHighlight": true,
      "highlightedText": "Safety over a median of 2 months was similar to that of other viral vaccines.",
      "highlightPosition": {
        "startOffset": 3245,
        "endOffset": 3315
      }
    }
  ]
}
```

---

## Technical Documentation Annotations

### Example 1: Programming Language Documentation

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:developer123456",
  "url": "https://docs.python.org/3/tutorial/datastructures.html",
  "title": "Python Data Structures Documentation",
  "createdAt": "2023-09-28T16:42:33Z",
  "template": {
    "id": "technical-documentation-review",
    "name": "Technical Documentation Review"
  },
  "evaluations": [
    {
      "criterion": "Clarity",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Completeness",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Code Examples",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Documentation Style",
      "type": "dyad",
      "position": 0.4,
      "spectrum": {
        "left": "Tutorial-oriented",
        "right": "Reference-oriented"
      }
    }
  ],
  "tags": ["python", "data-structures", "lists", "dictionaries", "programming"],
  "reactions": ["👨‍💻", "📚", "👍"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Documentation level",
      "selected": "Intermediate",
      "options": ["Beginner", "Intermediate", "Advanced", "Expert"]
    },
    {
      "type": "multi-select",
      "prompt": "Covered topics",
      "selected": ["Lists", "Dictionaries", "Sets", "Tuples"],
      "options": ["Lists", "Dictionaries", "Sets", "Tuples", "Comprehensions", "Generators"]
    }
  ],
  "notes": [
    {
      "text": "The list comprehension examples are particularly well-explained and practical.",
      "isHighlight": false
    },
    {
      "text": "This is an excellent explanation of dictionary comprehensions that I hadn't seen elsewhere.",
      "isHighlight": true,
      "highlightedText": "A dictionary comprehension takes the form {key: value for (key, value) in iterable}",
      "highlightPosition": {
        "startOffset": 5123,
        "endOffset": 5196
      }
    }
  ]
}
```

### Example 2: API Documentation

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:apiuser789012",
  "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
  "title": "Fetch API Documentation on MDN",
  "createdAt": "2023-10-05T11:23:45Z",
  "template": {
    "id": "api-documentation-review",
    "name": "API Documentation Review"
  },
  "evaluations": [
    {
      "criterion": "Accuracy",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Usability",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Browser Compatibility Info",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Documentation Focus",
      "type": "triad",
      "coordinates": {
        "conceptual": 0.3,
        "practical": 0.5,
        "reference": 0.2
      }
    }
  ],
  "tags": ["javascript", "fetch-api", "web-development", "http", "promises"],
  "reactions": ["👨‍💻", "🌐", "👍"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Most valuable section",
      "selected": "Usage Examples",
      "options": ["Basic Concepts", "Usage Examples", "Interface Reference", "Browser Compatibility"]
    },
    {
      "type": "multi-select",
      "prompt": "Documentation strengths",
      "selected": ["Clear Examples", "Error Handling", "Progressive Complexity"],
      "options": ["Clear Examples", "Error Handling", "Progressive Complexity", "Visual Aids", "Interactive Demos"]
    }
  ],
  "notes": [
    {
      "text": "The error handling section is particularly useful for production applications.",
      "isHighlight": false
    },
    {
      "text": "This example of handling JSON responses is concise and practical.",
      "isHighlight": true,
      "highlightedText": "fetch('https://example.com/data.json')\n  .then(response => response.json())\n  .then(data => console.log(data));",
      "highlightPosition": {
        "startOffset": 7890,
        "endOffset": 7985
      }
    }
  ]
}
```

---

## Product Review Annotations

### Example 1: Smartphone Review

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:techreviewer123",
  "url": "https://www.theverge.com/23551060/apple-iphone-14-pro-review",
  "title": "iPhone 14 Pro Review",
  "createdAt": "2023-09-20T13:45:22Z",
  "template": {
    "id": "smartphone-review-template",
    "name": "Smartphone Review Template"
  },
  "evaluations": [
    {
      "criterion": "Display Quality",
      "type": "rating",
      "value": 4.8,
      "scale": 5
    },
    {
      "criterion": "Camera System",
      "type": "rating",
      "value": 4.7,
      "scale": 5
    },
    {
      "criterion": "Battery Life",
      "type": "rating",
      "value": 4.2,
      "scale": 5
    },
    {
      "criterion": "Performance",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Value Proposition",
      "type": "dyad",
      "position": 0.7,
      "spectrum": {
        "left": "Budget-oriented",
        "right": "Premium"
      }
    },
    {
      "criterion": "Use Case Orientation",
      "type": "triad",
      "coordinates": {
        "productivity": 0.3,
        "creativity": 0.3,
        "consumption": 0.4
      }
    }
  ],
  "tags": ["iphone", "smartphone", "apple", "mobile", "premium"],
  "reactions": ["📱", "📸", "💰"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Best for",
      "selected": "Photography Enthusiasts",
      "options": ["Photography Enthusiasts", "Power Users", "Average Consumers", "Business Users"]
    },
    {
      "type": "multi-select",
      "prompt": "Standout features",
      "selected": ["Dynamic Island", "48MP Camera", "Always-on Display"],
      "options": ["Dynamic Island", "48MP Camera", "Always-on Display", "A16 Bionic", "Action Mode"]
    }
  ],
  "notes": [
    {
      "text": "The Dynamic Island is a clever way to make a necessity (the notch) into a feature.",
      "isHighlight": false
    },
    {
      "text": "The 48MP camera is a significant upgrade that enables much better low-light photography.",
      "isHighlight": true,
      "highlightedText": "The new 48-megapixel sensor is 65 percent larger than the one in the iPhone 13 Pro and features second-generation sensor-shift OIS.",
      "highlightPosition": {
        "startOffset": 4567,
        "endOffset": 4689
      }
    }
  ]
}
```

### Example 2: Software Product Review

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:softwareuser456",
  "url": "https://www.pcmag.com/reviews/adobe-photoshop",
  "title": "Adobe Photoshop 2023 Review",
  "createdAt": "2023-10-10T15:12:33Z",
  "template": {
    "id": "software-review-template",
    "name": "Software Review Template"
  },
  "evaluations": [
    {
      "criterion": "User Interface",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Feature Set",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Performance",
      "type": "rating",
      "value": 4.2,
      "scale": 5
    },
    {
      "criterion": "Value for Money",
      "type": "rating",
      "value": 3.5,
      "scale": 5
    },
    {
      "criterion": "Learning Curve",
      "type": "dyad",
      "position": 0.8,
      "spectrum": {
        "left": "Beginner-friendly",
        "right": "Professional-oriented"
      }
    }
  ],
  "tags": ["photo-editing", "creative-software", "adobe", "subscription", "professional"],
  "reactions": ["🎨", "💻", "💸"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Recommended user level",
      "selected": "Professional",
      "options": ["Beginner", "Hobbyist", "Enthusiast", "Professional"]
    },
    {
      "type": "multi-select",
      "prompt": "Best features",
      "selected": ["Neural Filters", "Content-Aware Fill", "Select Subject"],
      "options": ["Neural Filters", "Content-Aware Fill", "Select Subject", "Camera Raw", "Layer Styles"]
    }
  ],
  "notes": [
    {
      "text": "The subscription model remains controversial, but the continuous updates add significant value.",
      "isHighlight": false
    },
    {
      "text": "The AI-powered Neural Filters are game-changing for portrait retouching.",
      "isHighlight": true,
      "highlightedText": "Neural Filters use Adobe Sensei AI technology to perform complex edits with simple slider adjustments.",
      "highlightPosition": {
        "startOffset": 6789,
        "endOffset": 6878
      }
    }
  ]
}
```

---

## Film & Media Annotations

### Example 1: Film Review

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:filmcritic789",
  "url": "https://www.rogerebert.com/reviews/dune-movie-review-2021",
  "title": "Dune (2021) Film Analysis",
  "createdAt": "2023-09-25T19:30:15Z",
  "template": {
    "id": "film-review-template",
    "name": "Film Review Template"
  },
  "evaluations": [
    {
      "criterion": "Direction",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Cinematography",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Acting",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Screenplay",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Score/Sound Design",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Film Style",
      "type": "triad",
      "coordinates": {
        "artistic": 0.4,
        "commercial": 0.3,
        "experimental": 0.3
      }
    }
  ],
  "tags": ["sci-fi", "adaptation", "epic", "villeneuve", "herbert"],
  "reactions": ["🎬", "🏜️", "🤯"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Viewing recommendation",
      "selected": "IMAX/Theater",
      "options": ["IMAX/Theater", "Home Theater", "Standard TV", "Any Format"]
    },
    {
      "type": "multi-select",
      "prompt": "Standout elements",
      "selected": ["Visual Effects", "Sound Design", "World Building"],
      "options": ["Visual Effects", "Sound Design", "World Building", "Character Development", "Action Sequences"]
    }
  ],
  "notes": [
    {
      "text": "Villeneuve's adaptation succeeds where others have failed by embracing the visual medium while respecting the source material.",
      "isHighlight": false
    },
    {
      "text": "The scale of the film is breathtaking, particularly in the sandworm sequences.",
      "isHighlight": true,
      "highlightedText": "The first appearance of a sandworm, heralded by rhythmic thumping and a massive dust cloud, is a masterclass in tension and release.",
      "highlightPosition": {
        "startOffset": 8901,
        "endOffset": 9021
      }
    }
  ]
}
```

### Example 2: TV Series Season Review

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:tvcritic456",
  "url": "https://www.vulture.com/article/succession-season-4-review.html",
  "title": "Succession Season 4 Analysis",
  "createdAt": "2023-10-12T20:15:45Z",
  "template": {
    "id": "tv-series-review-template",
    "name": "TV Series Review Template"
  },
  "evaluations": [
    {
      "criterion": "Writing",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Character Development",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Acting Performances",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Pacing",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Narrative Approach",
      "type": "dyad",
      "position": 0.3,
      "spectrum": {
        "left": "Character-driven",
        "right": "Plot-driven"
      }
    }
  ],
  "tags": ["drama", "hbo", "succession", "corporate", "family-dynamics"],
  "reactions": ["📺", "👔", "🏆"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Season quality relative to series",
      "selected": "Best Season Yet",
      "options": ["Weakest Season", "Average Season", "Strong Season", "Best Season Yet"]
    },
    {
      "type": "multi-select",
      "prompt": "Strongest elements",
      "selected": ["Dialogue", "Character Arcs", "Emotional Impact"],
      "options": ["Dialogue", "Character Arcs", "Emotional Impact", "Plot Twists", "Visual Style"]
    }
  ],
  "notes": [
    {
      "text": "The final season masterfully brings together character arcs that have been developing since the beginning.",
      "isHighlight": false
    },
    {
      "text": "This scene perfectly encapsulates the show's brilliant mix of tragedy and dark comedy.",
      "isHighlight": true,
      "highlightedText": "Logan's death occurs off-screen, with the children learning about it via phone while trapped in a glass conference room—a perfect metaphor for their emotional distance.",
      "highlightPosition": {
        "startOffset": 5432,
        "endOffset": 5589
      }
    }
  ]
}
```

---

## News Article Annotations

### Example 1: Political News Analysis

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:newsreader123",
  "url": "https://www.nytimes.com/2023/10/01/us/politics/government-shutdown-averted.html",
  "title": "Analysis of Government Shutdown Article",
  "createdAt": "2023-10-02T08:45:12Z",
  "template": {
    "id": "news-analysis-template",
    "name": "News Analysis Template"
  },
  "evaluations": [
    {
      "criterion": "Factual Accuracy",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Depth of Analysis",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Balance",
      "type": "rating",
      "value": 3.5,
      "scale": 5
    },
    {
      "criterion": "Context Provided",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Article Framing",
      "type": "dyad",
      "position": 0.6,
      "spectrum": {
        "left": "Descriptive",
        "right": "Analytical"
      }
    }
  ],
  "tags": ["politics", "government", "congress", "budget", "legislation"],
  "reactions": ["📰", "🏛️", "🤔"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Article type",
      "selected": "News Analysis",
      "options": ["Breaking News", "News Analysis", "Opinion", "Explainer"]
    },
    {
      "type": "multi-select",
      "prompt": "Perspectives included",
      "selected": ["Democratic Leadership", "Republican Leadership", "Political Analysts"],
      "options": ["Democratic Leadership", "Republican Leadership", "Political Analysts", "Affected Citizens", "Historical Context"]
    }
  ],
  "notes": [
    {
      "text": "The article provides good historical context on previous government shutdowns.",
      "isHighlight": false
    },
    {
      "text": "This quote reveals the political calculation behind the compromise.",
      "isHighlight": true,
      "highlightedText": "\"We had no choice but to accept a short-term solution to avoid immediate economic consequences,\" said Rep. Johnson, acknowledging the political realities.",
      "highlightPosition": {
        "startOffset": 3456,
        "endOffset": 3582
      }
    }
  ]
}
```

### Example 2: Science News Evaluation

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:sciencereader456",
  "url": "https://www.scientificamerican.com/article/new-alzheimers-drug-slows-cognitive-decline-in-trial/",
  "title": "Alzheimer's Drug Research Coverage",
  "createdAt": "2023-10-08T14:22:33Z",
  "template": {
    "id": "science-news-template",
    "name": "Science News Evaluation"
  },
  "evaluations": [
    {
      "criterion": "Scientific Accuracy",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Technical Accessibility",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Study Limitations Coverage",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Contextual Background",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Content Approach",
      "type": "triad",
      "coordinates": {
        "scientific": 0.6,
        "medical": 0.3,
        "societal": 0.1
      }
    }
  ],
  "tags": ["alzheimers", "medical-research", "clinical-trials", "neuroscience", "pharmaceuticals"],
  "reactions": ["🧠", "💊", "🔬"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Research phase covered",
      "selected": "Phase 3 Clinical Trial",
      "options": ["Preclinical", "Phase 1 Clinical Trial", "Phase 2 Clinical Trial", "Phase 3 Clinical Trial", "FDA Approved"]
    },
    {
      "type": "multi-select",
      "prompt": "Expert sources included",
      "selected": ["Study Authors", "Independent Researchers", "Medical Practitioners"],
      "options": ["Study Authors", "Independent Researchers", "Medical Practitioners", "Patient Advocates", "Regulatory Officials"]
    }
  ],
  "notes": [
    {
      "text": "The article does an excellent job explaining the mechanism of action in terms accessible to non-specialists.",
      "isHighlight": false
    },
    {
      "text": "This is a crucial caveat about the study results that contextualizes the findings appropriately.",
      "isHighlight": true,
      "highlightedText": "While the 27% slowing of cognitive decline is statistically significant, experts caution that many patients may not notice a meaningful difference in their daily functioning.",
      "highlightPosition": {
        "startOffset": 4567,
        "endOffset": 4721
      }
    }
  ]
}
```

---

## Recipe Annotations

### Example 1: Cooking Recipe Evaluation

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:homecook789",
  "url": "https://www.seriouseats.com/the-best-chocolate-chip-cookies-recipe",
  "title": "Chocolate Chip Cookie Recipe Analysis",
  "createdAt": "2023-09-30T16:20:45Z",
  "template": {
    "id": "recipe-evaluation-template",
    "name": "Recipe Evaluation Template"
  },
  "evaluations": [
    {
      "criterion": "Taste Result",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Clarity of Instructions",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Accuracy of Times/Temperatures",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Ingredient Accessibility",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Recipe Style",
      "type": "dyad",
      "position": 0.7,
      "spectrum": {
        "left": "Everyday Cooking",
        "right": "Special Occasion"
      }
    }
  ],
  "tags": ["baking", "cookies", "dessert", "chocolate", "kenji-alt-lopez"],
  "reactions": ["🍪", "👨‍🍳", "😋"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Difficulty level",
      "selected": "Intermediate",
      "options": ["Beginner", "Intermediate", "Advanced", "Professional"]
    },
    {
      "type": "multi-select",
      "prompt": "Special techniques used",
      "selected": ["Brown Butter", "Resting Dough", "Temperature Control"],
      "options": ["Brown Butter", "Resting Dough", "Temperature Control", "Ingredient Substitution", "High-Altitude Adjustments"]
    }
  ],
  "notes": [
    {
      "text": "The brown butter technique adds a nutty depth that elevates these cookies beyond the standard recipe.",
      "isHighlight": false
    },
    {
      "text": "This explanation of the science behind resting the dough is incredibly helpful.",
      "isHighlight": true,
      "highlightedText": "Resting the dough allows the flour to fully hydrate and the butter to solidify, resulting in cookies that spread less and develop deeper flavor.",
      "highlightPosition": {
        "startOffset": 5678,
        "endOffset": 5812
      }
    },
    {
      "text": "My modification: I found that reducing the sugar by 25% still produced excellent results with a less sweet cookie that highlighted the chocolate.",
      "isHighlight": false
    }
  ]
}
```

### Example 2: Cocktail Recipe Review

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:mixologist123",
  "url": "https://www.liquor.com/recipes/old-fashioned/",
  "title": "Old Fashioned Cocktail Recipe Review",
  "createdAt": "2023-10-07T21:15:30Z",
  "template": {
    "id": "cocktail-recipe-template",
    "name": "Cocktail Recipe Template"
  },
  "evaluations": [
    {
      "criterion": "Flavor Balance",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Technique Accuracy",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Historical Authenticity",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Ingredient Quality Guidance",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Cocktail Style",
      "type": "triad",
      "coordinates": {
        "traditional": 0.7,
        "creative": 0.2,
        "technical": 0.1
      }
    }
  ],
  "tags": ["cocktails", "bourbon", "whiskey", "classic", "mixology"],
  "reactions": ["🥃", "🍊", "🧊"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Skill level required",
      "selected": "Beginner",
      "options": ["Beginner", "Intermediate", "Advanced", "Professional"]
    },
    {
      "type": "multi-select",
      "prompt": "Essential equipment",
      "selected": ["Mixing Glass", "Bar Spoon", "Strainer"],
      "options": ["Mixing Glass", "Bar Spoon", "Strainer", "Jigger", "Muddler"]
    }
  ],
  "notes": [
    {
      "text": "The recipe strikes the perfect balance between historical accuracy and modern preferences.",
      "isHighlight": false
    },
    {
      "text": "This explanation of whiskey selection is particularly helpful for beginners.",
      "isHighlight": true,
      "highlightedText": "While bourbon is traditional, a high-quality rye whiskey can provide a spicier alternative that many enthusiasts prefer.",
      "highlightPosition": {
        "startOffset": 3456,
        "endOffset": 3562
      }
    },
    {
      "text": "Personal variation: I prefer using a large ice cube rather than several small ones to minimize dilution while maintaining proper chilling.",
      "isHighlight": false
    }
  ]
}
```

---

## Educational Content Annotations

### Example 1: Online Course Evaluation

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:student456",
  "url": "https://www.coursera.org/learn/machine-learning",
  "title": "Andrew Ng's Machine Learning Course Evaluation",
  "createdAt": "2023-10-03T10:25:45Z",
  "template": {
    "id": "course-evaluation-template",
    "name": "Online Course Evaluation"
  },
  "evaluations": [
    {
      "criterion": "Content Quality",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Instructor Effectiveness",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Assignment Relevance",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Production Quality",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Course Approach",
      "type": "dyad",
      "position": 0.4,
      "spectrum": {
        "left": "Theoretical",
        "right": "Practical"
      }
    }
  ],
  "tags": ["machine-learning", "AI", "online-course", "programming", "mathematics"],
  "reactions": ["🧠", "💻", "📊"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Appropriate for",
      "selected": "Beginners with Math Background",
      "options": ["Complete Beginners", "Beginners with Math Background", "Intermediate Practitioners", "Advanced Specialists"]
    },
    {
      "type": "multi-select",
      "prompt": "Key strengths",
      "selected": ["Intuitive Explanations", "Mathematical Foundations", "Practical Implementations"],
      "options": ["Intuitive Explanations", "Mathematical Foundations", "Practical Implementations", "Industry Applications", "Cutting-edge Research"]
    }
  ],
  "notes": [
    {
      "text": "Andrew Ng has a remarkable ability to explain complex concepts in an intuitive way without sacrificing mathematical rigor.",
      "isHighlight": false
    },
    {
      "text": "This explanation of backpropagation is the clearest I've encountered in any course.",
      "isHighlight": true,
      "highlightedText": "Backpropagation can be understood as simply applying the chain rule from calculus, calculating gradients from the output layer back to the input layer.",
      "highlightPosition": {
        "startOffset": 7890,
        "endOffset": 8023
      }
    },
    {
      "text": "The Octave/MATLAB focus is somewhat outdated; Python implementations would be more relevant today.",
      "isHighlight": false
    }
  ]
}
```

### Example 2: Textbook Chapter Annotation

```json
{
  "type": "app.bsky.annotation.structuredAnnotation",
  "did": "did:plc:professor789",
  "url": "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis",
  "title": "Biology Textbook Meiosis Chapter",
  "createdAt": "2023-10-09T13:40:22Z",
  "template": {
    "id": "textbook-evaluation-template",
    "name": "Textbook Chapter Evaluation"
  },
  "evaluations": [
    {
      "criterion": "Accuracy",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Clarity",
      "type": "rating",
      "value": 4.5,
      "scale": 5
    },
    {
      "criterion": "Visual Aids",
      "type": "rating",
      "value": 5,
      "scale": 5
    },
    {
      "criterion": "Practice Problems",
      "type": "rating",
      "value": 4,
      "scale": 5
    },
    {
      "criterion": "Pedagogical Approach",
      "type": "triad",
      "coordinates": {
        "conceptual": 0.4,
        "factual": 0.4,
        "applied": 0.2
      }
    }
  ],
  "tags": ["biology", "meiosis", "cell-division", "genetics", "textbook"],
  "reactions": ["🧬", "📚", "🔬"],
  "selections": [
    {
      "type": "single-select",
      "prompt": "Educational level",
      "selected": "Undergraduate",
      "options": ["High School", "Undergraduate", "Graduate", "Professional"]
    },
    {
      "type": "multi-select",
      "prompt": "Effective elements",
      "selected": ["Diagrams", "Process Explanations", "Comparison Tables"],
      "options": ["Diagrams", "Process Explanations", "Comparison Tables", "Clinical Connections", "Historical Context"]
    }
  ],
  "notes": [
    {
      "text": "The comparison between mitosis and meiosis is particularly well-structured and helps clarify the key differences.",
      "isHighlight": false
    },
    {
      "text": "This diagram excellently illustrates crossing over during prophase I.",
      "isHighlight": true,
      "highlightedText": "Figure 11.3 During crossing over, segments of DNA are exchanged between non-sister chromatids, resulting in genetic recombination.",
      "highlightPosition": {
        "startOffset": 5678,
        "endOffset": 5796
      }
    },
    {
      "text": "Suggestion for improvement: Adding more real-world examples of genetic disorders related to nondisjunction would strengthen the clinical relevance.",
      "isHighlight": false
    }
  ]
}
```

---

## Collection Examples

### Example 1: Research Paper Collection

```json
{
  "type": "app.bsky.collection.annotationCollection",
  "did": "did:plc:researcher123",
  "name": "Transformer Architecture Papers",
  "description": "A curated collection of key papers in the development of transformer architectures in machine learning",
  "createdAt": "2023-09-20T14:30:00Z",
  "updatedAt": "2023-10-10T09:15:22Z",
  "visibility": "public",
  "items": [
    {
      "annotationUri": "at://did:plc:abcdefghijklmnop/app.bsky.annotation.structuredAnnotation/3jd7e2s",
      "addedAt": "2023-09-20T14:30:00Z",
      "note": "The original transformer paper that started it all",
      "priority": 1
    },
    {
      "annotationUri": "at://did:plc:abcdefghijklmnop/app.bsky.annotation.structuredAnnotation/8kf92js",
      "addedAt": "2023-09-25T10:12:33Z",
      "note": "BERT showed how transformers could be pre-trained and fine-tuned",
      "priority": 2
    },
    {
      "annotationUri": "at://did:plc:abcdefghijklmnop/app.bsky.annotation.structuredAnnotation/9dk37sh",
      "addedAt": "2023-10-01T16:45:12Z",
      "note": "GPT-3 demonstrated scaling laws and few-shot learning capabilities",
      "priority": 3
    },
    {
      "annotationUri": "at://did:plc:abcdefghijklmnop/app.bsky.annotation.structuredAnnotation/2jf83ks",
      "addedAt": "2023-10-10T09:15:22Z",
      "note": "Vision Transformer (ViT) successfully applied transformers to computer vision",
      "priority": 4
    }
  ],
  "tags": ["machine-learning", "transformers", "NLP", "deep-learning", "research-papers"]
}
```

### Example 2: Film Collection

```json
{
  "type": "app.bsky.collection.annotationCollection",
  "did": "did:plc:filmcritic789",
  "name": "Science Fiction Masterpieces",
  "description": "A collection of annotated reviews of the most influential science fiction films of the past 50 years",
  "createdAt": "2023-09-15T18:20:10Z",
  "updatedAt": "2023-10-12T21:05:33Z",
  "visibility": "public",
  "items": [
    {
      "annotationUri": "at://did:plc:filmcritic789/app.bsky.annotation.structuredAnnotation/7dk39sj",
      "addedAt": "2023-09-15T18:20:10Z",
      "note": "Blade Runner defined cyberpunk aesthetics in cinema",
      "priority": 1
    },
    {
      "annotationUri": "at://did:plc:filmcritic789/app.bsky.annotation.structuredAnnotation/9fj27dk",
      "addedAt": "2023-09-22T14:30:45Z",
      "note": "2001: A Space Odyssey remains unmatched in philosophical depth",
      "priority": 2
    },
    {
      "annotationUri": "at://did:plc:filmcritic789/app.bsky.annotation.structuredAnnotation/3kd92js",
      "addedAt": "2023-10-05T19:45:22Z",
      "note": "Arrival's non-linear approach to time creates a unique narrative structure",
      "priority": 3
    },
    {
      "annotationUri": "at://did:plc:filmcritic789/app.bsky.annotation.structuredAnnotation/5jf83ls",
      "addedAt": "2023-10-12T21:05:33Z",
      "note": "Dune (2021) brings epic scale back to science fiction cinema",
      "priority": 4
    }
  ],
  "tags": ["science-fiction", "film-criticism", "cinema", "directors", "visual-effects"]
}
```

### Example 3: Technical Documentation Collection

```json
{
  "type": "app.bsky.collection.annotationCollection",
  "did": "did:plc:developer123456",
  "name": "React Hooks Documentation",
  "description": "Annotated collection of official React hooks documentation with practical insights",
  "createdAt": "2023-09-10T11:15:30Z",
  "updatedAt": "2023-10-08T16:40:22Z",
  "visibility": "public",
  "items": [
    {
      "annotationUri": "at://did:plc:developer123456/app.bsky.annotation.structuredAnnotation/2jd83ks",
      "addedAt": "2023-09-10T11:15:30Z",
      "note": "useState is the foundation of state management in functional components",
      "priority": 1
    },
    {
      "annotationUri": "at://did:plc:developer123456/app.bsky.annotation.structuredAnnotation/5kf92ls",
      "addedAt": "2023-09-18T13:25:45Z",
      "note": "useEffect covers the lifecycle needs of most components",
      "priority": 2
    },
    {
      "annotationUri": "at://did:plc:developer123456/app.bsky.annotation.structuredAnnotation/7dk39sj",
      "addedAt": "2023-09-25T15:30:10Z",
      "note": "useContext provides a clean solution for prop drilling",
      "priority": 3
    },
    {
      "annotationUri": "at://did:plc:developer123456/app.bsky.annotation.structuredAnnotation/9fj27dk",
      "addedAt": "2023-10-08T16:40:22Z",
      "note": "useReducer offers more structured state management for complex components",
      "priority": 4
    }
  ],
  "tags": ["react", "javascript", "hooks", "frontend", "web-development"]
}
```

---

## Template Examples

### Example 1: Research Paper Evaluation Template

```json
{
  "type": "app.bsky.template.annotationTemplate",
  "did": "did:plc:academicorg123",
  "name": "Research Paper Evaluation",
  "description": "A comprehensive template for evaluating academic research papers across disciplines",
  "createdAt": "2023-08-15T10:00:00Z",
  "updatedAt": "2023-09-05T14:30:22Z",
  "visibility": "public",
  "version": "1.2",
  "evaluationCriteria": [
    {
      "id": "methodological-rigor",
      "name": "Methodological Rigor",
      "description": "Assesses the soundness of research methods, experimental design, and statistical analysis",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "novelty",
      "name": "Novelty",
      "description": "Evaluates the originality of the research and its contribution to the field",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "practical-impact",
      "name": "Practical Impact",
      "description": "Assesses the potential real-world applications and significance",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "research-approach",
      "name": "Research Approach",
      "description": "Characterizes the balance between theoretical, empirical, and engineering aspects",
      "type": "triad",
      "vertices": ["theoretical", "empirical", "engineering"]
    }
  ],
  "selectionPrompts": [
    {
      "id": "contribution-type",
      "name": "Primary contribution type",
      "type": "single-select",
      "options": ["Novel Architecture", "Empirical Study", "Theoretical Analysis", "Survey", "Replication Study", "Meta-Analysis"]
    },
    {
      "id": "key-strengths",
      "name": "Key strengths",
      "type": "multi-select",
      "options": ["Scalability", "Performance", "Simplicity", "Theoretical Foundations", "Experimental Design", "Statistical Analysis", "Interdisciplinary Approach"]
    }
  ],
  "suggestedTags": ["machine-learning", "computer-vision", "natural-language-processing", "statistics", "algorithms", "neuroscience", "social-sciences", "medicine", "physics", "chemistry", "biology"],
  "suggestedReactions": ["🔬", "💡", "🚀", "📊", "🧠"]
}
```

### Example 2: Film Review Template

```json
{
  "type": "app.bsky.template.annotationTemplate",
  "did": "did:plc:filmcriticsguild",
  "name": "Film Review Template",
  "description": "A structured template for comprehensive film criticism and analysis",
  "createdAt": "2023-07-20T15:45:30Z",
  "updatedAt": "2023-09-10T11:20:15Z",
  "visibility": "public",
  "version": "2.1",
  "evaluationCriteria": [
    {
      "id": "direction",
      "name": "Direction",
      "description": "Evaluates the director's vision, storytelling, and scene composition",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "cinematography",
      "name": "Cinematography",
      "description": "Assesses visual composition, lighting, camera movement, and overall visual style",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "acting",
      "name": "Acting",
      "description": "Evaluates performance quality, character embodiment, and ensemble dynamics",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "screenplay",
      "name": "Screenplay",
      "description": "Assesses story structure, dialogue, character development, and thematic depth",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "score-sound",
      "name": "Score/Sound Design",
      "description": "Evaluates music, sound effects, and overall audio experience",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "film-style",
      "name": "Film Style",
      "description": "Characterizes the balance between artistic, commercial, and experimental elements",
      "type": "triad",
      "vertices": ["artistic", "commercial", "experimental"]
    }
  ],
  "selectionPrompts": [
    {
      "id": "viewing-recommendation",
      "name": "Viewing recommendation",
      "type": "single-select",
      "options": ["IMAX/Theater", "Home Theater", "Standard TV", "Any Format", "Skip It"]
    },
    {
      "id": "standout-elements",
      "name": "Standout elements",
      "type": "multi-select",
      "options": ["Visual Effects", "Sound Design", "World Building", "Character Development", "Action Sequences", "Emotional Impact", "Dialogue", "Plot Twists"]
    }
  ],
  "suggestedTags": ["sci-fi", "drama", "comedy", "horror", "action", "thriller", "documentary", "animation", "indie", "blockbuster", "foreign", "classic"],
  "suggestedReactions": ["🎬", "🍿", "👏", "😢", "🤯", "❤️"]
}
```

### Example 3: Product Review Template

```json
{
  "type": "app.bsky.template.annotationTemplate",
  "did": "did:plc:consumerorg456",
  "name": "Technology Product Review",
  "description": "A comprehensive template for evaluating consumer technology products",
  "createdAt": "2023-08-05T12:30:45Z",
  "updatedAt": "2023-09-20T16:15:30Z",
  "visibility": "public",
  "version": "1.5",
  "evaluationCriteria": [
    {
      "id": "design-build",
      "name": "Design & Build Quality",
      "description": "Assesses physical design, materials, durability, and aesthetics",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "performance",
      "name": "Performance",
      "description": "Evaluates speed, responsiveness, and capability for intended tasks",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "features",
      "name": "Features & Functionality",
      "description": "Assesses the range, usefulness, and implementation of features",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "user-experience",
      "name": "User Experience",
      "description": "Evaluates interface, ease of use, and overall user satisfaction",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "value",
      "name": "Value for Money",
      "description": "Assesses price relative to quality, features, and competition",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "value-proposition",
      "name": "Value Proposition",
      "description": "Characterizes where the product sits on the budget to premium spectrum",
      "type": "dyad",
      "spectrum": {
        "left": "Budget-oriented",
        "right": "Premium"
      }
    },
    {
      "id": "use-case",
      "name": "Use Case Orientation",
      "description": "Identifies the balance of productivity, creativity, and consumption strengths",
      "type": "triad",
      "vertices": ["productivity", "creativity", "consumption"]
    }
  ],
  "selectionPrompts": [
    {
      "id": "best-for",
      "name": "Best for",
      "type": "single-select",
      "options": ["General Consumers", "Professionals", "Enthusiasts", "Budget Shoppers", "Early Adopters"]
    },
    {
      "id": "standout-features",
      "name": "Standout features",
      "type": "multi-select",
      "options": ["Performance", "Battery Life", "Display Quality", "Camera System", "Software Experience", "Connectivity", "Ecosystem Integration", "Unique Innovation"]
    }
  ],
  "suggestedTags": ["smartphone", "laptop", "tablet", "wearable", "headphones", "camera", "smart-home", "gaming", "audio", "display", "productivity", "entertainment"],
  "suggestedReactions": ["📱", "💻", "🎧", "📸", "👍", "👎", "💰", "⚡"]
}
```

### Example 4: Educational Content Template

```json
{
  "type": "app.bsky.template.annotationTemplate",
  "did": "did:plc:educationorg789",
  "name": "Educational Resource Evaluation",
  "description": "A template for evaluating educational content across various formats and subjects",
  "createdAt": "2023-07-10T09:15:30Z",
  "updatedAt": "2023-09-15T13:40:22Z",
  "visibility": "public",
  "version": "1.3",
  "evaluationCriteria": [
    {
      "id": "content-accuracy",
      "name": "Content Accuracy",
      "description": "Assesses factual correctness and currency of information",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "pedagogical-quality",
      "name": "Pedagogical Quality",
      "description": "Evaluates teaching approach, scaffolding, and learning design",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "engagement",
      "name": "Engagement & Accessibility",
      "description": "Assesses how engaging and accessible the content is for the target audience",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "assessment-quality",
      "name": "Assessment Quality",
      "description": "Evaluates exercises, quizzes, and other assessment methods",
      "type": "rating",
      "scale": 5
    },
    {
      "id": "educational-approach",
      "name": "Educational Approach",
      "description": "Characterizes the balance between theoretical, practical, and interactive learning",
      "type": "triad",
      "vertices": ["theoretical", "practical", "interactive"]
    }
  ],
  "selectionPrompts": [
    {
      "id": "educational-level",
      "name": "Educational level",
      "type": "single-select",
      "options": ["Elementary", "Secondary", "Undergraduate", "Graduate", "Professional", "General Audience"]
    },
    {
      "id": "learning-objectives",
      "name": "Primary learning objectives",
      "type": "multi-select",
      "options": ["Knowledge Acquisition", "Skill Development", "Critical Thinking", "Problem Solving", "Creative Expression", "Professional Certification"]
    }
  ],
  "suggestedTags": ["mathematics", "science", "history", "language", "programming", "arts", "professional-development", "self-paced", "instructor-led", "interactive", "video-based", "text-based"],
  "suggestedReactions": ["📚", "🧠", "💡", "🔍", "👨‍🏫", "👩‍🎓"]
}
```

These examples demonstrate the versatility and depth of the structured annotation system across various domains and content types. Each example showcases different combinations of evaluation types (ratings, dyads, triads), selections (single-select, multi-select), tags, reactions, and notes with highlights.
