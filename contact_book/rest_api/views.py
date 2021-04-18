from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions

from rest_api.models import Book, Contact
from rest_api.serializers import UserSerializer, GroupSerializer, BookSerializer, ContactSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(owner=self.request.user)
        return query_set
    permission_classes = [permissions.IsAuthenticated]


class ContactViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(book__owner=self.request.user).order_by('-id')
        return query_set
    permission_classes = [permissions.IsAuthenticated]
