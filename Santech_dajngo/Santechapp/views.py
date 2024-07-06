from datetime import datetime, timedelta
from django.db.models import Sum
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication

from Santechapp.models import Company, CompanyBank, Medicine, MedicalDetails, CompanyAccount, Employee, \
    EmployeeBank, EmployeeSalary, CustomerRequest, Bill, BillDetails
from Santechapp.serializers import CompanySerliazer, CompanyBankSerializer, MedicineSerliazer, \
    MedicalDetailsSerializer, MedicalDetailsSerializerSimple, CompanyAccountSerializer, EmployeeSerializer, \
    EmployeeBankSerializer, EmployeeSalarySerializer, CustomerSerializer, BillSerializer, BillDetailsSerializer, \
    CustomerRequestSerializer



# Classe ViewSet pour les entreprises


class CompanyViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Méthode pour lister toutes les entreprises
        company = Company.objects.all()
        serializer = CompanySerliazer(
            company, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Company List Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        # Méthode pour créer une nouvelle entreprise
        try:
            serializer = CompanySerliazer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Company Data Save Successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Saving Company Data"}
        return Response(dict_response)

    def retrieve(self, request, pk=None):
        # Méthode pour récupérer les détails d'une entreprise spécifique
        queryset = Company.objects.all()
        company = get_object_or_404(queryset, pk=pk)
        serializer = CompanySerliazer(company, context={"request": request})
        company_bank_details = CompanyBank.objects.filter(
            company_id=serializer.data["id"])
        companybank_details_serializers = CompanyBankSerializer(
            company_bank_details, many=True)
        serializer.data["company_bank"] = companybank_details_serializers.data
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Méthode pour mettre à jour les données d'une entreprise
        try:
            queryset = Company.objects.all()
            company = get_object_or_404(queryset, pk=pk)
            serializer = CompanySerliazer(
                company, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Company Data"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Updating Company Data"}
        return Response(dict_response)


class CompanyBankViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Méthode pour créer des données bancaires d'entreprise
        try:
            serializer = CompanyBankSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Company Bank Data Save Successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Saving Company Bank Data"}
        return Response(dict_response)

    def list(self, request):
        # Méthode pour lister toutes les données bancaires des entreprises
        companybank = CompanyBank.objects.all()
        serializer = CompanyBankSerializer(
            companybank, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Company Bank List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        # Méthode pour récupérer les détails bancaires d'une entreprise spécifique
        queryset = CompanyBank.objects.all()
        companybank = get_object_or_404(queryset, pk=pk)
        serializer = CompanyBankSerializer(
            companybank, context={"request": request})
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Méthode pour mettre à jour les données bancaires d'une entreprise
        queryset = CompanyBank.objects.all()
        companybank = get_object_or_404(queryset, pk=pk)
        serializer = CompanyBankSerializer(
            companybank, data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()
        return Response({"error": False, "message": "Data Has Been Updated"})


class CompanyNameViewSet(generics.ListAPIView):
    serializer_class = CompanySerliazer

    def get_queryset(self):
        name = self.kwargs["name"]
        return Company.objects.filter(name=name)


class MedicineByNameViewSet(generics.ListAPIView):
    serializer_class = MedicineSerliazer

    def get_queryset(self):
        name = self.kwargs["name"]
        return Medicine.objects.filter(name__contains=name)


class CompanyNameViewSet(generics.ListAPIView):
    serializer_class = CompanySerliazer

    def get_queryset(self):
        # Récupère les entreprises selon le nom spécifié dans l'URL
        name = self.kwargs["name"]
        return Company.objects.filter(name=name)


class MedicineByNameViewSet(generics.ListAPIView):
    serializer_class = MedicineSerliazer

    def get_queryset(self):
        # Récupère les médicaments dont le nom contient la chaîne spécifiée
        name = self.kwargs["name"]
        return Medicine.objects.filter(name__contains=name)


class CompanyOnlyViewSet(generics.ListAPIView):
    serializer_class = CompanySerliazer

    def get_queryset(self):
        # Renvoie toutes les entreprises
        return Company.objects.all()


class MedicineViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Crée une nouvelle entrée pour un médicament
        try:
            serializer = MedicineSerliazer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()

            medicine_id = serializer.data['id']

            # Traitement des détails des médicaments associés
            medicine_details_list = []
            for medicine_detail in request.data["medicine_details"]:
                medicine_detail["medicine_id"] = medicine_id
                medicine_details_list.append(medicine_detail)

            serializer2 = MedicalDetailsSerializer(
                data=medicine_details_list, many=True, context={"request": request})
            serializer2.is_valid()
            serializer2.save()

            dict_response = {"error": False,
                             "message": "Medicine Data Save Successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Saving Medicine Data"}
        return Response(dict_response)

    def list(self, request):
        # Liste tous les médicaments avec leurs détails
        medicine = Medicine.objects.all()
        serializer = MedicineSerliazer(
            medicine, many=True, context={"request": request})

        newmedicinelist = []
        for medicine in serializer.data:
            medicine_details = MedicalDetails.objects.filter(
                medicine_id=medicine["id"])
            medicine_details_serializers = MedicalDetailsSerializerSimple(
                medicine_details, many=True)
            medicine["medicine_details"] = medicine_details_serializers.data
            newmedicinelist.append(medicine)

        response_dict = {
            "error": False, "message": "All Medicine List Data", "data": newmedicinelist}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        # Récupère un médicament spécifique avec ses détails
        queryset = Medicine.objects.all()
        medicine = get_object_or_404(queryset, pk=pk)
        serializer = MedicineSerliazer(medicine, context={"request": request})

        medicine_details = MedicalDetails.objects.filter(
            medicine_id=serializer.data["id"])
        medicine_details_serializers = MedicalDetailsSerializerSimple(
            medicine_details, many=True)
        serializer.data["medicine_details"] = medicine_details_serializers.data

        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Met à jour un médicament et ses détails
        queryset = Medicine.objects.all()
        medicine = get_object_or_404(queryset, pk=pk)
        serializer = MedicineSerliazer(
            medicine, data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()

        for salt_detail in request.data["medicine_details"]:
            if salt_detail["id"] == 0:
                del salt_detail["id"]
                salt_detail["medicine_id"] = serializer.data["id"]
                serializer2 = MedicalDetailsSerializer(
                    data=salt_detail, context={"request": request})
                serializer2.is_valid()
                serializer2.save()
            else:
                queryset2 = MedicalDetails.objects.all()
                medicine_salt = get_object_or_404(
                    queryset2, pk=salt_detail["id"])
                del salt_detail["id"]
                serializer3 = MedicalDetailsSerializer(
                    medicine_salt, data=salt_detail, context={"request": request})
                serializer3.is_valid()
                serializer3.save()

        return Response({"error": False, "message": "Data Has Been Updated"})


# Vue pour la gestion des comptes des entreprises
class CompanyAccountViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Crée un nouveau compte d'entreprise
        try:
            serializer = CompanyAccountSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Company Account Data Save Successfully"}
        except:
            dict_response = {
                "error": True, "message": "Error During Saving Company Account Data"}
        return Response(dict_response)

    def list(self, request):
        # Liste tous les comptes d'entreprise
        companyaccount = CompanyAccount.objects.all()
        serializer = CompanyAccountSerializer(
            companyaccount, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Company Account List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        # Récupère les détails d'un compte d'entreprise spécifique
        queryset = CompanyAccount.objects.all()
        companyaccount = get_object_or_404(queryset, pk=pk)
        serializer = CompanyAccountSerializer(
            companyaccount, context={"request": request})
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Met à jour un compte d'entreprise existant
        queryset = CompanyAccount.objects.all()
        companyaccount = get_object_or_404(queryset, pk=pk)
        serializer = CompanyAccountSerializer(
            companyaccount, data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()
        return Response({"error": False, "message": "Data Has Been Updated"})


# Vue pour la gestion des employés
class EmployeeViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Crée un nouvel employé avec les données fournies
        try:
            serializer = EmployeeSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Employee Data Save Successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Saving Employee Data"}
        return Response(dict_response)

    def list(self, request):
        # Liste tous les employés
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(
            employee, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Employee List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        # Récupère les détails d'un employé spécifique
        queryset = Employee.objects.all()
        employee = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeSerializer(employee, context={"request": request})
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Met à jour les données d'un employé existant
        queryset = Employee.objects.all()
        employee = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeSerializer(
            employee, data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()
        return Response({"error": False, "message": "Data Has Been Updated"})

# Vue pour la gestion des informations bancaires des employés


class EmployeeBankViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Crée un nouvel enregistrement bancaire pour un employé
        try:
            serializer = EmployeeBankSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Employee Bank Save Successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Saving Employee Bank"}
        return Response(dict_response)

    def list(self, request):
        # Liste toutes les informations bancaires des employés
        employeebank = EmployeeBank.objects.all()
        serializer = EmployeeBankSerializer(
            employeebank, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Employee Bank List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        # Récupère les informations bancaires d'un employé spécifique
        queryset = EmployeeBank.objects.all()
        employeebank = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeBankSerializer(
            employeebank, context={"request": request})
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Met à jour les informations bancaires d'un employé
        queryset = EmployeeBank.objects.all()
        employeebank = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeBankSerializer(
            employeebank, data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()
        return Response({"error": False, "message": "Data Has Been Updated"})

# Vue pour la gestion des salaires des employés


class EmployeeSalaryViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Crée un nouvel enregistrement de salaire pour un employé
        try:
            serializer = EmployeeSalarySerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Employee Salary Save Successfully"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Saving Employee Salary"}
        return Response(dict_response)

    def list(self, request):
        # Liste tous les salaires des employés
        employeesalary = EmployeeSalary.objects.all()
        serializer = EmployeeSalarySerializer(
            employeesalary, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Employee Salary List Data", "data": serializer.data}
        return Response(response_dict)

    def retrieve(self, request, pk=None):
        # Récupère les détails du salaire d'un employé spécifique
        queryset = EmployeeSalary.objects.all()
        employeesalary = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeSalarySerializer(
            employeesalary, context={"request": request})
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Met à jour le salaire d'un employé
        queryset = EmployeeSalary.objects.all()
        employeesalary = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeSalarySerializer(
            employeesalary, data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()
        return Response({"error": False, "message": "Data Has Been Updated"})


# Vue pour accéder aux informations bancaires des employés par ID d'employé
class EmployeeBankByEIDViewSet(generics.ListAPIView):
    serializer_class = EmployeeBankSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Renvoie les informations bancaires pour un employé spécifique
        employee_id = self.kwargs["employee_id"]
        return EmployeeBank.objects.filter(employee_id=employee_id)

# Vue pour accéder aux informations de salaire des employés par ID d'employé


class EmployeeSalaryByEIDViewSet(generics.ListAPIView):
    serializer_class = EmployeeSalarySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Renvoie les informations de salaire pour un employé spécifique
        employee_id = self.kwargs["employee_id"]
        return EmployeeSalary.objects.filter(employee_id=employee_id)

# Vue pour la génération de factures


class GenerateBillViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        # Création d'une facture avec détails du client et détails de la médication
        serializer = CustomerSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid()
        serializer.save()
        customer_id = serializer.data['id']

        # Sauvegarde des données de la facture
        billdata = {"customer_id": customer_id}
        serializer2 = BillSerializer(
            data=billdata, context={"request": request})
        serializer2.is_valid()
        serializer2.save()
        bill_id = serializer2.data['id']

        # Enregistrement des détails des médicaments pour la facture
        medicine_details_list = []
        for medicine_detail in request.data["medicine_details"]:
            medicine_detail1 = {
                "medicine_id": medicine_detail["id"], "bill_id": bill_id, "qty": medicine_detail["qty"]}
            medicine_deduct = Medicine.objects.get(id=medicine_detail["id"])
            medicine_deduct.in_stock_total -= int(medicine_detail['qty'])
            medicine_deduct.save()
            medicine_details_list.append(medicine_detail1)

        serializer3 = BillDetailsSerializer(
            data=medicine_details_list, many=True, context={"request": request})
        serializer3.is_valid()
        serializer3.save()

        dict_response = {"error": False,
                         "message": "Bill Generate Successfully"}
        return Response(dict_response)

# Vue pour les requêtes client


class CustomerRequestViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Liste toutes les requêtes client
        customer_request = CustomerRequest.objects.all()
        serializer = CustomerRequestSerializer(
            customer_request, many=True, context={"request": request})
        response_dict = {
            "error": False, "message": "All Customer Request Data", "data": serializer.data}
        return Response(response_dict)

    def create(self, request):
        # Enregistre une nouvelle requête client
        try:
            serializer = CustomerRequestSerializer(
                data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {
                "error": False, "message": "Customer Request Data Save Successfully"}
        except:
            dict_response = {
                "error": True, "message": "Error During Saving Customer Request Data"}
        return Response(dict_response)

    def retrieve(self, request, pk=None):
        # Récupère les détails d'une requête client spécifique
        queryset = CustomerRequest.objects.all()
        customer_request = get_object_or_404(queryset, pk=pk)
        serializer = CustomerRequestSerializer(
            customer_request, context={"request": request})
        return Response({"error": False, "message": "Single Data Fetch", "data": serializer.data})

    def update(self, request, pk=None):
        # Met à jour une requête client existante
        try:
            queryset = CustomerRequest.objects.all()
            customer_request = get_object_or_404(queryset, pk=pk)
            serializer = CustomerRequestSerializer(
                customer_request, data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response = {"error": False,
                             "message": "Successfully Updated Customer Data"}
        except:
            dict_response = {"error": True,
                             "message": "Error During Updating Customer Data"}
        return Response(dict_response)

# Vue pour la page d'accueil, résumant diverses statistiques et données


class HomeApiViewset(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Collecte des données pour le tableau de bord : requêtes des clients, comptes de factures, médicaments, etc.

        # Sérialisation des requêtes des clients
        customer_request = CustomerRequest.objects.all()
        customer_request_serializer = CustomerRequestSerializer(
            customer_request, many=True, context={"request": request})

        # Sérialisation des factures
        bill_count = Bill.objects.all()
        bill_count_serializer = BillSerializer(
            bill_count, many=True, context={"request": request})

        # Sérialisation des médicaments
        medicine_count = Medicine.objects.all()
        medicine_count_serializer = MedicineSerliazer(
            medicine_count, many=True, context={"request": request})

        # Sérialisation des entreprises
        company_count = Company.objects.all()
        company_count_serializer = CompanySerliazer(
            company_count, many=True, context={"request": request})

        # Sérialisation des employés
        employee_count = Employee.objects.all()
        employee_count_serializer = EmployeeSerializer(
            employee_count, many=True, context={"request": request})

        # Calcul des totaux de vente, d'achat et de profit
        bill_details = BillDetails.objects.all()
        profit_amt, sell_amt, buy_amt = 0, 0, 0
        for bill in bill_details:
            buy_amt += float(bill.medicine_id.buy_price) * bill.qty
            sell_amt += float(bill.medicine_id.sell_price) * bill.qty
        profit_amt = sell_amt - buy_amt

        # Sérialisation des requêtes client selon leur statut
        customer_request_pending = CustomerRequest.objects.filter(status=False)
        customer_request_pending_serializer = CustomerRequestSerializer(
            customer_request_pending, many=True, context={"request": request})
        customer_request_completed = CustomerRequest.objects.filter(
            status=True)
        customer_request_completed_serializer = CustomerRequestSerializer(
            customer_request_completed, many=True, context={"request": request})

        # Calcul du profit journalier, ventes et achats
        current_date = datetime.today().strftime("%Y-%m-%d")
        current_date1 = datetime.today()
        current_date_7days = (
            current_date1 + timedelta(days=7)).strftime("%Y-%m-%d")
        bill_details_today = BillDetails.objects.filter(
            added_on__date=current_date)
        profit_amt_today, sell_amt_today, buy_amt_today = 0, 0, 0
        for bill in bill_details_today:
            buy_amt_today += float(bill.medicine_id.buy_price) * bill.qty
            sell_amt_today += float(bill.medicine_id.sell_price) * bill.qty
        profit_amt_today = sell_amt_today - buy_amt_today

        # Sérialisation des médicaments proches de la date d'expiration
        medicine_expire = Medicine.objects.filter(
            expire_date__range=[current_date, current_date_7days])
        medicine_expire_serializer = MedicineSerliazer(
            medicine_expire, many=True, context={"request": request})

        # Calculs pour graphiques de profits, ventes et achats par date
        bill_dates = BillDetails.objects.order_by().values("added_on__date").distinct()
        profit_chart_list, sell_chart_list, buy_chart_list = [], [], []
        for billdate in bill_dates:
            access_date = billdate["added_on__date"]
            bill_data = BillDetails.objects.filter(added_on__date=access_date)
            profit_amt_inner, sell_amt_inner, buy_amt_inner = 0, 0, 0
            for billsingle in bill_data:
                buy_amt_inner += float(billsingle.medicine_id.buy_price) * \
                    billsingle.qty
                sell_amt_inner += float(billsingle.medicine_id.sell_price) * \
                    billsingle.qty
            profit_amt_inner = sell_amt_inner - buy_amt_inner
            profit_chart_list.append(
                {"date": access_date, "amt": profit_amt_inner})
            sell_chart_list.append(
                {"date": access_date, "amt": sell_amt_inner})
            buy_chart_list.append({"date": access_date, "amt": buy_amt_inner})

        # Création de la réponse avec toutes les données collectées
        dict_response = {"error": False, "message": "Home Page Data", "customer_request": len(customer_request_serializer.data), "bill_count": len(bill_count_serializer.data), "medicine_count": len(medicine_count_serializer.data), "company_count": len(company_count_serializer.data), "employee_count": len(employee_count_serializer.data), "sell_total": sell_amt, "buy_total": buy_amt, "profit_total": profit_amt, "request_pending": len(
            customer_request_pending_serializer.data), "request_completed": len(customer_request_completed_serializer.data), "profit_amt_today": profit_amt_today, "sell_amt_today": sell_amt_today, "medicine_expire_serializer_data": len(medicine_expire_serializer.data), "sell_chart": sell_chart_list, "buy_chart": buy_chart_list, "profit_chart": profit_chart_list}
        return Response(dict_response)


# Configuration des vues pour la gestion des entreprises
company_list = CompanyViewSet.as_view(
    {"get": "list"})  # Accès à la liste des entreprises
company_creat = CompanyViewSet.as_view(
    {"post": "create"})  # Création d'une entreprise
# Mise à jour d'une entreprise existante
company_update = CompanyViewSet.as_view({"put": "update"})
