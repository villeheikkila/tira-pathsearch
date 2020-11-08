import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import Dijkstra from "../src/algorithms/dijkstra.ts";

Deno.test("test dijkstra with simple input", () => {
  const dijkstra = new Dijkstra();

  dijkstra.createVertex(2);
  dijkstra.createVertex(3);
  dijkstra.createVertex(4);
  dijkstra.createVertex(5);

  dijkstra.createPath(2, 3, 3);
  dijkstra.createPath(3, 2, 3);
  dijkstra.createPath(3, 4, 3);
  dijkstra.createPath(4, 3, 3);
  dijkstra.createPath(2, 5, 1);
  dijkstra.createPath(5, 2, 1);
  dijkstra.createPath(5, 4, 1);
  dijkstra.createPath(4, 5, 1);

  assertEquals(dijkstra.path(2, 4), [5, 2]);
});
