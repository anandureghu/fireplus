# FirePlus

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
import FirePlus from "fireplus";

@Schema()
class User extends FirePlus {
  name: string;
  email: string;
  age?: number;

  constructor(data: Partial<User>) {
    super();
    this.name = data.name || "";
    this.email = data.email || "";
    this.age = data.age;
  }
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

Marks a class as a Firestore model. The class must extend `FirePlus`.

```typescript
@Schema()
class MyModel extends FirePlus {
  // ...
}
```

### FirePlus Class

Base class for all Firestore models. Provides CRUD operations and utility methods.

#### Constructor

```typescript
constructor(config?: FirebaseOptions | FirebaseApp)
```

Initializes a new FirePlus instance with optional Firebase configuration.

#### Static Methods

##### init(config?: FirebaseOptions | FirebaseApp): FirePlus

Initializes the FirePlus singleton with Firebase configuration.

##### findById(id: string): Promise<T | null>

Finds a document by ID.

##### findAll(): Promise<T[]>

Retrieves all documents in the collection.

##### findByField(field: string, value: any): Promise<T[]>

Finds documents by a specific field value.

##### findWhere(constraints: QueryConstraint[]): Promise<T[]>

Finds documents using Firestore query constraints.

##### findOne(constraints: QueryConstraint[]): Promise<T | null>

Finds the first document matching the query constraints.

##### findOneByField(field: string, value: any): Promise<T | null>

Finds the first document matching a specific field value.

#### Instance Methods

##### save(): Promise<string | null>

Saves the current document to Firestore.

##### update(): Promise<boolean>

Updates the current document in Firestore.

##### delete(): Promise<boolean>

Deletes the current document from Firestore.

##### getCollectionName(): string

Gets the collection name for the current model.

##### getPrimitiveProps(): DocumentData

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
class Product extends FirePlus {
  name: string;
  price: number;
  category: string;
  inStock: boolean;

  constructor(data: Partial<Product>) {
    super();
    this.name = data.name || "";
    this.price = data.price || 0;
    this.category = data.category || "";
    this.inStock = data.inStock || false;
  }

  // Custom methods
  async markAsOutOfStock() {
    this.inStock = false;
    await this.update();
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

If you find this library helpful, please consider giving it a star on GitHub!
