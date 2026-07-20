"use strict";

// Primitive types
const username: string = "Danila";
const age: number = 28;
const isDeveloper: boolean = true;
const emptyValue: null = null;
const missingValue: undefined = undefined;
const hugeNumber: bigint = 9_007_199_254_740_991n;
const uniqueKey: symbol = Symbol("user-id");

// Literal, union, nullable, and template literal types
type Theme = "dark" | "light" | "system";
type Identifier = string | number;
type ApiRoute = `/api/${string}`;
type EventName<T extends string> = `on${Capitalize<T>}`;

const theme: Theme = "dark";
const route: ApiRoute = "/api/users";
const clickEvent: EventName<"click"> = "onClick";

// Arrays, tuples, readonly values
const numbers: number[] = [5, 10, 15, 20];
const languages: Array<string> = [
  "TypeScript",
  "JavaScript",
  "Lua",
];

const coordinates: readonly [latitude: number, longitude: number] = [
  59.437,
  24.7536,
];

const userTuple: [
  id: Identifier,
  name: string,
  active: boolean,
  theme?: Theme,
] = [1, username, true, theme];

// Enum
enum Permission {
  Read = "READ",
  Write = "WRITE",
  Delete = "DELETE",
}

// Nested object types
type Address = {
  country: string;
  city: string;
  street: {
    name: string;
    number: number;
    apartment?: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
};

interface User {
  readonly id: Identifier;
  username: string;
  age: number;
  active: boolean;
  theme: Theme;
  address: Address;
  tags: string[];
  permissions: Permission[];
  metadata: Record<string, unknown>;
  greet?(message?: string): string;
}

interface Admin extends User {
  accessLevel: 1 | 2 | 3 | 4 | 5;
}

// Deeply nested object
const admin: Admin = {
  id: uniqueKey.description ?? "unknown-id",
  username,
  age,
  active: isDeveloper,
  theme,
  accessLevel: 5,
  tags: languages,
  permissions: [
    Permission.Read,
    Permission.Write,
    Permission.Delete,
  ],
  address: {
    country: "Estonia",
    city: "Tallinn",
    street: {
      name: "Example Street",
      number: 12,
      apartment: 122,
      coordinates: {
        latitude: coordinates[0],
        longitude: coordinates[1],
      },
    },
  },
  metadata: {
    nullableValue: emptyValue,
    optionalValue: missingValue,
    hugeNumber,
    route,
    event: clickEvent,
    editor: {
      name: "Neovim",
      configuration: {
        languageServer: {
          name: "vtsls",
          enabled: true,
          settings: {
            diagnostics: {
              unusedVariables: true,
              unusedParameters: true,
            },
            formatting: {
              semicolons: true,
              indentation: {
                type: "spaces",
                size: 2,
              },
            },
          },
        },
        treeSitter: {
          enabled: true,
          parsers: [
            {
              language: "typescript",
              installed: true,
              captures: {
                keywords: true,
                functions: true,
                variables: true,
                properties: true,
              },
            },
          ],
        },
      },
    },
  },

  greet(message = "Hello"): string {
    return `${message}, ${this.username}`;
  },
};

// Recursive type
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const settings: JsonValue = {
  editor: {
    fontSize: 16,
    relativeNumbers: true,
    themes: ["TokyoNight", "Catppuccin", "OneDark"],
  },
};

// Generic types
type ApiSuccess<T> = {
  success: true;
  status: 200;
  data: T;
};

type ApiFailure = {
  success: false;
  status: 400 | 404 | 500;
  error: {
    message: string;
    code: string;
  };
};

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

type Entity<T> = T & {
  id: Identifier;
  createdAt: Date;
};

type UserPreview = Pick<User, "id" | "username" | "active">;
type EditableUser = Partial<User>;
type ImmutableUser = Readonly<User>;
type UserWithoutMetadata = Omit<User, "metadata">;

const preview: UserPreview = {
  id: admin.id,
  username: admin.username,
  active: admin.active,
};

const editableUser: EditableUser = {
  username: "Updated Danila",
};

const immutableUser: ImmutableUser = admin;

const userWithoutMetadata: UserWithoutMetadata = {
  id: admin.id,
  username: admin.username,
  age: admin.age,
  active: admin.active,
  theme: admin.theme,
  address: admin.address,
  tags: admin.tags,
  permissions: admin.permissions,
  greet: admin.greet,
};

const entity: Entity<{ title: string }> = {
  id: "article-1",
  title: "TypeScript Tree-sitter Test",
  createdAt: new Date(),
};

// Generic functions
function identity<T>(value: T): T {
  return value;
}

function getProperty<
  TObject extends object,
  TKey extends keyof TObject,
>(object: TObject, key: TKey): TObject[TKey] {
  return object[key];
}

function wrapValue<T>(value: T): { value: T } {
  return { value };
}

// Function overloads
function convert(value: string): number;
function convert(value: number): string;
function convert(value: string | number): string | number {
  return typeof value === "string"
    ? Number(value)
    : String(value);
}

// Optional, default, and rest parameters
function calculateTotal(
  discount = 0,
  ...values: number[]
): number {
  const total = values.reduce(
    (currentTotal, value) => currentTotal + value,
    0,
  );

  return total - discount;
}

// Type guard
function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    "username" in value &&
    "age" in value &&
    "active" in value
  );
}

