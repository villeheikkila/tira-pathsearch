export default class Node {
  public nodes: Node[];
  public x: number;
  public y: number;
  public weight: number;

  constructor(x: number, y: number, weight: number) {
    this.nodes = [];
    this.x = x;
    this.y = y;
    this.weight = weight;
  }
}
