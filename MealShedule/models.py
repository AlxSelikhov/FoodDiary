from django.db import models
from django.core.validators import MinValueValidator
from datetime import date, timedelta

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publication_date = models.DateField()
    
class Account(models.Model):
    name = models.CharField(max_length=32)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    create_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class MealTime(models.Model):
    name = models.CharField(max_length=16)
    create_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Meal(models.Model):
    name = models.CharField(max_length=100)
    grams = models.IntegerField(validators=[MinValueValidator(0)])
    create_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Date(models.Model):
    date = models.DateField(validators=[MinValueValidator(limit_value=date(2023, 9, 1))])
    meal_time = models.ForeignKey(MealTime, on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.date