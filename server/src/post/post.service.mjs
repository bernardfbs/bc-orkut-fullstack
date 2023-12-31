import { db } from "../db.mjs";
import { createPostSchema } from "./schemas/create-post.schema.mjs";

export async function listPosts({ limit, offset }) {
  const posts = db
    .prepare(
      /* sql */ `
    select * from posts
      order by id desc limit ? offset ?`
    )
    .all(limit, offset);

  const { posts_count: count } = db
    .prepare(/* sql */ `select count(id) as posts_count from posts`)
    .get();

  return {
    posts,
    count,
  };
}

export async function createPost(data) {
  await createPostSchema.parseAsync(data);
  const nextPost = db
    .prepare(
      /* sql */ `
      insert into posts (content) values (?) returning *;`
    )
    .get(data.content);
  return nextPost;
}

export async function readPost(id) {
  const post = db.prepare(/* sql */ `select * from posts where id=?`).get(id);
  return post;
}

export async function updatePost(id, data) {
  const post = db
    .prepare(
      /* sql */ `
      update posts set content=? where id=? returning *;`
    )
    .get(data.content, id);
  return post;
}

export async function deletePost(id) {
  const post = db
    .prepare(/* sql */ `delete from posts where id=? returning *;`)
    .get(id);
  return post;
}