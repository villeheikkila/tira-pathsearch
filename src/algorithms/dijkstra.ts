import Vertex from './vertex';

/**
 * Class that implements path search based on the Dijkstra's algorithm
 */
export default class Dijkstra {
    graph: Vertex;

    /**
     * Constructor initializes the empty graph
     */
    constructor() {
        this.graph = {} as Vertex;
    }

    /**
     * Apply the dijkstra's algorithm on the the graph created by from adding the vertices.
     *
     * @param first - The starting Node
     * @param dest - The destination node in the graph
     * @returns The the shortest path from the first node to the destination node
     *
     */
    path(first: number, dest: number) {
        let path: number[] = [];
        let next = dest;

        while (next !== first) {
            let shortest: number | null = null;
            let min = Infinity;

            for (const { weight, vertex } of this.graph[next].nodes) {
                if (weight < min) {
                    min = weight;
                    shortest = vertex;
                }
            }

            path = [...path, shortest];
            next = shortest;
        }

        return path;
    }

    /**
     * Adds a new vertex to the graph
     *
     * @param vertex - The number of the vertex to be created
     *
     */
    createVertex(vertex: number) {
        this.graph[vertex] = new Vertex(vertex);
    }

    /**
     * Apply the dijkstra's algorithm on the the graph created by from adding the vertices.
     *
     * @param vertex - The connected neighbor vertex
     * @param neighbor - The connected neighbor
     * @param weight - The weight of this connection
     *
     */
    createPath(vertex: number, neighbor: number, weight: number) {
        this.graph[vertex].createNode(neighbor, weight);
    }
}