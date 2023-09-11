from rest_framework import serializers
from .models import Book, Account, MealTime, Meal, Date

class BookSerializer(serializers.ModelSerializer):
       class Meta:
        model = Book
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
       class Meta:
        model = Account
        fields = '__all__'

class MealTimeSerializer(serializers.ModelSerializer):
       class Meta:
        model = MealTime
        fields = '__all__'

class MealSerializer(serializers.ModelSerializer):
       class Meta:
        model = Meal
        fields = '__all__'
        
class DateSerializer(serializers.ModelSerializer):
       class Meta:
        model = Date
        fields = '__all__'