# CareFlow Operations Dashboard

## Project Overview

CareFlow Operations Dashboard is a responsive enterprise healthcare dashboard designed for hospital operations managers.

The application provides real-time visibility into patient flow, hospital capacity, staffing, operational performance, and executive reporting through a modern, data-driven interface.

This project is part of the Slalom Protogen P301 Case Study.

---

## Design Reference

This repository contains a complete HTML Design Reference:

careflow-operations-dashboard.html

The HTML file serves as the visual and interaction source of truth for the application.

The Vue application should faithfully recreate:

- Layout
- Navigation
- Color system
- Typography
- Component hierarchy
- Dashboard cards
- Charts
- Tables
- Alerts
- Filters
- Dark mode
- Responsive layouts
- Interactions
- Micro animations

The implementation should not redesign the experience.

Instead, convert the prototype into reusable Vue components using modern frontend architecture.

---

## Primary User

Hospital Operations Manager

Additional users include:

- Clinical Operations Director
- Chief Nursing Officer
- Emergency Department Manager
- Hospital Administrator

---

## User Goals

Hospital leaders should be able to quickly answer:

-  What requires immediate attention?

- Which departments are approaching capacity?

- How is patient flow performing?

- Are staffing levels sufficient?

- What operational risks exist?

---

## Dashboard Pages

## Executive Overview

Executive KPIs

Hospital Census

Admissions

Discharges

Occupancy

Emergency Wait Time

Critical Alerts

Capacity Summary

Recent Activity

---

## Patient Flow

Admissions

Discharges

Transfers

Length of Stay

Flow Diagram

Patient Trends

---

## Capacity

Department Occupancy

Bed Availability

Heat Maps

Capacity Gauge

Department Details

---

## Staffing

Coverage

Shift Staffing

Agency Staff

Open Positions

Staffing Risk

---

## Reports

Historical Trends

Quality Measures

Monthly Metrics

Report Exports

---

# Technology

Vue 3

TypeScript

Vite

Vuetify

Vue Router

Pinia

Chart.js

Material Design Icons

Mock JSON Data

---

## Design Principles

The interface should maintain the design language established in the HTML Design Reference.

Key principles include:

- Enterprise UX
- Information hierarchy
- Executive dashboards
- Data-first layouts
- Clean visual design
- Accessibility
- Responsive design
- Reusable components

---

## Accessibility

Support:

Keyboard navigation

ARIA labels

Accessible charts

Screen readers

High color contrast

Focus states

Reduced motion

WCAG AA compliance

---

## Development Guidelines

The HTML prototype should be translated into reusable Vue components.

Avoid inline styling.

Create reusable layouts and dashboard components.

Use TypeScript interfaces.

Keep business logic separate from UI.

Follow Vue best practices.

Maintain pixel-level visual consistency with the HTML prototype.

---

## Success Criteria

The finished application should look and behave like a modern enterprise healthcare dashboard.

Users should be able to quickly understand hospital performance and identify operational issues without searching through multiple systems.

The final application should closely match the supplied design reference while following modern frontend architecture.