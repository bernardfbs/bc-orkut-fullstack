import express from "express";
import * as notepadService from "./notepad/notepad.service.mjs";

const port = 8080;
const host = "0.0.0.0";
const app = express();

app.get("/teste", (req, res) => {
res.send ("hello world");
});

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});


PRISMA
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model comments {
  id                            Int       @id @default(autoincrement())
  message                       String
  created_at                    DateTime? @default(now())
  post_id                       Int
  user_id                       Int
  users_comments_user_idTousers users     @relation("comments_user_idTousers", fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  users_comments_post_idTousers users     @relation("comments_post_idTousers", fields: [post_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
}

model friends {
  id                          Int   @id @default(autoincrement())
  user_a                      Int
  user_b                      Int
  users_friends_user_bTousers users @relation("friends_user_bTousers", fields: [user_b], references: [id], onDelete: Cascade, onUpdate: NoAction)
  users_friends_user_aTousers users @relation("friends_user_aTousers", fields: [user_a], references: [id], onDelete: Cascade, onUpdate: NoAction)
}

model posts {
  id         Int       @id @default(autoincrement())
  content    String
  created_at DateTime? @default(now())
  user_id    Int
  users      users     @relation(fields: [user_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
}

model users {
  id                               Int        @id @default(autoincrement())
  first_name                       String
  last_name                        String
  avatar                           String
  idade                            Int?
  passwd                           String
  created_at                       DateTime?  @default(now())
  comments_comments_user_idTousers comments[] @relation("comments_user_idTousers")
  comments_comments_post_idTousers comments[] @relation("comments_post_idTousers")
  friends_friends_user_bTousers    friends[]  @relation("friends_user_bTousers")
  friends_friends_user_aTousers    friends[]  @relation("friends_user_aTousers")
  posts                            posts[]
}
