# FirePlus

[![npm version](https://badge.fury.io/js/fireplus.svg)](https://badge.fury.io/js/fireplus)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Compatible-orange.svg)](https://firebase.google.com/)
[![Downloads](https://img.shields.io/npm/dm/fireplus.svg)](https://www.npmjs.com/package/fireplus)
[![Build Status](https://github.com/anandureghu/fireplus/workflows/CI/badge.svg)](https://github.com/anandureghu/fireplus/actions)

A lightweight ORM library for Firebase Firestore that simplifies CRUD operations with TypeScript support.

## Features

- 🚀 Simple and intuitive API
- 📦 TypeScript support with full type safety
- 🔄 Automatic collection naming
- ⚡ Built-in CRUD operations
- 🎯 Decorator-based model definition
- 🔒 Singleton pattern for Firebase initialization

## Installation

```bash
npm install fireplus
# or
yarn add fireplus
```

## Quick Start

1. Initialize FirePlus with your Firebase configuration:

```typescript
import FirePlus from "fireplus";

FirePlus.init({
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});
```

2. Create a model using the `@Schema` decorator:

```typescript
import { Schema } from "fireplus";

@Schema()
class User {
  name: string;
  email: string;
  age?: number;
}
```

3. Use CRUD operations:

```typescript
// Create
const user = new User({ name: "John", email: "john@example.com" });
const id = await user.save();

// Read
const foundUser = await User.findById(id);
const allUsers = await User.findAll();
const usersByName = await User.findByField("name", "John");

// Update
user.name = "Jane";
await user.update();

// Delete
await user.delete();
```

## API Documentation

### Decorators

#### @Schema()

Marks a class as a Firestore model. The decorator automatically extends the class with FirePlus functionality.

```typescript
@Schema()
class MyModel {
  // Define your properties here
  name: string;
  email: string;
}
```

### FirePlus Class

Base class that provides CRUD operations and utility methods. Automatically applied by the `@Schema` decorator.

#### Static Methods

##### `init(config?: FirebaseOptions | FirebaseApp): FirePlus`

Initializes the FirePlus singleton with Firebase configuration.

##### `findById(id: string): Promise<T | null>`

Finds a document by ID.

##### `findAll(): Promise<T[]>`

Retrieves all documents in the collection.

##### `findByField(field: string, value: any): Promise<T[]>`

Finds documents by a specific field value.

##### `findWhere(constraints: QueryConstraint[]): Promise<T[]>`

Finds documents using Firestore query constraints.

##### `findOne(constraints: QueryConstraint[]): Promise<T | null>`

Finds the first document matching the query constraints.

##### `findOneByField(field: string, value: any): Promise<T | null>`

Finds the first document matching a specific field value.

#### Instance Methods

##### `save(): Promise<string | null>`

Saves the current document to Firestore.

##### `update(): Promise<boolean>`

Updates the current document in Firestore.

##### `delete(): Promise<boolean>`

Deletes the current document from Firestore.

##### `getCollectionName(): string`

Gets the collection name for the current model.

##### `getPrimitiveProps(): DocumentData`

Gets all primitive properties of the current instance.

## Examples

### Basic CRUD Operations

```typescript
// Create
const todo = new Todo({
  title: "Buy groceries",
  description: "Milk, eggs, bread",
});
const id = await todo.save();

// Read
const foundTodo = await Todo.findById(id);
const allTodos = await Todo.findAll();
const completedTodos = await Todo.findByField("completed", true);

// Update
todo.title = "Buy more groceries";
await todo.update();

// Delete
await todo.delete();
```

### Complex Queries

```typescript
// Find todos with multiple conditions
const activeTodos = await Todo.findWhere([
  where("completed", "==", false),
  where("createdAt", ">=", new Date(Date.now() - 24 * 60 * 60 * 1000)),
]);

// Find one todo by field
const todo = await Todo.findOneByField("title", "Buy groceries");
```

### Custom Models

```typescript
@Schema()
class Product {
  name: string;
  price: number;
  category: string;
  inStock: boolean;

  // Custom methods
  async markAsOutOfStock() {
    this.inStock = false;
    await this.update();
  }
}
```

## Advanced Usage

### Custom Collection Names

By default, FirePlus uses the pluralized and lowercased class name as the collection name. You can override this by implementing the `getCollectionName()` method in your model:

```typescript
@Schema()
class User {
  name: string;
  email: string;

  getCollectionName(): string {
    return "custom_users";
  }
}
```

### Accessing Primitive Properties

You can access the primitive properties of a model using the `getPrimitiveProps()` method:

```typescript
@Schema()
class Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  // Method to access primitive properties
  getProps() {
    return this.getPrimitiveProps();
  }
}

// Usage
const todo = new Todo({
  title: "Buy groceries",
  description: "Milk, eggs, bread",
});
console.log(todo.getProps());
// Output: { title: 'Buy groceries', description: 'Milk, eggs, bread', completed: false }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

Anandu Reghu - [GitHub](https://github.com/anandureghu) - [Email](mailto:dev.anandureghu@gmail.com)

## Support

If you find this library helpful, please consider giving it a star on GitHub!
