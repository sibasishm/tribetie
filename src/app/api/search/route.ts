import { ilike } from "drizzle-orm";

import { db } from "~/server/db";
import { communities } from "~/server/db/schema";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const q = url.searchParams.get("q");

  if (!q) return new Response("Invalid query", { status: 400 });

  const results = await db.query.communities.findMany({
    where: ilike(communities.name, `${q}%`),
    limit: 5,
  });

  return new Response(JSON.stringify(results), { status: 200 });
}
