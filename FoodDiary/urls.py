"""
URL configuration for FoodDiary project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from MealShedule.views import BookViewSet, AccountViewSet, MealTimeViewSet, MealViewSet, MealTimeDeleteView, DateViewSet

router = routers.DefaultRouter()
router.register(r'api/books', BookViewSet)
router.register(r'api/accounts', AccountViewSet)
router.register(r'api/mealtimes', MealTimeViewSet)
router.register(r'api/meals', MealViewSet)
router.register(r'api/date', DateViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
     path('api/mealtimes/<int:pk>/delete/', MealTimeDeleteView.as_view(), name='mymodel-delete'),
]
