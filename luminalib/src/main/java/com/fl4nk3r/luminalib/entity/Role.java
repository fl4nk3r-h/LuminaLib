package com.fl4nk3r.luminalib.entity;

/**
 * Defines user roles for access control.
 * This enum is used to specify the different roles that users can have in the
 * system, such as regular users and administrators.
 * The roles can be used to implement role-based access control (RBAC) in the
 * application.
 * - ROLE_USER: Represents a regular user with standard permissions.
 * - ROLE_ADMIN: Represents an administrator with elevated permissions.
 * This enum can be expanded in the future to include additional roles as
 * needed.
 * Example usage:
 * User user = new User();
 * user.setRole(Role.ROLE_USER);
 * if (user.getRole() == Role.ROLE_ADMIN) {
 * // Grant access to admin features
 * }
 *
 * @author fl4nk3r
 * @version 1.0
 * @since 2024-06
 */

public enum Role {
    ROLE_USER,
    ROLE_ADMIN
}
