"use strict";

type ID = string | number;
type Role = "admin" | "user";
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: Error };

interface Profile {
  readonly id: ID;
  name: string;
  role: Role;
  address?: {
    city: string;
    coordinates: readonly [number, number];
  };
  greet?(message: string): void;
}

class User<T extends Profile> {
  static count = 0;
  private active = true;

  constructor(public profile: T) {
    User.count++;
  }

  get isActive(): boolean {
    return this.active;
  }

  toggle(): void {
    this.active = !this.active;
  }

  async load(): Promise<Result<T>> {
    try {
      const data = await Promise.resolve(this.profile);
      return { ok: true, data };
    } catch (error: unknown) {
      return {
        ok: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  }
}

const profile = {
  id: 1,
  name: "Danila",
  role: "admin",
  address: {
    city: "Tallinn",
    coordinates: [59.437, 24.7536],
  },

  greet(message: string) {
    console.log(`${message}, ${this.name}!`);
  },
} satisfies Profile;

const user = new User(profile);

const {
  name,
  address: { city, ...location },
} = user.profile;

const values: number[] = [1, 2, 3, 4];

const total = values
  .filter((value) => value % 2 === 0)
  .map((value) => value ** 2)
  .reduce((sum, value) => sum + value, 0);

function format(value: string | number): string {
  switch (typeof value) {
    case "string":
      return value.trim().toUpperCase();

    case "number":
      return value.toFixed(2);

    default:
      return "Unknown";
  }
}

async function main(): Promise<void> {
  user.profile.greet?.("Hello");
  user.toggle();

  const result = await user.load();
  const pattern = /^[A-Z][a-z]+$/;

  if (result.ok && pattern.test(result.data.name)) {
    for (const value of values) {
      console.log(value);
    }
  } else if (!result.ok) {
    console.error(result.error.message);
  }

  console.log({
    name: format(name),
    city: city ?? "Unknown",
    location,
    total,
    active: user.isActive,
    users: User.count,
  });
}

void main();
