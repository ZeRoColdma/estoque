import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
