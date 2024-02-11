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
  public id: string;

  @Column
  public first_name: string;

  @AllowNull
  @Column
  public last_name: string | null;

  @Unique
  @Column
  public email: string;

  @CreatedAt
  @Column
  public created_at: Date;

  @UpdatedAt
  @Column
  public updated_at: Date;

  @AllowNull
  @DeletedAt
  @Column
  public deleted_at: Date | null;

  @HasOne(() => AdminPassword, 'admin_id')
  public password: AdminPassword;
}
