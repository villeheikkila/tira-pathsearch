import Node from "./utils/node.ts";

export class Astar {
  graph: Node[];

  constructor() {
    this.graph = [];
  }

  /**
   *
   * @param first - The starting Node
   * @param dest - The destination node in the graph
   *
   */
  path(first: Node, dest: Node) {
    let openSet: AstarNode[] = [];
    let closedSet: AstarNode[] = [];

    let next: AstarNode | null = new AstarNode(
      0,
      heuristic(first.x, dest.x, first.y, dest.y),
      null,
      first
    );

    while (next.d !== dest) {
      let current: AstarNode | null = null;
      let currentIndex = -1;

      for (let i = 0; i < openSet.length; i++) {
        if (current === null || current.cost() > openSet[i].cost()) {
          current = openSet[i];
          currentIndex = i;
        }
      }

      if (current !== null) {
        openSet.splice(currentIndex, 1);
        closedSet = [...closedSet, current];
        next = current;
      }

      const nodes = next.d.nodes;

      for (let i = 0; i < nodes.length; i++) {
        let index = -1;
        let addToOpen = true;

        for (let j = 0; j < openSet.length; j++) {
          if (openSet[j].d.x === nodes[i].x && openSet[j].d.y === nodes[i].y) {
            index = j;
          }
        }

        for (let k = 0; k < closedSet.length; k++) {
          if (
            closedSet[k].d.x === nodes[i].x &&
            closedSet[k].d.y === nodes[i].y
          ) {
            addToOpen = false;
          }
        }

        const node = nodes[i];

        const g =
          next.g + node.weight * heuristic(node.x, next.d.x, node.y, next.d.y);

        const h = heuristic(node.x, dest.x, node.y, dest.y);

        if (index === -1 && addToOpen) {
          openSet = [...openSet, new AstarNode(g, h, next, node)];
        } else if (addToOpen && openSet[index].cost() > g + h) {
          openSet[index].g = g;
          openSet[index].h = h;
          openSet[index].parent = next;
        }
      }
    }

    let totalPath: Node[] = [];

    do {
      totalPath = [...totalPath, next.d];
      next = next.parent;
    } while (next !== null);

    return totalPath.reverse();
  }
}

const heuristic = (
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number
) => Math.sqrt(Math.pow(xEnd - xStart, 2) + Math.pow(yEnd - yStart, 2));

class AstarNode {
  public parent: AstarNode | null;
  public d: Node;
  public g: number;
  public h: number;

  constructor(g: number, h: number, parent: AstarNode | null, d: Node) {
    this.parent = parent;
    this.d = d;
    this.g = g;
    this.h = h;
  }

  public cost() {
    return this.h + this.g;
  }
}
