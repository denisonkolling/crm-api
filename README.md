<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Enterprise CRM System

A robust Customer Relationship Management (CRM) system designed to help businesses manage their sales pipeline, customer interactions, and marketing campaigns effectively.

## 🌟 Features

- **Account Management**
  - Track company profiles and industry information
  - Manage business relationships
  - Website and contact information storage

- **Contact Management**
  - Store and organize customer contact details
  - Link contacts to respective accounts
  - Track communication history

- **Lead Management**
  - Track potential customers
  - Associate leads with campaigns
  - Convert leads into opportunities
  - Lead status tracking

- **Opportunity Pipeline**
  - Track sales opportunities
  - Manage deal stages and probability
  - Monitor expected close dates
  - Track competition and priorities
  - Calculate revenue forecasts

- **Campaign Management**
  - Create and track marketing campaigns
  - Set campaign timelines
  - Monitor campaign effectiveness
  - Track campaign status

- **Task Management**
  - Create and assign tasks
  - Set due dates and priorities
  - Link tasks to accounts, leads, or opportunities
  - Track task completion status

- **Event Tracking**
  - Schedule and manage meetings
  - Track event locations and times
  - Associate events with accounts and leads

- **Tag System**
  - Flexible tagging system for all entities
  - Custom color coding
  - Improved organization and filtering

## 💾 Database Schema

### Core Tables

- `tab_accounts` - Company/Organization information
- `tab_contacts` - Individual contact details
- `tab_leads` - Potential customer tracking
- `tab_opportunities` - Sales opportunity pipeline
- `tab_campaigns` - Marketing campaign management
- `tab_tasks` - Task management system
- `tab_events` - Event and meeting tracking
- `tab_users` - System user management
- `tab_tags` - Tagging system
- `tab_taggables` - Tag relationships

## 🔧 Technical Details

### Technology Stack

- PostgreSQL Database
- MikroORM for database migrations
- RESTful API architecture

### Key Database Features

- Soft delete support across entities
- Referential integrity with foreign key constraints
- Timestamp tracking for critical operations
- Flexible tagging system for all entities

## 🔒 Security Features

- User authentication and authorization
- Password encryption
- Secure user sessions
- Role-based access control

## 📊 Business Intelligence

The system supports various business analytics through:
- Sales pipeline tracking
- Campaign performance metrics
- Lead conversion analysis
- Activity tracking
- Revenue forecasting

## 🚀 Getting Started

1. Clone the repository
2. Set up PostgreSQL database
3. Run database migrations
4. Configure environment variables
5. Install dependencies
6. Start the application

## 📝 Database Configuration

```sql
# Example database configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=crm_database
DB_USER=your_username
DB_PASSWORD=your_password
```

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support questions, please create an issue in the repository or contact our support team.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
