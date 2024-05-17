from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    nro_documento = models.IntegerField()
    telefono = models.CharField(max_length=45, null=True, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password", "nro_documento"]

    class Meta:
        db_table = "usuario"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __unicode__(self):
        return self.email

    def __str__(self):
        return self.email


class PaymentModeType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_modo_pago"
        verbose_name = "TipoModoPago"
        verbose_name_plural = "TiposModoPago"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Purchase(models.Model):
    nro_factura = models.IntegerField()
    fecha = models.DateField()
    email = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    id_modo_pago = models.ForeignKey(
        PaymentModeType, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        db_table = "compra"
        verbose_name = "Compra"
        verbose_name_plural = "Compras"

    def __unicode__(self):
        return self.nro_factura

    def __str__(self):
        return f"{self.nro_factura} - {self.fecha}"


class ColorType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_color"
        verbose_name = "TipoColor"
        verbose_name_plural = "TiposColor"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class StyleType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_estilo"
        verbose_name = "TipoEstilo"
        verbose_name_plural = "TiposEstilo"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class BrandType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_marca"
        verbose_name = "TipoMarca"
        verbose_name_plural = "TipoMarcas"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class MaterialType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_material"
        verbose_name = "TipoMaterial"
        verbose_name_plural = "TiposMateriales"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class WheelSizeType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_rodado"
        verbose_name = "TipoRodado"
        verbose_name_plural = "TiposRodado"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Product(models.Model):
    modelo = models.CharField(max_length=45)
    precio = models.FloatField()
    stock = models.IntegerField()
    imagen = models.CharField(max_length=200, null=True, blank=True)
    detalle = models.TextField(max_length=500, null=True, blank=True)
    id_marca = models.ForeignKey(
        BrandType, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_rodado = models.ForeignKey(
        WheelSizeType, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_estilo = models.ForeignKey(
        StyleType, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_material = models.ForeignKey(
        MaterialType, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_color = models.ForeignKey(
        ColorType, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        db_table = "producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __unicode__(self):
        return self.modelo

    def __str__(self):
        return self.modelo


class PurchaseDetail(models.Model):
    cantidad = models.PositiveIntegerField()
    compra = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    producto = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        db_table = "detalle_compra"
        verbose_name = "DetalleCompra"
        verbose_name_plural = "DetallesCompra"

    def __unicode__(self):
        return self.cantidad

    def __str__(self):
        return self.cantidad


class DeliveryStatusType(models.Model):
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_estado_entrega"
        verbose_name = "TipoEstadoEntrega"
        verbose_name_plural = "TipoEstadoEntregas"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Delivery(models.Model):
    compra = models.OneToOneField(Purchase, on_delete=models.CASCADE)
    nro_seguimiento = models.CharField(max_length=45)
    domicilio_entrega = models.CharField(max_length=200)
    fecha_estimada = models.DateField()
    fecha_entrega = models.DateField(null=True, blank=True)
    id_estado_entrega = models.ForeignKey(
        DeliveryStatusType, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        db_table = "entrega"
        verbose_name = "Entrega"
        verbose_name_plural = "Entregas"

    def __unicode__(self):
        return self.nro_seguimiento

    def __str__(self):
        return self.nro_seguimiento