// Assertion function
function assertDefined<T>(
  value: T,
  message: string,
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

// Abstract class, inheritance, access modifiers, getter
abstract class Repository<
  TEntity extends { id: Identifier },
> {
  protected readonly storage = new Map<
    Identifier,
    TEntity
  >();

  public abstract validate(entity: TEntity): boolean;

  public save(entity: TEntity): this {
    if (!this.validate(entity)) {
      throw new TypeError("Invalid entity");
    }

    this.storage.set(entity.id, entity);
    return this;
  }

  public findById(id: Identifier): TEntity | undefined {
    return this.storage.get(id);
  }

  public get size(): number {
    return this.storage.size;
  }

  public *values(): Generator<TEntity, void, unknown> {
    yield* this.storage.values();
  }
}

class UserRepository extends Repository<User> {
  #requestCount = 0;

  public constructor(
    private readonly sourceName: string,
  ) {
    super();
  }

  public override validate(user: User): boolean {
    return user.username.length > 0 && user.age >= 0;
  }

  public override save(user: User): this {
    this.#requestCount++;
    return super.save(user);
  }

  public get information(): string {
    return `${this.sourceName}: ${this.#requestCount} requests`;
  }
}

// Discriminated union
type Shape =
  | {
      kind: "circle";
      radius: number;
    }
  | {
      kind: "rectangle";
      width: number;
      height: number;
    }
  | {
      kind: "triangle";
      base: number;
      height: number;
    };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;

    case "rectangle":
      return shape.width * shape.height;

    case "triangle":
      return (shape.base * shape.height) / 2;

    default: {
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
    }
  }
}

// Async function and Promise
async function requestUser(
  user: User,
): Promise<ApiResult<User>> {
  await Promise.resolve();

  if (!isUser(user)) {
    return {
      success: false,
      status: 400,
      error: {
        code: "INVALID_USER",
        message: "The supplied value is not a user",
      },
    };
  }

  return {
    success: true,
    status: 200,
    data: user,
  };
}

async function runApplication(): Promise<void> {
  const repository = new UserRepository("Memory storage");

  repository.save(admin);

  const savedUser = repository.findById(admin.id);

  assertDefined(savedUser, "User was not found");

  const result = await requestUser(savedUser);

  if (result.success) {
    console.log(result.data.greet?.("Welcome"));
  } else {
    console.error(
      `${result.error.code}: ${result.error.message}`,
    );
  }

  for (const user of repository.values()) {
    console.log(user.username);
  }

  const areas = [
    calculateArea({
      kind: "circle",
      radius: 5,
    }),
    calculateArea({
      kind: "rectangle",
      width: 10,
      height: 4,
    }),
    calculateArea({
      kind: "triangle",
      base: 8,
      height: 3,
    }),
  ];

  const firstLanguage = getProperty(admin, "tags")[0];
  const wrappedPreview = wrapValue(preview);
  const convertedNumber = convert("42");
  const convertedString = convert(42);
  const total = calculateTotal(5, ...numbers);
  const identifiedTheme = identity(theme);

  const scores = new Map<string, number>([
    ["TypeScript", 100],
    ["JavaScript", 90],
    ["Lua", 85],
  ]);

  const selectedLanguages = new Set([
    "TypeScript",
    "Lua",
    firstLanguage,
  ]);

  const expressionResult =
    total > 30 && admin.active
      ? "Application is active"
      : "Application is inactive";

  console.log({
    userTuple,
    settings,
    editableUser,
    immutableUser,
    userWithoutMetadata,
    entity,
    wrappedPreview,
    convertedNumber,
    convertedString,
    identifiedTheme,
    repository: repository.information,
    areas,
    scores: Object.fromEntries(scores),
    selectedLanguages: [...selectedLanguages],
    expressionResult,
  });
}

void runApplication();
