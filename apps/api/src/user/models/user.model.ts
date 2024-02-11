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
  Unique,
  HasOne,
} from 'sequelize-typescript';

import { UserPassword } from '../../auth/models/user-password.model';

@Table({
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id: string;

  @Column
  first_name: string;

  @AllowNull
  @Column
  last_name: string | null;

  @Unique
  @Column
  email: string;

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

  @HasOne(() => UserPassword, 'user_id')
  password: UserPassword;
}
