# Generated by Django 3.0.8 on 2020-07-12 09:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('license_no', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('contact_no', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('contact', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerRequest',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('customer_name', models.CharField(max_length=255)),
                ('phone', models.CharField(max_length=255)),
                ('medicine_details', models.CharField(max_length=255)),
                ('status', models.BooleanField(default=False)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('joining_date', models.DateField()),
                ('phone', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Medicine',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('medical_typ', models.CharField(max_length=255)),
                ('buy_price', models.CharField(max_length=255)),
                ('sell_price', models.CharField(max_length=255)),
                ('TVA', models.CharField(max_length=255)),
                ('s_gst', models.CharField(max_length=255)),
                ('batch_no', models.CharField(max_length=255)),
                ('shelf_no', models.CharField(max_length=255)),
                ('expire_date', models.DateField()),
                ('mfg_date', models.DateField()),
                ('description', models.CharField(max_length=255)),
                ('in_stock_total', models.IntegerField()),
                ('qty_in_strip', models.IntegerField()),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('company_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Company')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalDetails',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('salt_name', models.CharField(max_length=255)),
                ('salt_qty', models.CharField(max_length=255)),
                ('salt_qty_type', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('medicine_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Medicine')),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeSalary',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('salary_date', models.DateField()),
                ('salary_amount', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('employee_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeBank',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('bank_account_no', models.CharField(max_length=255)),
                ('ifsc_no', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField()),
                ('employee_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Employee')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyBank',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('bank_account_no', models.CharField(max_length=255)),
                ('ifsc_no', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('company_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Company')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyAccount',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('transaction_type', models.CharField(choices=[
                 (1, 'Debit'), (2, 'Credit')], max_length=255)),
                ('transaction_amt', models.CharField(max_length=255)),
                ('transaction_date', models.DateField()),
                ('payment_mode', models.CharField(max_length=255)),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('company_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Company')),
            ],
        ),
        migrations.CreateModel(
            name='BillDetails',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('qty', models.IntegerField()),
                ('added_on', models.DateTimeField(auto_now_add=True)),
                ('bill_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Bill')),
                ('medicine_id', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Medicine')),
            ],
        ),
        migrations.AddField(
            model_name='bill',
            name='customer_id',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to='Santechapp.Customer'),
        ),
    ]
