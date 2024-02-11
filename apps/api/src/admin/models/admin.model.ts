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

import { AdminPassword } from '../../auth/models/admin-password.model';

@Table({
  tableName: 'admins',
  modelName: 'Admin',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Admin extends Model<Admin> {
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

  @HasOne(() => AdminPassword, 'admin_id')
  password: AdminPassword;
}
