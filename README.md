## Apollo-link-state demo for WarsawJS

#### Setup

- Install required dependencies: `yarn` / `npm install`
- Run the application: `yarn start` / `npm start`

#### Development

There are three branches with differnet approaches to managing App State:

- `master` basic naive approach - cart data is kept in `this.state` and passed to children as `props`
- `redux-implementation` - data is kept in `redux` store and passed with `connect(mapStateToProps) HOC`
- `apollo-link-state-implementation` - data is handled by Apollo's local state

#### Database

- App is hooked up to `graphql` server running with [Prisma](https://www.prisma.io/)
- All data comes from [PUNK API](https://punkapi.com/)
