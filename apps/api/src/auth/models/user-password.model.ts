import { UUIDV4 } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';

import { User } from '../../user/models/user.model';

@Table({
  tableName: 'user_passwords',
  modelName: 'UserPassword',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class UserPassword extends Model<UserPassword> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  user_id: string;

  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @AllowNull
  @DeletedAt
  @Column
  deleted_at: Date | null;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(userPassword: UserPassword) {
    userPassword.password = await bcrypt.hash(userPassword.password, 10);
  }
}
