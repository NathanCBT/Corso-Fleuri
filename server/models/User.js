export class User {
  constructor(id, name, password, rule) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.rule = rule;
  }

  static fromRow(row) {
    return new User(row.IdUnique, row.Name, row.Password, row.Rule);
  }
}
