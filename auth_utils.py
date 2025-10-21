"""
Authentication utilities for role-based access control
"""
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models import User

def admin_required():
    """
    Decorator to require admin role for route access.
    Use after @jwt_required() decorator.
    
    Example:
        @api.route('/admin/products', methods=['POST'])
        @jwt_required()
        @admin_required()
        def create_product_admin():
            # Only admins can access this
            pass
    """
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            if not user.is_active:
                return jsonify({'error': 'Account is inactive'}), 403
            
            if not user.is_admin():
                return jsonify({'error': 'Admin access required'}), 403
            
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def shopper_required():
    """
    Decorator to require shopper role for route access.
    Use after @jwt_required() decorator.
    
    Example:
        @api.route('/purchases', methods=['POST'])
        @jwt_required()
        @shopper_required()
        def create_purchase():
            # Only shoppers can access this
            pass
    """
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            if not user.is_active:
                return jsonify({'error': 'Account is inactive'}), 403
            
            if not user.is_shopper():
                return jsonify({'error': 'Shopper access required'}), 403
            
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def get_current_user():
    """
    Get the current authenticated user object.
    Must be called within a route protected by @jwt_required()
    
    Returns:
        User object or None if not found
    """
    try:
        current_user_id = get_jwt_identity()
        return User.query.get(current_user_id)
    except:
        return None

def is_admin_user():
    """
    Check if current user is an admin.
    Must be called within a route protected by @jwt_required()
    
    Returns:
        Boolean indicating if user is admin
    """
    user = get_current_user()
    return user and user.is_admin()

def is_shopper_user():
    """
    Check if current user is a shopper.
    Must be called within a route protected by @jwt_required()
    
    Returns:
        Boolean indicating if user is shopper
    """
    user = get_current_user()
    return user and user.is_shopper()