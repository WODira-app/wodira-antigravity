# WODira para Antigravity y Gemini CLI

Plugin oficial de WODira para utilizar el **MCP público** desde Antigravity o Gemini CLI. Incluye guías para eventos, inscripciones, actividad del atleta, operaciones del organizador, estadísticas del box y entrenamiento en Peak.

## Instalación

Antigravity actualizado —validado con CLI 1.4.10—:

```sh
agy plugin install https://github.com/WODira-app/wodira-antigravity
```

Gemini CLI —validado con 0.66.0—:

```sh
gemini extensions install https://github.com/WODira-app/wodira-antigravity
```

Después inicia sesión mediante la autenticación MCP del cliente. En Gemini usa `/mcp auth wodira`; su callback local utiliza el puerto 3334. La instalación no inicia sesión ni concede permisos sobre tu cuenta. No necesitas incluir claves ni tokens en la configuración del plugin.

## Qué puedes pedir

- «Busca próximos eventos cerca de mí».
- «Revisa mis inscripciones y mi agenda deportiva».
- «Resume las inscripciones y métricas de mi evento».
- «Compara las clases, horas y coaches de mi box durante los últimos 30 días».
- «Exporta ese informe del box a PDF».
- «Revisa mi carga y mi calendario de entrenamiento de esta semana».

Las funciones dependen del catálogo público vigente, tu cuenta, el rol y las funciones activas. Los informes de box requieren OWNER/ADMIN, acceso MCP y ANALYTICS. Un PDF necesita un cliente capaz de guardar el recurso binario devuelto. Las propuestas de entrenamiento no se guardan automáticamente. Este plugin no conecta con perfiles privados de administración o comercio.

Los datos solicitados a WODira se comparten con el cliente elegido y pueden formar parte del contexto del modelo y del historial de conversación de ese cliente. No hay un backend o servicio de telemetría adicional del plugin. Revisa la política de privacidad de WODira y del cliente antes de consultar datos privados.

La distribución mediante GitHub y la aceptación en el marketplace son estados distintos. Hasta que Google apruebe su incorporación, utiliza la URL del repositorio para instalarlo.

[Documentación completa](README.md) · [Documentación web](https://wodira-app.github.io/wodira-antigravity/) · [Soporte](mailto:info@wodira.app)
