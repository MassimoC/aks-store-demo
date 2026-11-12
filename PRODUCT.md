# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Conference attendees explore a memorable seasonal storefront demo. Demo hosts use the companion admin application to show product inventory and order-management workflows.

## Product Purpose

AKS Store Demo is a conference showcase of a distributed retail application running on Azure Kubernetes Service. It demonstrates a browse-to-cart experience and an operational product-management surface; it is not a real transactional shop.

## Positioning

The demo pairs a customer-facing shop with an editable inventory console backed by the same product service, making a cloud-native retail workflow tangible in a live conference setting.

## Operating Context

The experience is shown in a conference/demo environment. Products are served by the product service and displayed in separate Vue storefront and admin applications. The cart may submit demonstration orders, but all commerce language must avoid implying real payment or fulfillment.

## Capabilities and Constraints

Existing browse, product-detail, cart, product CRUD, and order-management workflows remain functional. The catalog must include at least twelve capybara-themed holiday products with locally served images and credible descriptive content. The storefront and admin must remain separate Vue applications and consume the same product API.

## Brand Commitments

The selected brand direction is **Santa's Capybara Atelier**: a premium, festive winter-market identity built around capybara-themed products.

## Evidence on Hand

The repository contains working Vue storefront and admin apps, a Rust product service with seeded product data, and existing image-generation support in the AI service. No real payment, delivery, customer testimonial, or product-safety evidence is provided; the redesign must not invent such claims.

## Product Principles

- Make the cloud-native retail workflow immediately legible in a short live demo.
- Make the seasonal capybara concept feel intentional and cohesive across customer and operator surfaces.
- Keep operational tasks fast to scan and safe to demonstrate.
- Use believable catalog content without presenting fictional retail promises as fact.

