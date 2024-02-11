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

import { Admin } from '../../admin/models/admin.model';

@Table({
  tableName: 'admin_passwords',
  modelName: 'AdminPassword',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class AdminPassword extends Model<AdminPassword> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  admin_id: string;

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

  @BelongsTo(() => Admin, 'admin_id')
  admin: Admin;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(adminPassword: AdminPassword) {
    adminPassword.password = await bcrypt.hash(adminPassword.password, 10);
  }
}
