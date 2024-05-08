from django.db import models


# Create your models here.
class TipoRol(models.Model):
    id_rol = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_rol"
        verbose_name = "TipoRol"
        verbose_name_plural = "TipoRoles"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Usuario(models.Model):
    email = models.EmailField(primary_key=True)
    nro_documento = models.IntegerField()
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    clave = models.CharField(max_length=20)
    telefono = models.CharField(max_length=45, null=True, blank=True)
    id_rol = models.ForeignKey(
        TipoRol, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        db_table = "usuario"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __unicode__(self):
        return self.email

    def __str__(self):
        return self.email


class TipoModoPago(models.Model):
    id_modo_pago = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_modo_pago"
        verbose_name = "TipoModoPago"
        verbose_name_plural = "TipoModoPagos"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Compra(models.Model):
    id_compra = models.AutoField(primary_key=True)
    nro_factura = models.IntegerField()
    fecha = models.DateField()
    nro_cuenta = models.IntegerField()
    total = models.FloatField()
    email = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_modo_pago = models.ForeignKey(TipoModoPago, on_delete=models.CASCADE)

    class Meta:
        db_table = "compra"
        verbose_name = "Compra"
        verbose_name_plural = "Compras"

    def __unicode__(self):
        return self.id_compra

    def __str__(self):
        return self.id_compra


class TipoColor(models.Model):
    id_color = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_color"
        verbose_name = "TipoColor"
        verbose_name_plural = "TipoColores"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class TipoEstilo(models.Model):
    id_estilo = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_estilo"
        verbose_name = "TipoEstilo"
        verbose_name_plural = "TipoEstilos"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class TipoMarca(models.Model):
    id_marca = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_marca"
        verbose_name = "TipoMarca"
        verbose_name_plural = "TipoMarcas"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class TipoMaterial(models.Model):
    id_material = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_material"
        verbose_name = "TipoMaterial"
        verbose_name_plural = "TipoMateriales"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class TipoRodado(models.Model):
    id_rodado = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_rodado"
        verbose_name = "TipoRodado"
        verbose_name_plural = "TipoRodados"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    modelo = models.CharField(max_length=45)
    precio = models.FloatField()
    stock = models.IntegerField()
    imagen = models.CharField(max_length=200, null=True, blank=True)
    detalle = models.TextField(max_length=500, null=True, blank=True)
    id_marca = models.ForeignKey(
        TipoMarca, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_rodado = models.ForeignKey(
        TipoRodado, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_estilo = models.ForeignKey(
        TipoEstilo, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_material = models.ForeignKey(
        TipoMaterial, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_color = models.ForeignKey(
        TipoColor, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        db_table = "producto"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __unicode__(self):
        return self.modelo

    def __str__(self):
        return self.modelo


class DetalleCompra(models.Model):
    id_compra = models.ForeignKey(Compra, on_delete=models.CASCADE)
    id_detalle_compra = models.IntegerField()
    cantidad = models.IntegerField()
    precio_unitario = models.FloatField()
    importe = models.FloatField()
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    class Meta:
        db_table = "detalle_compra"
        verbose_name = "DetalleCompra"
        verbose_name_plural = "DetalleCompras"

    def __unicode__(self):
        return self.id_detalle_compra

    def __str__(self):
        return self.id_detalle_compra


class TipoEstadoEntrega(models.Model):
    id_estado_entrega = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=45)

    class Meta:
        db_table = "tipo_estado_entrega"
        verbose_name = "TipoEstadoEntrega"
        verbose_name_plural = "TipoEstadoEntregas"

    def __unicode__(self):
        return self.descripcion

    def __str__(self):
        return self.descripcion


class Entrega(models.Model):
    id_entrega = models.AutoField(primary_key=True)
    nro_seguimiento = models.CharField(max_length=45)
    domicilio_entrega = models.CharField(max_length=45)
    observaciones = models.CharField(max_length=150, null=True, blank=True)
    id_compra = models.ForeignKey(
        Compra, on_delete=models.SET_NULL, null=True, blank=True
    )
    id_estado_entrega = models.ForeignKey(
        TipoEstadoEntrega, on_delete=models.SET_NULL, null=True, blank=True
    )

    class Meta:
        db_table = "entrega"
        verbose_name = "Entrega"
        verbose_name_plural = "Entregas"

    def __unicode__(self):
        return self.nro_seguimiento

    def __str__(self):
        return self.nro_seguimiento
