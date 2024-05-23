from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Permite solicitudes GET, HEAD o OPTIONS.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Verifica si el usuario es un administrador.
        return request.user and request.user.is_staff
    
class IsAdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Verifica si el usuario es un administrador.
        return request.user and request.user.is_staff