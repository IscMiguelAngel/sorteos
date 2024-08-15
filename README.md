# Sistema de Sorteos

Este sistema de sorteos es una aplicación sencilla que permite gestionar y realizar sorteos de manera fácil y visualmente atractiva. El sistema consta de cuatro pasos (pantallas):

1. **Registro de Participantes**: Permite registrar a los participantes del sorteo.
2. **Registro de Premios**: Permite registrar los premios que se sortearán.
3. **Sorteo con Ruletas**: Utiliza dos ruletas para realizar el sorteo. La primera ruleta selecciona el premio y la segunda ruleta selecciona a la persona ganadora del premio. Este proceso se repite hasta que el usuario decida finalizar el sorteo.
4. **Lista de Ganadores**: Muestra una lista de los ganadores y los premios que han ganado.

### Librerías Utilizadas

- **Canvas Confetti**: Utilizada para agregar efectos de confeti durante el sorteo, añadiendo una capa visual divertida y festiva. [Ver en GitHub](https://github.com/catdad/canvas-confetti)
- **Javascript Winwheel**: Utilizada para crear las ruletas del sorteo. Esta librería permite generar ruletas personalizables que se pueden girar para seleccionar aleatoriamente premios y ganadores. [Ver en GitHub](https://github.com/zarocknz/javascript-winwheel)

### Requisitos

- Navegador web compatible con HTML5 y JavaScript

### Almacenamiento de Datos

El sistema utiliza LocalStorage del navegador para almacenar los datos necesarios para el funcionamiento previo y posterior al sorteo. Esto incluye información sobre los participantes, los premios y los ganadores.

### Cómo Utilizar

1. **Registrar Participantes**: Ingrese los nombres de los participantes en la pantalla de registro de participantes.
2. **Registrar Premios**: Ingrese los detalles de los premios en la pantalla de registro de premios.
3. **Realizar Sorteo**: Inicie el sorteo, primero se seleccionará un premio y luego se seleccionará un ganador para ese premio utilizando las ruletas.
4. **Ver Lista de Ganadores**: Revise la lista de ganadores una vez finalizado el sorteo.

### Licencia

Este proyecto está licenciado bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
