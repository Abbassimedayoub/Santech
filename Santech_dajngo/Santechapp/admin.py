from django.contrib import admin

# Enregistrement de vos modèles.
from Santechapp.models import Company, Medicine, EmployeeSalary, BillDetails, CustomerRequest, CompanyAccount, \
    CompanyBank, EmployeeBank, Bill, Customer, Employee, MedicalDetails

# Enregistrement des modèles dans l'interface d'administration de Django.
# Ceci permet à ces modèles d'être gérés via l'interface d'administration.

# Enregistre le modèle Company pour le rendre accessible dans l'admin.
admin.site.register(Company)
# Enregistre le modèle Medicine pour le rendre accessible dans l'admin.
admin.site.register(Medicine)
# Enregistre le modèle MedicalDetails pour le rendre accessible dans l'admin.
admin.site.register(MedicalDetails)
# Enregistre le modèle Employee pour le rendre accessible dans l'admin.
admin.site.register(Employee)
# Enregistre le modèle Customer pour le rendre accessible dans l'admin.
admin.site.register(Customer)
# Enregistre le modèle Bill pour le rendre accessible dans l'admin.
admin.site.register(Bill)
# Enregistre le modèle EmployeeSalary pour le rendre accessible dans l'admin
admin.site.register(EmployeeSalary)
# Enregistre le modèle BillDetails pour le rendre accessible dans l'admin.
admin.site.register(BillDetails)
# Enregistre le modèle CustomerRequest pour le rendre accessible dans l'admin.
admin.site.register(CustomerRequest)
# Enregistre le modèle CompanyAccount pour le rendre accessible dans l'admin.
admin.site.register(CompanyAccount)
# Enregistre le modèle CompanyBank pour le rendre accessible dans l'admin.
admin.site.register(CompanyBank)
# Enregistre le modèle EmployeeBank pour le rendre accessible dans l'admin.
admin.site.register(EmployeeBank)
