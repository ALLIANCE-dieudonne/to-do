//setting up ts


mkdir my-ts-node-project
cd my-ts-node-project
npm init -y


npm install typescript @types/node --save-dev

npx tsc --init

{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs", // Keep this as "commonjs" for compatibility with ts-node
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}


mkdir src
touch src/index.ts


const message: string = 'Hello TypeScript with Node.js!';
console.log(message);


npm install ts-node --save-dev


npm install nodemon --save-dev


npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev


Create .eslintrc.json:

{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off"
  }
}


Update the scripts section in your package.json:

{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "dev:watch": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts",
    "lint": "eslint . --ext .ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}




-----------------------
setting up prisma
----------------------------

setting up prisma

npm install prisma --save-dev
npm install @prisma/client

npx prisma init

DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"


generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}

npx prisma migrate dev --name init

npx prisma generate


yarn prisma:gen
# or
npm run prisma:gen



npx prisma studio --schema=src/prisma/schema.prisma