import Model from "./Model";
import Permission from "./Permission";
import Role from "./Role";
import DateModel from "./DateModel";

export default class User extends Model {
    private _id: number = 0;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _first_name: string = '';

    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    private _last_name: string = '';

    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    private _email: string = '';

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    private _permissions: Permission[] = [];

    get permissions(): Permission[] {
        return this._permissions;
    }

    set permissions(value: Permission[]) {
        this._permissions = value.map((item) => {
            return new Permission(item);
        });
    }

    private _roles: Role[] = [];

    get roles(): Role[] {
        return this._roles;
    }

    set roles(value: Role[]) {
        this._roles = value.map((item) => {
            return new Role(item);
        });
    }

    private _email_verified_at: DateModel = new DateModel();

    get email_verified_at(): DateModel {
        return this._email_verified_at;
    }

    set email_verified_at(value: DateModel) {
        this._email_verified_at = new DateModel(value);
    }

    private _created_at: DateModel = new DateModel();

    get created_at(): DateModel {
        return this._created_at;
    }

    set created_at(value: DateModel) {
        this._created_at = new DateModel(value);
    }

    private _updated_at: DateModel = new DateModel();

    get updated_at(): DateModel {
        return this._updated_at;
    }

    set updated_at(value: DateModel) {
        this._updated_at = new DateModel(value);
    }

    private _deleted_at: DateModel = new DateModel();

    get deleted_at(): DateModel {
        return this._deleted_at;
    }

    set deleted_at(value: DateModel) {
        this._deleted_at = new DateModel(value);
    }

    // Can the user do specified action (has permission)
    can(action: string): boolean {
        if (this.isAdmin()) return true; // Administrator has all permissions

        if (!this.permissions) return false; // empty - no permissions

        return this.permissions.some((permission) => {
            return permission.name === action
        })
    }

    hasRole(roleName: string): boolean {
        if (!this.roles) return false;
        return this.roles.some((role) => {
            return role.name === roleName
        })
    }

    isAdmin(): boolean {
        return this.hasRole(Role.ADMIN)
    }
}
