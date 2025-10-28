"""
Authentication utilities for role-based access control
"""
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models import User


def get_current_user():
    """
    Get the currently authenticated user based on JWT token.
    Must be used inside a route protected by @jwt_required().
    """
    try:
        user_id = get_jwt_identity()
        return User.query.get(user_id)
    except Exception:
        return None




def admin_required():
    """
    Restrict route access to admin users only.
    Use after @jwt_required().
    """
    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            verify_jwt_in_request()
            user = get_current_user()

            if not user:
                return jsonify({'error': 'User not found'}), 404
            if not user.is_active:
                return jsonify({'error': 'Account is inactive'}), 403
            if not user.is_admin():
                return jsonify({'error': 'Admin access required'}), 403

            return fn(*args, **kwargs)
        return decorated
    return wrapper


def shopper_required():
    """
    Restrict route access to shopper users only.
    Use after @jwt_required().
    """
    def wrapper(fn):
        @wraps(fn)
        def decorated(*args, **kwargs):
            verify_jwt_in_request()
            user = get_current_user()

            if not user:
                return jsonify({'error': 'User not found'}), 404
            if not user.is_active:
                return jsonify({'error': 'Account is inactive'}), 403
            if not user.is_shopper():
                return jsonify({'error': 'Shopper access required'}), 403

            return fn(*args, **kwargs)
        return decorated
    return wrapper




def is_admin_user():
    """
    Check if the current authenticated user is an admin.
    Returns: Boolean
    """
    user = get_current_user()
    return bool(user and user.is_admin())


def is_shopper_user():
    """
    Check if the current authenticated user is a shopper.
    Returns: Boolean
    """
    user = get_current_user()
    return bool(user and user.is_shopper())
