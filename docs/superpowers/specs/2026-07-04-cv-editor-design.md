# CV Editor - Design Specification

## Overview

A single-page English CV editor for individual job seekers, deployed on GitHub Pages. Core experience: fill in forms, see a live A4 preview render instantly. Supports 8 visual templates, version management, and an optional guided onboarding wizard. No login, no backend - all data stays in localStorage.

## Tech Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 (@tailwindcss/vite plugin)
- React Context + useReducer (state management)
- HashRouter (GitHub Pages compatible)
- html2pdf.js (PDF export)
- Leaflet + react-leaflet (map-based address picker)
- localStorage (data persistence)
- Oxlint (linter)

## Architecture

Two-column layout:
- Left panel: form editor (Traditional Chinese UI) with section navigation tabs
- Right panel: live A4 preview with 8 template options
- Each section has its own form component with dynamic add/remove
- Per-section font size control with independent override

## Data Model

Single CV object tree managed by one reducer:
- personal: fullName, email, phone, location, linkedIn, portfolio, photo (base64)
- summary: string
- experiences: {company, title, startDate, endDate, current, description}[]
- education: {school, degree, field, startDate, endDate}[]
- skills: {category, items}[]
- languages: {language, proficiency}[] (5 levels: Native-Basic)
- certifications: {name, issuer, date}[]
- projects: {name, url, description}[]
- customSections: {title, items: {heading, detail}[]}[]

Photo is optional, uploaded via FileReader, stored as base64. Drag-to-crop modal provided.

## Component Tree

App > ErrorBoundary > CVProvider
  OnboardingWizard (landing > 8-step wizard > editor)
  EditorLayout
    Toolbar (undo/redo, versions, export)
    SectionNav (tabs + reorder + font size slider)
    FormPanel (PersonalForm with MapPicker, SummaryForm, ExperienceForm, EducationForm, SkillsForm, LanguagesForm, CertificationsForm, ProjectsForm, CustomSectionsForm, CoverLetterForm)
    PreviewPanel (TemplateSelector, 8 templates, CoverLetterPreview)

## Onboarding Wizard

Three entry points: Start Building CV, Skip (loads sample), Write Cover Letter
8 steps: Personal Info (map + photo) > Summary > Experience > Education > Skills > Languages > Certifications > Template + naming
Defensive guards: empty entries, future dates, duplicates, empty skills (warn then force-proceed)

## Templates

Eight A4 templates: Classic, Modern, Minimal, Sidebar, Double Column, Timeline, Compact, Executive
Shared: accent color, 8 font families, font size 6-14pt (global + per-section), photo toggle

## Cover Letter Editor

Auto-fills CV personal info. Structured opening/body/closing with 4 tone options. Version-aware per-CV storage.

## State Management

Undo/Redo (Ctrl+Z/Y, 50-step), auto-save to localStorage, multi-version naming, section reorder with FLIP animation

## Validation

Email/phone format, required fields on blur, date range checks, future date flags, duplicate warnings, empty skill hints

## Storage Keys

cv-data / cv-version-{name}, cv-template, cv-cover-letter / cv-cover-letter-{name}, cv-section-order, cv-onboarded

## Deployment

vite build > dist/ > GitHub Pages (gh-pages branch), HashRouter, base: ./ , source maps disabled

## Security

CSP meta tag, ErrorBoundary, fully client-side (no API keys), .gitignore covers env and credential files