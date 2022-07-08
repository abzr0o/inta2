void main() {
  var s = new node('xxxx');

  s.say();
}

class node {
  dynamic val;
  node(val) {
    this.val = val;
  }
  void say() {
    print(this.val);
  }
}
