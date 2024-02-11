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
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

import { AdminRole } from './admin-role.model';
import { AdminRolePermission } from './admin-role-permission.model';

@Table({
  tableName: 'admin_permissions',
  modelName: 'AdminPermission',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class AdminPermission extends Model<AdminPermission> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id: string;

  @Column
  name: string;

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

  @HasMany(() => AdminRolePermission)
  role_permissions: AdminRolePermission[];

  @BelongsToMany(() => AdminRole, {
    through: {
      model: () => AdminRolePermission,
    },
  })
  roles: AdminRole[];
}
