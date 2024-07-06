"""Configuration des URLs pour Santech

La liste `urlpatterns` dirige les URLs vers les vues. Pour plus d'informations, veuillez consulter :
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Exemples :
Vues fonctionnelles
    1. Ajoutez un import : from my_app import views
    2. Ajoutez une URL à urlpatterns : path('', views.home, name='home')
Vues basées sur les classes
    1. Ajoutez un import : from other_app.views import Home
    2. Ajoutez une URL à urlpatterns : path('', Home.as_view(), name='home')
Inclusion d'une autre configuration URL
    1. Importez la fonction include() : from django.urls import include, path
    2. Ajoutez une URL à urlpatterns : path('blog/', include('blog.urls'))
"""

# Importation des bibliothèques et fonctions nécessaires
import os
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Importation des vues de l'application Santechapp
from Santechapp import views
from Santechapp.views import CompanyNameViewSet, CompanyOnlyViewSet, MedicineByNameViewSet
from Santech import settings

# Configuration des routeurs REST pour différentes entités
router = routers.DefaultRouter()
router.register("company", views.CompanyViewSet, basename="company")
router.register("companybank", views.CompanyBankViewset,
                basename="companybank")
router.register("medicine", views.MedicineViewSet, basename="medicine")
router.register("companyaccount", views.CompanyAccountViewset,
                basename="companyaccount")
router.register("employee", views.EmployeeViewset, basename="employee")
router.register("employee_all_bank", views.EmployeeBankViewset,
                basename="employee_all_bank")
router.register("employee_all_salary", views.EmployeeSalaryViewset,
                basename="employee_all_salary")
router.register("generate_bill_api", views.GenerateBillViewSet,
                basename="generate_bill_api")
router.register("customer_request", views.CustomerRequestViewset,
                basename="customer_request")
router.register("home_api", views.HomeApiViewset, basename="home_api")

# Configuration des motifs d'URL mappant les URLs aux vues, y compris les points de terminaison API et l'interface administrative
urlpatterns = [
    path('admin/', admin.site.urls),  # Interface administrative
    # Inclusion de toutes les URLs basées sur les routeurs
    path('api/', include(router.urls)),
    path('api/gettoken/', TokenObtainPairView.as_view(),
         name="gettoken"),  # Obtention de jeton JWT
    path('api/refresh_token/', TokenRefreshView.as_view(),
         name="refresh_token"),  # Rafraîchissement de jeton JWT
    path('api/companybyname/<str:name>', CompanyNameViewSet.as_view(),
         name="companybyname"),  # Recherche d'entreprise par nom
    path('api/medicinebyname/<str:name>', MedicineByNameViewSet.as_view(),
         name="medicinebyname"),  # Recherche de médicament par nom
    # Point de terminaison pour informations uniquement sur l'entreprise
    path('api/companyonly/', CompanyOnlyViewSet.as_view(), name="companyonly"),
    path('api/employee_bankby_id/<str:employee_id>', views.EmployeeBankByEIDViewSet.as_view(),
         name="employee_bankby_id"),  # Infos bancaires des employés par ID
    path('api/employee_salaryby_id/<str:employee_id>', views.EmployeeSalaryByEIDViewSet.as_view(),
         name="employee_salaryby_id"),  # Salaire des employés par ID
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


'''
1- submit E-mail      -class PasswordResend.as_view
2- E-mail sent with success    -class PasswordResendWihSicceful.as_view
3- link to change the password by E-mail -class PasswordResendCComfirm.as_view
4- password changed passwod message -class PasswoerdCOmpletedview.as_view       
'''
