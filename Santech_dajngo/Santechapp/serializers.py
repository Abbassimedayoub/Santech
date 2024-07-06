from rest_framework import serializers
from Santechapp.models import Company, CompanyBank, Medicine, MedicalDetails, Employee, Customer, Bill, \
    CustomerRequest, CompanyAccount, EmployeeBank, EmployeeSalary, BillDetails

# Série de sérialiseurs pour les modèles de Santechapp.


class CompanySerliazer(serializers.ModelSerializer):
    class Meta:
        model = Company
        # Inclut tous les champs du modèle dans le sérialiseur.
        fields = "__all__"

        


class CompanyBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBank
        fields = "__all__"

    # Ajoute une représentation personnalisée pour inclure des détails de l'entreprise liée.
    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['company'] = CompanySerliazer(instance.company_id).data
    #     return response


class MedicineSerliazer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = "__all__"

    # Ajoute une représentation personnalisée pour inclure des détails de l'entreprise liée.
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['company'] = CompanySerliazer(instance.company_id).data
        return response


class MedicalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalDetails
        fields = "__all__"

    # Ajoute une représentation personnalisée pour inclure des détails du médicament lié.
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['medicine'] = MedicineSerliazer(instance.medicine_id).data
        return response


class MedicalDetailsSerializerSimple(serializers.ModelSerializer):
    class Meta:
        model = MedicalDetails
        # Version simplifiée sans représentation personnalisée.
        fields = "__all__"


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"  # Sérialiseur pour les informations des employés.


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"  # Sérialiseur pour les informations des clients.


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = "__all__"

    # Ajoute une représentation personnalisée pour inclure des détails du client lié.
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['customer'] = CustomerSerializer(instance.customer_id).data
        return response


class CustomerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerRequest
        fields = "__all__"  # Sérialiseur pour les demandes des clients.


class CompanyAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAccount
        fields = "__all__"

    # Ajoute une représentation personnalisée pour inclure des détails de l'entreprise liée.
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['company'] = CompanySerliazer(instance.company_id).data
        return response


class EmployeeBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeBank
        fields = "__all__"

    # Ajoute une représentation personnalisée pour inclure des détails de l'employé lié.
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['employee'] = EmployeeSerializer(instance.employee_id).data
        return response


class EmployeeSalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeSalary
        fields = "__all__"  # Sérialiseur pour les salaires des employés.


class BillDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillDetails
        fields = "__all__"  # Sérialiseur pour les détails des factures.
