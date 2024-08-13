# 🚴‍♀️ Proyecto Integrador - Tienda Full

Proyecto grupal para el módulo "Programador Full Stack" de la tecnicatura en desarrollo web y aplicaciones digitales del ISPC . Está compuesto por tres espacios curriculares: **Introducción a la Programación Web I**, **Programación I** y **Proyecto Integrador**.

## 👩‍👩‍👦‍👦 Integrantes

- Barletta Fernando | [GitHub](https://github.com/Ferbarletta)
- Blasiche Andrés | [GitHub](https://github.com/blasichea)
- Cabrera Verónica | [GitHub](https://github.com/Verosolc30)
- Castillo Fernanda | [GitHub](https://github.com/FernandaACastillo)
- Krenn Federico | [GitHub](https://github.com/fedekrenn)
- Liendo Germán Emanuel | [GitHub](https://github.com/g3rm6n)
- Gillini Emiliano | [GitHub](https://github.com/emigillini)


## 💻 Descripción del proyecto

Se trata de una aplicación web fullstack para una tienda ecommerce, el rubro seleccionado es la venta de bicicletas. El alcance de este proyecto es un diseño estático para el front y un back que se conecta a una DB desplegada en MySQL. Front y back no están conectados entre sí en los sprint alcanzados (A realizar en los próximos).

![image](https://github.com/ISPC-23/FullStack2023/assets/132081100/29c5e580-8044-4560-8a41-f70178a0cc54)

## 🛠 Instalación y ejecución

Clonar el proyecto

```bash
git clone https://github.com/ISPC-23/FullStack2024.git
```


### Frontend

1. Ingresar a la carpeta `frontend` 

```bash
cd frontend
```

2. Ejecutar el siguiente comando para instalar las dependencias:

```bash
npm install
```

3. Luego, ejecutar el siguiente comando para iniciar el servidor:

```bash
ng serve -o
```

4. Abrir el navegador y acceder a `http://localhost:4200/`

### Backend

1. Ingresar a la carpeta `backend` e instalar las dependencias

> Opcional: Crear un entorno virtual para instalar las dependencias

#### Crear entorno virtual

```bash
python -m venv <nombre_entorno>
```

#### Activar entorno virtual

```bash
source <nombre_entorno>/scripts/activate
```

2. Se disponibiliza un archivo `requirements.txt` con las dependencias necesarias para el proyecto. Para instalarlas, ejecutar el siguiente comando:

```bash
pip install -r requirements.txt
```

3. Acceder a la carpeta de la aplicación

```bash
cd tiendafull
```

4. Ejecutar el siguiente comando para iniciar el servidor:

```bash
python manage.py runserver
```


5. Abrir el navegador y acceder a `http://127.0.0.1:8000/`


## 📃 Documentación:

Toda la documentación del proyecto tal como el documento IEEE830, los diagramas (de clase, entidad-relación, etc), la documentación de las ceremonias, etc. Pueden encontrarse en la [Wiki del repositorio](https://github.com/ISPC-23/FullStack2024/wiki)


## ❗ Puntos a tener en cuenta

- Para hacer el programa más óptimo y ejecutable en cualquier entorno, se optó por subir la base de datos a un servidor en la nube, el mismo es [Clevercloud](https://www.clever-cloud.com/), los datos de conexión están en el archivo de configuración y modificando sólo los datos por el localhost puede ejecutarse con una DB local. De igual manera, en la carpeta database está el archivo "db_script.sql" con el script que crea la db para poder ejecutarla en local.
