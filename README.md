# Wok Wang House

## Back
Para instalar el back se debe ir a la carpeta /Back y crear un environment con python 
```
python -m venv .venv
```
Luego seleccionar el interprete de python del environment abajo a la derecha en VS Code, y buscar el ejecutable en /Back/.venv/Scripts/python.exe.

A continuación se instalan las librerías necesarias, en la carpeta Back hay que ejecutar
```
pip install -r requirements.txt
```
Por último, se ejecuta el siguiente comando en la carpeta Back para 
echar a andar el proyecto
```
flask --app wokwanghouse run --debug
```

## Front
Start the app
Install dependencies: npm

Instalacion de Tailwind:

Instale tailwindcss y sus dependencias pares, luego genere sus archivos tailwind.config.js y postcss.config.js.

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Empieza con : npm run dev