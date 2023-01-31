export class Tree {
  public data: any;
  private isMatched = false;
  private hasMatchedChildren = false;
  private options: TreeOptions;
  private children: Array<Tree> = [];
  private depth: number;
  private childCount = 0;
  public hidden = false;

  constructor(data: any, options: TreeOptions, depth: number, hidden = false) {
    this.options = options;
    this.depth = depth;
    this.data = options.dataKey ? data[options.dataKey] : data;
    this.hidden = hidden;

    this.setChildren();
  }

  filter(searchText: string): boolean {
    this.hasMatchedChildren = false;
    if (searchText && searchText.length > 0) {
      const matches = this.data[this.options.nameKey]
        .toLowerCase()
        .match(searchText.toLowerCase());
      this.isMatched = !!matches && matches.length > 0;
    } else {
      this.isMatched = false;
    }

    this.children.forEach(child => {
      const matchFound = child.filter(searchText);
      this.hasMatchedChildren = this.hasMatchedChildren || matchFound;
    });

    return this.isMatched || this.hasMatchedChildren;
  }

  flatten(onlyMatched = false): Array<Tree> {
    let nodes: Array<Tree> = [];

    if (onlyMatched && !this.isMatched && !this.hasMatchedChildren) {
      return [];
    }

    if (!this.hidden) {
      nodes.push(this);
    }

    this.children.forEach(child => {
      const childNodes = child.flatten(onlyMatched);
      nodes = [...nodes, ...childNodes];
    });

    return nodes;
  }

  countChildUnits(unit, count) {
    count += unit.children.length;

    unit.children.forEach(child => {
      count = this.countChildUnits(child, count);
    });

    return count;
  }

  private getChildrenByKey(data: any, keys: Array<string>): Array<any> {
    if (keys.length === 1) {
      return data[keys[0]] || [];
    } else {
      return this.getChildrenByKey(
        data[keys[0]],
        keys.splice(1, keys.length - 1)
      );
    }
  }

  private setChildren(): void {
    const key = this.options.childrenKey;
    const keyedChildren = this.getChildrenByKey(
      this.data,
      this.options.childrenKey.split('.')
    );

    if (keyedChildren.length > 0) {
      let childDepth = this.depth + 1;

      if (this.hidden) {
        childDepth = this.depth;
      }

      keyedChildren.forEach(child => {
        this.children.push(new Tree(child, this.options, childDepth));
      });
    } else {
      this.children = [];
    }

    this.childCount = this.countChildUnits(this, 0);
  }
}

export interface TreeOptions {
  dataKey?: string;
  childrenKey: string;
  nameKey: string;
  initialValue?: string;
}
