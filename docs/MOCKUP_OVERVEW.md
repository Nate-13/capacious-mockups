# Capacious Journal Management System - Complete Wireframe Specification

## 📋 Project Overview

**Project Name:** Capacious Journal Management System  
**Purpose:** Web-based manuscript submission and peer review workflow management for academic journal  
**Target Users:** Authors, Managing Editors, Peer Reviewers, Copy Editors, System Administrators  
**Design Style:** Low-fidelity wireframes (grayscale, minimal styling, focus on layout and functionality)

---

## 🎨 Design Principles for Wireframes

### **Visual Style:**

- **Grayscale only** - Use shades of gray (#FFFFFF, #F5F5F5, #E0E0E0, #999999, #666666, #333333, #000000)
- **Simple borders** - 1px solid lines, minimal shadows
- **Basic typography** - Sans-serif font, clear hierarchy through size only
- **No icons** - Use text labels or simple shapes (squares, circles)
- **Placeholder images** - Gray boxes with "X" or "Image" text
- **Minimal spacing** - Clear but not overly designed
- **Wireframe indicators** - Show boxes, lines, and annotations

### **Layout Conventions:**

- Maximum content width: 1200px centered
- Standard spacing units: 8px, 16px, 24px, 32px
- Grid-based layout where applicable
- Clear visual hierarchy through size and weight, not color

### **Annotation Style:**

- Add numbered annotations for interactive elements
- Include brief notes about functionality
- Show state changes with arrows or notes
- Indicate conditional visibility with dotted lines

---

## 📐 Complete Page Specifications

---

## 1. ROLE SWITCHER (Global Component - Testing Only)

**Location:** Top of every page (for demo purposes)  
**Purpose:** Allow viewing interface from different role perspectives

```
┌────────────────────────────────────────────────────────────────┐
│ VIEWING AS:                                                     │
│ [ Author ] [ Managing Editor ] [ Reviewer ] [ Copy Editor ]    │
│ [ Admin ]                                                       │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Fixed header, light gray background (#F5F5F5)
- Radio button style selection
- Selected role has darker border (2px solid #333)
- Unselected roles have light border (1px solid #999)
- Small text label "VIEWING AS:" in uppercase, 11px
- Buttons: 12px text, padding 8px 16px, 6px border radius

---

## 2. GLOBAL NAVIGATION

**Location:** Below role switcher, on every page  
**Purpose:** Primary navigation and branding

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Capacious          Dashboard    Submit    (User: Greg S.)     │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Height: 64px
- White background (#FFFFFF)
- Bottom border: 1px solid #E0E0E0
- Logo "Capacious": 24px, italic serif font, left-aligned
- Navigation links: 15px, regular weight, centered
- Active link: underline (2px solid #333)
- User name: 14px, gray text (#666), right-aligned
- Max width content: 1200px, centered

**States:**

- Default: as shown
- Hover on links: text becomes #000
- Active link: underlined

---

## 3. DASHBOARD PAGE

### 3.1 Dashboard Header

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [← Back to X]  (only on detail views)                         │
│                                                                 │
│  All Submissions                                   [1]          │
│  Managing 4 submissions across various stages                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

[1] Title changes based on role:
    - Author: "My Submissions"
    - Editor/Admin: "All Submissions"
    - Reviewer: "Assigned Reviews"
    - Copy Editor: "Copy Editing Queue"
```

**Specifications:**

- Heading: 32px, serif font, bold
- Subheading: 15px, gray (#666)
- Spacing: 32px top margin, 24px bottom margin
- Back button (when present): 14px, gray, with "←" symbol

### 3.2 Dashboard Filters (Editor/Admin Only)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [Search submissions...                    ] [All Statuses ▼]  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Search input: 70% width, 44px height, light gray border (#E0E0E0)
- Dropdown: 28% width, 44px height, light gray border
- Gap between: 2%
- Border radius: 6px
- Placeholder text: gray (#999), 14px
- Margin bottom: 24px

### 3.3 Submission Cards (List View)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  #2024-034                                             [2]      │
│                                                                 │
│  Affective Economies in Digital Spaces: A Study of...  [3]     │
│  by Jane Doe                                           [4]      │
│                                                                 │
│  [In Peer Review]                      Submitted Jan 15 [5][6] │
│  👥 2 reviewers assigned                               [7]      │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

[2] Submission ID: 12px, monospace font, gray (#666)
[3] Title: 18px, serif, bold, black
[4] Author: 14px, gray (#666)
[5] Status badge: 13px, light gray background, dark border, 4px radius
[6] Date: 13px, gray, right-aligned
[7] Meta info: 13px, gray (show conditionally)
```

**Specifications:**

- Card: White background, 1px solid border (#E0E0E0), 8px radius
- Padding: 20px
- Margin bottom: 16px
- Hover state: Add light shadow (0 2px 8px rgba(0,0,0,0.1))
- Cursor: pointer
- Min-height: 140px

**Status Badge Variations:**

```
[Submitted]  - Light gray background, medium gray text
[In Desk Review]  - Medium gray background, dark text
[In Peer Review]  - Medium gray background, dark text
[Accepted]  - Dark gray background, white text
[Rejected]  - Medium gray background, dark text
```

### 3.4 Empty States

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         [ ]                                     │
│                  No submissions yet                             │
│         Submit your first manuscript to get started             │
│                                                                 │
│                     [Submit Manuscript]                         │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Empty state box: Centered, 60px top/bottom padding
- Icon placeholder: 48px square, light gray border
- Text: 16px, centered, gray
- Button: 14px, dark border, 12px padding, 6px radius

---

## 4. SUBMISSION DETAIL PAGE

### 4.1 Page Header

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ← Back to dashboard                                           │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Back link: 14px, gray text, with arrow symbol
- Padding: 24px bottom
- Hover: text becomes black

### 4.2 Submission Header Card

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Submission #2024-034                                          │
│                                                                 │
│  Affective Economies in Digital Spaces: A Study of             │
│  Online Community Formation                                     │
│                                                                 │
│  Author: Jane Doe                                              │
│  Affiliation: Northwestern University                           │
│  Submitted: January 15, 2024                                   │
│  Current Status: [In Peer Review]                              │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- White background, 1px border, 8px radius
- Padding: 32px
- Submission ID: 13px, monospace, gray
- Title: 28px, serif, bold, 1.3 line height
- Metadata labels: Bold, 15px
- Metadata values: Regular, 15px
- Spacing between fields: 8px
- Status badge: As per dashboard specifications

### 4.3 Timeline Component

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Manuscript Journey                                            │
│                                                                 │
│   (✓)────────(✓)────────(●)────────( )────────( )            │
│ Submitted  Desk Rev  Peer Rev  Copy Edit  Published           │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

Legend:
(✓) = Completed stage (filled circle with checkmark)
(●) = Current stage (filled circle, darker)
( ) = Future stage (empty circle)
──── = Connection line (solid if completed, dotted if future)
```

**Specifications:**

- Section title: 16px, serif, margin bottom 20px
- Timeline container: Full width
- Circles: 40px diameter
- Completed: Dark gray fill (#333), white checkmark
- Current: Medium gray fill (#666)
- Future: White fill, gray border (#999)
- Labels: 11px, below circles, 8px margin top
- Line between: 2px height, gray
- Completed lines: Solid dark gray
- Future lines: Dotted light gray (#CCC)

### 4.4 Files & Versions Section

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Files & Versions                                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [📄] original_submission.docx                            │ │
│  │      v1 - Original Submission                            │ │
│  │                          Jan 15, 2024      [View] [Down] │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [📄] revised_desk_review.docx                            │ │
│  │      v2 - Desk Review Revision                           │ │
│  │                          Jan 22, 2024      [View] [Down] │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Section title: 18px, serif
- File rows: Light gray background (#F5F5F5), 1px border, 6px radius
- File icon: Use "📄" text or simple rectangle placeholder
- Filename: 14px, monospace font
- Description: 12px, gray, below filename
- Date: 12px, gray, right-aligned
- Action buttons: 12px, dark border, 6px 12px padding, 4px radius
- Spacing between rows: 8px
- Row padding: 12px 16px

### 4.5 Document Preview Section

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Document Preview                                [Download]    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ╔══════════════════════════════════════════════════════╗ │ │
│  │ ║                                                      ║ │ │
│  │ ║  Affective Economies in Digital Spaces               ║ │ │
│  │ ║                                                      ║ │ │
│  │ ║  Abstract: This paper examines the circulation       ║ │ │
│  │ ║  of affect within digital communities...             ║ │ │
│  │ ║                                                      ║ │ │
│  │ ║  Lorem ipsum dolor sit amet, consectetur...          ║ │ │
│  │ ║                                                      ║ │ │
│  │ ╚══════════════════════════════════════════════════════╝ │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Section title: 18px, serif, left-aligned
- Download button: Right-aligned in title row, 13px, dark border
- Outer container: Medium gray background (#999)
- Document "page": White background, centered, 650px width
- Document padding: 60px 80px
- Document min-height: 500px
- Document shadow: 0 2px 8px rgba(0,0,0,0.15)
- Document title: 22px, serif, centered
- Document body: 14px, serif, 1.8 line height
- Use lorem ipsum for body text

### 4.6 Reviewers Section (Conditional - Peer Review Stage)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Reviewers                                                     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Reviewer 1: Dr. Sarah Johnson                           │ │
│  │ Status: ✓ Review Submitted (Feb 5, 2024)               │ │
│  │                                                          │ │
│  │                    [View Review]  [Send Reminder]       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Reviewer 2: Prof. Michael Chen                          │ │
│  │ Status: ⏳ Pending (Due: Feb 15, 2024)                  │ │
│  │                                                          │ │
│  │                    [Send Reminder]  [Reassign]          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [+ Assign Additional Reviewer]                                │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Section title: 18px, serif
- Reviewer cards: Light gray background (#F5F5F5), 1px border, 6px radius
- Reviewer name: 14px, bold
- Status line: 13px, gray
- Checkmark (✓): Green circle (use text symbol or simple filled circle)
- Hourglass (⏳): Yellow/amber (use text symbol or outlined circle)
- Buttons: 13px, padding 6px 12px, 4px radius
- Card spacing: 12px between
- Add button: 14px, dashed border, full width

### 4.7 Activity & History Section

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Activity & History                                            │
│                                                                 │
│  Feb 10, 2024  •  Author uploaded v3 revision                  │
│  Feb 5, 2024   •  Reviewer 1 submitted review                  │
│  Jan 25, 2024  •  Editor assigned reviewers                    │
│  Jan 22, 2024  •  Author uploaded v2 revision                  │
│  Jan 20, 2024  •  Editor requested revisions (desk review)     │
│  Jan 15, 2024  •  Author submitted manuscript                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Section title: 16px, serif
- Background: Light gray (#F5F5F5), 8px radius
- Padding: 20px
- Activity items: 14px line height 1.6
- Date: Gray (#666), 100px min-width
- Bullet: Use "•" character, gray
- Description: Black text
- Spacing between items: 12px
- Entire section: 24px margin top

### 4.8 Actions Panel (Role-Based)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Actions                                                       │
│                                                                 │
│  [Approve for Peer Review]  [Request Revisions]  [Desk Reject]│
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Section title: 18px, serif
- Border top: 1px solid (#E0E0E0), 24px padding top
- Buttons: 14px, padding 12px 24px, 6px radius, inline display
- Primary action: Dark background (#333), white text, bold
- Secondary actions: White background, dark border, dark text
- Destructive action: Medium gray background, dark text
- Button spacing: 12px gap
- Button states:
  - Hover: Slight darkening
  - Disabled: Light gray, reduced opacity

**Actions by Status:**

**In Desk Review (Editor):**

```
[Approve for Peer Review]  [Request Revisions]  [Desk Reject]
  (primary)                  (secondary)           (destructive)
```

**In Peer Review - Both Reviews Complete (Editor):**

```
[Accept]  [Accept w/ Minor Changes]  [Conditional Accept]
[Revise & Resubmit]  [Reject]
```

**In Desk Review (Author):**

```
[Upload Revised Version]  [Withdraw Submission]
   (primary)                 (destructive)
```

**In Peer Review (Reviewer - assigned but not submitted):**

```
[Submit Review]
  (primary)
```

### 4.9 Review Display (When Viewing Submitted Reviews)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Review from Reviewer 1                                        │
│  Submitted: February 5, 2024                                   │
│                                                                 │
│  Recommendation: Accept with Minor Changes                     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ This manuscript presents a compelling argument about     │ │
│  │ digital affect. The theoretical framework is solid,      │ │
│  │ though I'd suggest expanding the section on methodology. │ │
│  │ I recommend accept with minor revisions to strengthen    │ │
│  │ the empirical claims.                                    │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Title: 16px, bold
- Date: 13px, gray
- Recommendation: 14px, bold, 8px margin bottom
- Review text box: Light gray background (#F5F5F5), left border 4px dark gray
- Review text: 14px, italic, line height 1.6
- Box padding: 16px
- Box margin: 12px top

---

## 5. SUBMISSION FORM PAGE

### 5.1 Form Header

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Submit Your Work                                              │
│  We welcome submissions that engage with affect theory and     │
│  cultural studies. Please complete the form below.             │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Title: 32px, serif, bold
- Description: 15px, gray, line height 1.6, max width 700px
- Margin bottom: 32px

### 5.2 Form Fields

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Article Title *                                               │
│  [                                                          ]  │
│                                                                 │
│  First Name *              Last Name *                         │
│  [                  ]      [                  ]                │
│                                                                 │
│  Email Address *                                               │
│  [                                                          ]  │
│                                                                 │
│  Institutional Affiliation                                     │
│  [                                                          ]  │
│                                                                 │
│  Short Biography (200 words max)                               │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│                                                                 │
│  Manuscript File *                                             │
│  ┌────────────────────────────────────────────────────────┐   │
│  │        ┌────────┐                                      │   │
│  │        │   📄   │                                      │   │
│  │        └────────┘                                      │   │
│  │                                                        │   │
│  │   Drop your manuscript here or click to browse        │   │
│  │   Accepted formats: .doc, .docx, .rtf (max 10MB)      │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Submit Manuscript]  [Save as Draft]                         │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

**Labels:**

- 14px, bold, margin bottom 8px
- Required fields marked with red asterisk (\*)

**Text Inputs:**

- Height: 44px
- Border: 1px solid #E0E0E0
- Border radius: 6px
- Padding: 12px 16px
- Font size: 15px
- Full width (or 48% for side-by-side fields)
- Margin bottom: 24px

**Text Input States:**

- Default: Light border
- Focus: Darker border (#999), no outline
- Error: Red border, red text below showing error message
- Disabled: Light gray background, reduced opacity

**Textarea:**

- Height: 120px (approx 4 rows)
- Resize: vertical only
- All other specs same as text inputs

**File Upload Area:**

- Height: 160px
- Dashed border: 2px dashed #CCC
- Border radius: 8px
- Background: Very light gray (#FAFAFA)
- Center-aligned content
- Icon: 32px placeholder or simple document icon
- Primary text: 15px
- Secondary text: 13px, gray
- Hover state: Slightly darker background
- Cursor: pointer

**Submit Buttons:**

- Primary (Submit): Dark background, white text, 15px, padding 14px 32px
- Secondary (Save): Light border, dark text, 15px, padding 14px 24px
- Border radius: 6px
- Margin top: 24px
- Gap between: 12px

**Form Container:**

- White background
- 1px border (#E0E0E0)
- 8px radius
- Padding: 32px
- Max width: 800px

---

## 6. REVIEWER ASSIGNMENT MODAL

**Trigger:** Clicked "Assign Reviewers" button

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Assign Reviewers                                     [X]      │
│                                                                 │
│  [Search reviewers by name or expertise...              ]  [🔍]│
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [ ] Dr. Sarah Johnson                                   │ │
│  │     Northwestern University                             │ │
│  │     Keywords: affect theory, digital media              │ │
│  │     Reviews completed: 12 | Avg turnaround: 14 days     │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ [✓] Prof. Michael Chen                                  │ │
│  │     Stanford University                                 │ │
│  │     Keywords: cultural studies, architecture            │ │
│  │     Reviews completed: 8 | Avg turnaround: 18 days      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  [+ Add New Reviewer]                                          │
│                                                                 │
│  Selected: 1 of 2 required                                     │
│                                                                 │
│  [Cancel]                                    [Assign Reviewers]│
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Modal overlay: Semi-transparent dark (#00000080)
- Modal box: White, 600px width, centered, 8px radius
- Modal padding: 32px
- Close button: Top right, 24px, gray, hover to black
- Search bar: Full width, 44px height, with search icon
- Reviewer cards: Light gray background, 1px border, 8px radius
- Checkbox: 20px, left-aligned in card
- Reviewer name: 16px, bold
- Affiliation: 14px, gray
- Keywords: 13px, gray, margin top 4px
- Stats: 12px, gray
- Card padding: 16px
- Card margin: 12px between
- Selected state: Darker border, light blue/gray tint
- Add button: Dashed border, full width
- Counter text: 14px, gray, right-aligned
- Action buttons: Same as primary/secondary button specs
- Max height: 70vh with scroll if needed

---

## 7. REVIEW SUBMISSION FORM (Reviewer Interface)

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Submit Review                                                 │
│  Submission #2024-034                                          │
│  "Affective Economies in Digital Spaces..."                    │
│                                                                 │
│  Your Recommendation *                                         │
│  [Select recommendation                                    ▼]  │
│    - Accept                                                    │
│    - Accept with Minor Changes                                 │
│    - Conditional Accept                                        │
│    - Revise and Resubmit                                       │
│    - Reject                                                    │
│                                                                 │
│  Detailed Review *                                             │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│                                                                 │
│  Confidential Comments to Editor (optional)                    │
│  [                                                          ]  │
│  [                                                          ]  │
│  [                                                          ]  │
│                                                                 │
│  Annotated Manuscript (optional)                               │
│  [Drop file here or click to browse                        ]  │
│                                                                 │
│  [Save Draft]                                [Submit Review]   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Page title: 28px, serif
- Submission info: 14px, gray, margin bottom 32px
- Labels: 14px, bold, required asterisk
- Dropdown: Full width, 44px height
- Dropdown arrow: Right side, gray
- Textarea (review): 300px height, all text input specs
- Textarea (confidential): 120px height
- File upload: 100px height, dashed border, same as form upload
- Buttons: Standard primary/secondary specs
- Form in white card with padding

---

## 8. ADMIN BULK IMPORT INTERFACE

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Bulk Import Reviewers                                         │
│                                                                 │
│  Upload CSV file with reviewer information                     │
│  Required columns: first_name, last_name, email, affiliation   │
│  Optional columns: expertise_keywords (comma-separated)        │
│                                                                 │
│  [Download Template CSV]                                       │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │   Drop CSV file here or click to browse               │   │
│  │   .csv files only                                      │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Preview (first 5 rows):                                       │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Name           | Email              | Affiliation      │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │ Sarah Johnson  | sj@example.com     | Northwestern     │   │
│  │ Michael Chen   | mchen@stanford.edu | Stanford         │   │
│  │ ...                                                    │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Cancel]                                         [Import (23)]│
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Specifications:**

- Template button: Secondary button style
- Upload area: 120px height, dashed border
- Preview table: 1px borders, zebra striping (alternating light gray rows)
- Table headers: Bold, dark gray background
- Table cells: 12px, padding 8px
- Count in import button: Shows number of valid rows

---

## 9. RESPONSIVE BEHAVIOR

### Mobile Breakpoints:

- **Desktop:** > 1024px (as designed above)
- **Tablet:** 768px - 1023px
- **Mobile:** < 768px

### Mobile Adaptations:

**Navigation:**

- Stack logo and links vertically
- Hamburger menu icon for navigation
- User name moves to dropdown menu

**Dashboard Cards:**

- Full width, reduce padding to 16px
- Stack submission ID and date
- Reduce font sizes by 2px

**Submission Detail:**

- Timeline becomes vertical (top to bottom)
- File version cards stack
- Action buttons stack vertically, full width
- Reduce padding throughout

**Forms:**

- All inputs full width (no side-by-side)
- Reduce padding to 16px
- Buttons stack vertically

**Modals:**

- Full screen on mobile
- Reduce padding

---

## 10. INTERACTION ANNOTATIONS

### Numbered Interaction Points:

**[1] Submission Cards**

- Click anywhere on card → Navigate to submission detail
- Hover → Show subtle shadow

**[2] Status Badges**

- Static display, no interaction
- Tooltip on hover showing status description (optional)

**[3] Action Buttons**

- Click → Execute action or open modal
- Disabled state when action not available
- Loading state during processing

**[4] File Upload Areas**

- Click → Open file browser
- Drag and drop → Show highlight state
- After upload → Show filename and size

**[5] Timeline**

- Static display showing progress
- Completed stages show checkmark
- Current stage highlighted

**[6] Activity Feed**

- Chronological list, newest first
- Auto-updates when new activity occurs
- Each item shows timestamp, user, action

**[7] Navigation Links**

- Click → Navigate to page
- Current page underlined
- Hover → Darken text

**[8] Search/Filter**

- Type in search → Filter results in real-time
- Dropdown → Filter by selected status
- Clear button appears when filters active

**[9] Reviewer Assignment**

- Click checkbox → Toggle selection
- Search → Filter reviewer list
- Add new → Open form in modal

**[10] Back Button**

- Click → Return to previous page
- Browser back also works

---

## 11. STATE VARIATIONS TO SHOW

For each major page, show these states:

**Dashboard:**

1. Empty state (no submissions)
2. Populated state (4-5 submissions)
3. Filtered state (showing search results)

**Submission Detail:**

1. In Desk Review (Editor view) - show action buttons
2. In Peer Review (Editor view) - show reviewers section
3. In Peer Review (Author view) - limited info, no reviewer names
4. In Peer Review (Reviewer view) - show review form
5. Conditional Accept (Editor view) - show editor/author communication
6. In Copy Editing - show copy editor status

**Forms:**

1. Empty form
2. Partially filled (show validation)
3. Error state (show error messages)
4. Success state (confirmation message)

**Modals:**

1. Reviewer assignment (0 selected)
2. Reviewer assignment (1 selected)
3. Reviewer assignment (2 selected - ready)

---

## 12. WIREFRAME LAYOUT EXAMPLES

### Standard Page Layout:

```
┌─────────────────────────────────────────────────────────────┐
│ Role Switcher (testing only)                                │
├─────────────────────────────────────────────────────────────┤
│ Global Navigation                                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  Page Content (max-width: 1200px, centered)        │   │
│  │                                                     │   │
│  │  - Page header                                      │   │
│  │  - Filters (if applicable)                          │   │
│  │  - Main content area                                │   │
│  │  - Actions (if applicable)                          │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Two-Column Layout (Detail Pages):

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────────┐  ┌─────────────────────────────┐ │
│  │                      │  │                             │ │
│  │  Main Content        │  │  Sidebar                    │ │
│  │  (70% width)         │  │  (28% width)                │ │
│  │                      │  │                             │ │
│  │  - Header            │  │  - Quick info               │ │
│  │  - Timeline          │  │  - Actions                  │ │
│  │  - Files             │  │  - Related items            │ │
│  │  - Preview           │  │                             │ │
│  │                      │  │                             │ │
│  └──────────────────────┘  └─────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 13. COMPONENT LIBRARY

**Buttons:**

```
Primary: [Submit]
  - Dark bg (#333), white text, 14px, padding 12px 24px, 6px radius

Secondary: [Cancel]
  - White bg, dark border, dark text, same sizing

Destructive: [Delete]
  - Medium gray bg, dark text, same sizing

Ghost: [Skip]
  - No bg, no border, underline on hover
```

**Form Elements:**

```
Text Input: [          ]
  - 44px height, 1px border, 6px radius, 15px text

Textarea: [          ]
          [          ]
  - Variable height, same styling as input

Dropdown: [Select ▼]
  - 44px height, arrow icon right-aligned

Checkbox: [✓] Label text
  - 20px square, checkmark when selected

Radio: (•) Label text
  - 20px circle, filled when selected
```

**Status Badges:**

```
[In Review] [Accepted] [Rejected]
  - 13px text, 4px padding vertical, 12px horizontal
  - Light bg, dark border, 4px radius
```

**Cards:**

```
┌─────────────────────┐
│  Card Title         │
│  Card content here  │
│  and here           │
└─────────────────────┘
  - White bg, 1px border, 8px radius, 20px padding
```

---

## 14. TYPOGRAPHY SCALE

```
H1 (Page Title):     32px, Serif, Bold
H2 (Section):        24px, Serif, Bold
H3 (Subsection):     18px, Serif, Bold
H4 (Card Title):     16px, Sans-serif, Bold
Body Large:          15px, Sans-serif, Regular
Body:                14px, Sans-serif, Regular
Body Small:          13px, Sans-serif, Regular
Caption:             12px, Sans-serif, Regular
Label:               14px, Sans-serif, Bold
Monospace:           14px, Monospace, Regular
```

---

## 15. SPACING SYSTEM

```
XXS:  4px   - Inline spacing, tight elements
XS:   8px   - Small gaps, field label to input
S:    12px  - Related elements, button text padding
M:    16px  - Card padding, standard gaps
L:    24px  - Section spacing, form field margins
XL:   32px  - Major section dividers, page padding
XXL:  48px  - Page top/bottom margins
```

---

## 16. PRIORITY PAGES FOR WIREFRAMES

**High Priority (Must Have):**

1. Dashboard - Editor view with populated submissions
2. Submission Detail - In Peer Review state (Editor view)
3. Submission Detail - In Peer Review state (Author view)
4. Submission Form
5. Reviewer Assignment Modal
6. Review Submission Form

**Medium Priority (Should Have):** 7. Dashboard - Author view 8. Dashboard - Reviewer view 9. Submission Detail - In Desk Review (Editor view) 10. Submission Detail - Conditional Accept state 11. Empty states for dashboard

**Lower Priority (Nice to Have):** 12. Admin bulk import interface 13. System settings page 14. User profile page 15. Email template editor

---

## 17. ANNOTATIONS TO INCLUDE

On each wireframe, include:

**Numbered Elements:**

- [1], [2], [3] etc. for interactive elements
- Legend explaining what each number means

**State Indicators:**

- "STATE: Logged in as Editor"
- "STATUS: In Peer Review"
- "SHOWING: 2 of 4 reviewers assigned"

**Conditional Visibility:**

- Dotted lines around elements that appear conditionally
- Notes like "(Only visible to Editor role)"
- "(Only when status = X)"

**Interaction Notes:**

- Arrows showing flow (click here → opens modal)
- Hover states indicated
- Error states shown

**Technical Notes:**

- "Max width: 1200px"
- "Scrollable area"
- "Fixed header"
- "Responsive: stacks on mobile"

---

## 18. FILE DELIVERABLES REQUESTED

1. **Individual page wireframes** (PNG or PDF):

   - Dashboard - Editor view
   - Dashboard - Author view
   - Dashboard - Reviewer view
   - Submission Detail - Various states (6-8 variants)
   - Submission Form
   - Review Submission Form

2. **Modal overlays**:

   - Reviewer Assignment Modal
   - Confirmation dialogs
   - Error messages

3. **Component library sheet**:

   - All buttons states
   - All form elements
   - Cards
   - Status badges
   - Navigation elements

4. **User flow diagram** (optional):

   - Author submission flow
   - Editor review flow
   - Reviewer workflow

5. **Responsive variants** (optional):
   - Key pages at mobile size
   - Key pages at tablet size

---

This specification should provide complete guidance for creating comprehensive wireframes of the Capacious journal management system. All wireframes should be grayscale, low-fidelity, focused on layout and functionality rather than visual design.
