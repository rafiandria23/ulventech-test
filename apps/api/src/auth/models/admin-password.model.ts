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
  public id: string;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  public admin_id: string;

  @Column({
    type: DataType.TEXT,
  })
  public password: string;

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

  @BelongsTo(() => Admin, 'admin_id')
  public admin: Admin;

  @BeforeCreate
  @BeforeUpdate
  public static async hashPassword(adminPassword: AdminPassword) {
    adminPassword.password = await bcrypt.hash(adminPassword.password, 10);
  }
}
