import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm" 
import {v4 as uuid} from "uuid";

class Tag {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export {Tag}