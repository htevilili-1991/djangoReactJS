"""
Create or update the admin superuser for both Django admin and frontend.
Usage: python manage.py create_admin
       python manage.py create_admin --username admin --password mypass
"""
import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Creates the admin superuser for backend and frontend'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            type=str,
            default=os.environ.get('ADMIN_USERNAME', 'admin'),
            help='Admin username',
        )
        parser.add_argument(
            '--password',
            type=str,
            default=os.environ.get('ADMIN_PASSWORD', 'admin'),
            help='Admin password',
        )
        parser.add_argument(
            '--email',
            type=str,
            default=os.environ.get('ADMIN_EMAIL', 'admin@example.com'),
            help='Admin email',
        )

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        email = options['email']

        user, created = User.objects.update_or_create(
            username=username,
            defaults={
                'email': email,
                'first_name': 'Admin',
                'last_name': 'User',
                'is_staff': True,
                'is_superuser': True,
                'is_active': True,
            }
        )
        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(self.style.SUCCESS(f'Admin user "{username}" created successfully.'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Admin user "{username}" updated successfully.'))

        self.stdout.write(f'  Username: {username}')
        self.stdout.write(f'  Email: {email}')
        self.stdout.write('  Use these credentials to sign in at /signin and at /admin/')
