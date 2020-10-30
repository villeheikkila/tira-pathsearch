interface Node {
    vertex: number;
    weight: number;
}

export default class Vertex {
    vertex: number;
    nodes: Node[];

    constructor(vertex: number) {
        this.vertex = vertex;
        this.nodes = [];
    }

    createNode(vertex: number, weight: number) {
        this.nodes.push({ vertex, weight });
    }
}
